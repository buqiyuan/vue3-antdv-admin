import { isEmpty, isFunction } from 'lodash';
import IO, { type Socket } from 'socket.io-client';
import { useUserStore } from '@/store/modules/user';
import { useWsStore } from '@/store/modules/ws';

/**
 * Socket连接状态
 */
export enum SocketStatus {
  // 连接中
  CONNECTING = 'CONNECTING',
  // 已连接
  CONNECTED = 'CONNECTED',
  // 已关闭
  CLOSE = 'CLOSE',
}

export type SocketStatusType = keyof typeof SocketStatus;

export type SocketIOWrapperType = InstanceType<typeof SocketIOWrapper>;

export class SocketIOWrapper {
  /**
   * socket.io-client reserved event keywords
   * @type {string[]}
   */
  static staticEvents = [
    // socket instance listen
    'connect',
    'connect_error',
    'disconnect',
    'disconnecting',
    'newListener',
    'removeListener',
    // Manager listen
    'error',
    'reconnect',
    'reconnect_attempt',
    'reconnect_error',
    'reconnect_failed',
    'ping',
    'pong',
  ] as const;
  socketInstance: Socket | null;
  emitQueue: any[];
  closeByServer: boolean;
  waiting: boolean;
  flushing: boolean;
  handleIndex: number;
  runningQueue: any[];
  wsStore = useWsStore();

  constructor() {
    // socket io client instance
    this.socketInstance = null;
    // emit cache queue
    this.emitQueue = [];
    // flush will using
    this.runningQueue = [];
    this.handleIndex = 0;
    this.flushing = false;
    this.waiting = false;
    // is server disconnect
    this.closeByServer = false;
    // init
    this._init();
  }

  /**
   * 获取当前连接的clientid
   */
  getClientId() {
    if (this.socketInstance) {
      return this.socketInstance.id;
    }
    return undefined;
  }

  /**
   * 获取真实的Socket连接状态
   */
  isConnected() {
    return this.socketInstance?.connected;
  }

  /**
   * 主动关闭连接
   */
  close() {
    if (this.socketInstance) {
      this.socketInstance.close();
    }
    this.socketInstance = null;
  }

  /**
   * SocketIO 初始化
   */
  _init() {
    if (this.socketInstance && this.socketInstance.connected) {
      throw new Error('socket is connecting');
    }
    // auth token
    const token = useUserStore().token;
    console.log('token', token);
    if (isEmpty(token)) {
      // 未登录状态则直接关闭连接
      this.close();
      return;
    }
    this.changeStatus(SocketStatus.CONNECTING);

    // 初始化SocketIO实例
    this.socketInstance = IO(import.meta.env.VITE_BASE_SOCKET_NSP, {
      path: import.meta.env.VITE_BASE_SOCKET_PATH,
      transports: ['websocket'],
      query: { token },
    });
    // register default event
    this.socketInstance.on(SocketIOWrapper.staticEvents[0], this.handleConnectEvent.bind(this));
    this.socketInstance.on(SocketIOWrapper.staticEvents[1], this.handleErrorEvent.bind(this));
    this.socketInstance.on(SocketIOWrapper.staticEvents[2], this.handleDisconnectEvent.bind(this));
    // reconnecting
    this.socketInstance.io.on(
      SocketIOWrapper.staticEvents[8],
      this.handleReconnectAttemptEvent.bind(this),
    );
  }

  /**
   * on custom event
   */
  subscribe(eventName, fn) {
    if (isEmpty(eventName) || !isFunction(fn)) {
      throw new TypeError('param must correct type');
    }
    // register
    this.socketInstance?.on(eventName, fn);
  }

  /**
   * off custom event
   */
  unsubscribe(eventName, fn) {
    if (isEmpty(eventName)) {
      throw new TypeError('param must correct type');
    }
    if (SocketIOWrapper.staticEvents.includes(eventName) && !isFunction(fn)) {
      throw new Error('default event remove must has second param');
    }
    this.socketInstance?.off(eventName, fn);
  }

  /**
   * 派发事件通知Socket状态
   */
  changeStatus(status) {
    this.wsStore.setStatus(status);
  }

  /**
   * 默认事件处理
   */
  handleConnectEvent() {
    this.changeStatus(SocketStatus.CONNECTED);
    // flush queue
    if (this.emitQueue.length > 0) {
      // copy
      const queue = this.emitQueue.slice();
      // clean
      this.emitQueue = [];
      for (let i = 0; i < queue.length; i++) {
        this.queueEmit(queue[i]);
      }
    }
  }

  /**
   * 默认事件处理
   */
  handleReconnectAttemptEvent() {
    this.changeStatus(SocketStatus.CONNECTING);
  }

  /**
   * 默认事件处理
   */
  handleDisconnectEvent(reason) {
    if (reason === 'io server disconnect') {
      this.closeByServer = true;
      this.changeStatus(SocketStatus.CLOSE);
    }
  }

  /**
   * 默认事件处理
   */
  handleErrorEvent() {
    if (this.closeByServer) {
      this.changeStatus(SocketStatus.CLOSE);
    }
  }

  /**
   * client emit
   * The following events are reserved and should not be used as event names by your application:
   * connect、connect_error、connect_timeout、error、disconnect、
   * disconnecting、newListener、reconnect_attempt、reconnecting、reconnect_error、
   * reconnect_failed、removeListener、ping、pong
   */
  emit(eventName, data) {
    // 检查event名称
    if (isEmpty(eventName) || SocketIOWrapper.staticEvents.includes(eventName)) {
      throw new TypeError('event is not allow emit');
    }
    if (!this.isConnected()) {
      // 未连接状态，则缓存，在重新连接时则会执行该队列
      this.emitQueue.push({ eventName, data });
    } else {
      // 连接成功状态
      this.socketInstance?.emit(eventName, data);
    }
  }

  /**
   * 重置队列标志状态
   */
  resetState() {
    this.handleIndex = 0;
    this.runningQueue = [];
    this.waiting = this.flushing = false;
  }

  queueEmit(item) {
    if (!this.flushing) {
      this.runningQueue.push(item);
    } else {
      // if flushing
      let i = this.runningQueue.length - 1;
      while (i > this.handleIndex) {
        i--;
      }
      this.runningQueue.splice(i + 1, 0, item);
    }
    // queue the flush
    if (!this.waiting) {
      this.waiting = true;
      setTimeout(this.flushQueue.bind(this), 0);
    }
  }

  flushQueue() {
    this.flushing = true;
    let item;
    // emit
    for (this.handleIndex = 0; this.handleIndex < this.runningQueue.length; this.handleIndex++) {
      item = this.runningQueue[this.handleIndex];
      // re emit
      this.emit(item.eventName, item.data);
    }

    this.resetState();
  }
}
