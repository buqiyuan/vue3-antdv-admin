const requestBefore = Symbol('requestBefore');
const requestAfter = Symbol('requestAfter');

export class WsAxios {
  #config = {
    // 配置
    url: '', // 地址
    time: 3000, // 心跳间隔(毫秒)
    ping: () => ({}), // ping code,
  };
  #ws = null; // websocket示例对象
  #requestId = 0; // callbacks对象key
  #callbacks = {}; // 回调函数队列
  #lockReconnect = false; //避免重复连接
  #pingTimer = null; // 心跳包定时器
  #reconnectTimer = null; // 重连定时器

  constructor(config = this.#config) {
    Object.assign(this.#config, config);
    this.#createWebSocket();
  }

  intercepts = {
    // 拦截器
    request: (func) => {
      if (func) {
        WsAxios[requestBefore] = func;
      } else {
        WsAxios[requestBefore] = (request) => request;
      }
    },
    response: (func) => {
      if (func) {
        WsAxios[requestAfter] = func;
      } else {
        WsAxios[requestAfter] = (response) => response;
      }
    },
  };

  static [requestBefore](config) {
    return config;
  }

  static [requestAfter](response) {
    return response;
  }

  #createWebSocket() {
    // 创建websocket实例
    this.#ws = new WebSocket(this.#config.url);
    this.#ws.onopen = () => {
      // 清空定时器
      this.clearAllTimer();
      // 开始心跳
      this.#heartBeat();
    };
    this.#ws.onmessage = (message) => {
      // console.log(message, 'onmessage')
      const data = message.data;
      let resObj = null;
      try {
        const parseData = JSON.parse(data);
        resObj = typeof parseData == 'string' ? JSON.parse(parseData) : parseData;
      } catch (error) {
        console.error(`onmessage parse error: message:${data}, ${error.message}`);
        return;
      }
      // 根据请求时传给后端的requestId，取出相应的回调函数
      const callback = this.#callbacks[resObj.requestId];
      try {
        // 主动请求后端时，调用请求前的回调
        callback(resObj);
      } catch (error) {
        // 被动接收后端数据
        WsAxios[requestAfter](resObj);
        console.error(`onmessage have some error: ${error.message}, message:${message}`);
      } finally {
        delete this.#callbacks[resObj.requestId];
      }
    };
    this.#ws.onclose = () => {
      console.error('onclose：断开连接');
      this.#reconnect();
    };
    this.#ws.onerror = () => {
      console.error('onerror：断开连接');
      this.#reconnect();
    };
  }

  sendCommand(params) {
    // 发送命令
    const requestId = ++this.#requestId;
    //TODO 本次请求的id，后端响应的时候需要带上本次请求的requestId，用于callbacks回调队列对应函数
    params['requestId'] = requestId;
    //请求前调用拦截钩子
    params = { ...params, ...WsAxios[requestBefore](params) };
    const reqMsg = JSON.stringify(params);
    return new Promise((resolve) => {
      this.#callbacks[requestId] = (resObj) => {
        //响应后调用拦截钩子
        resolve(WsAxios[requestAfter](resObj));
      };
      //添加状态判断，当为OPEN时，发送消息
      const readyState = this.#ws.readyState;
      if (readyState === 0) {
        // 正在连接
        this.#waitForConnection(reqMsg);
      } else if (readyState === 1) {
        //连接成功，可以通信了
        this.#ws.send(reqMsg);
      } else if (readyState === 2) {
        //连接正在关闭
        this.#reconnect();
      } else if (readyState === 3) {
        //连接已经关闭，或者打开连接失败
        this.#reconnect();
      }
    });
  }

  ping() {
    // ping
    if (Object.keys(this.#callbacks).length === 0) {
      const messageObject = this.#config.ping();
      return this.sendCommand(messageObject);
    }
  }

  #heartBeat() {
    // 发送心跳包
    this.#pingTimer = setTimeout(async () => {
      await this.ping();
      this.#heartBeat();
    }, this.#config.time);
  }

  #waitForConnection(message) {
    // 等待连接
    setTimeout(() => {
      if (this.#ws.readyState === 0) {
        this.#waitForConnection(message);
      } else {
        this.#ws.send(message);
      }
    }, 1000);
  }

  #reconnect() {
    // 重连
    if (this.#lockReconnect) return;
    this.#lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    this.#reconnectTimer && clearTimeout(this.#reconnectTimer);
    this.#reconnectTimer = setTimeout(() => {
      this.#lockReconnect = false;
      this.#createWebSocket();
    }, 5000);
  }

  clearAllTimer() {
    // 清空定时器
    clearTimeout(this.#pingTimer);
    clearTimeout(this.#reconnectTimer);
  }

  destroyed() {
    // 销毁
    this.clearAllTimer();
    this.#ws?.close();
  }
}
