import dayjs from "dayjs";

/**
 * @description 随机生成颜色
 * @param {string} type
 * @return {string}
 */
export const randomColor = (type: 'rgb' | 'hex' | 'hsl'): string => {
    switch (type) {
        case "rgb":
            return window.crypto.getRandomValues(new Uint8Array(3)).toString()
        case "hex":
            return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, `${Math.random() * 10}`)
        case "hsl":
            // 在25-95%范围内具有饱和度，在85-95%范围内具有亮度
            return [360 * Math.random(), 100 * Math.random() + '%', 100 * Math.random() + '%'].toString()
    }
}

/**
 * 复制文本
 * @param text
 */
export const copyText = (text: string) => {
    return new Promise((resolve, reject) => {
        const copyInput = document.createElement("input"); //创建一个input框获取需要复制的文本内容
        copyInput.value = text;
        document.body.appendChild(copyInput);
        copyInput.select();
        document.execCommand("copy");
        copyInput.remove()
        resolve(true);
    })
}

/**
 * @description 判断字符串是否是base64
 * @param {string} str
 */
export const isBase64 = (str: string): boolean => {
    if (str === '' || str.trim() === '') {
        return false;
    }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}
// 对象转JSON
export const toJSON = (obj) => {
    return JSON.stringify(obj, (key, value) => {
        switch (true) {
            case typeof value === "undefined":
                return "undefined";
            case typeof value === "symbol":
                return value.toString();
            case typeof value === "function":
                return value.toString();
            default:
                break;
        }
        return value;
    })
}

/***
 * @description 是否是生产环境
 */
export const isDev = process.env.NODE_ENV == 'development'

/***
 * @description 格式化日期
 * @param time
 */
export const formatDate = (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss')

/**
 *  @description 将一维数组转成树形结构数据
 * @param items
 * @param id
 * @param link
 */
export const generateTree = (items, id = 0, link = 'parent') => {
    return items.filter(item => item[link] == id).map(item => ({
        ...item,
        slots: {title: 'name'},
        children: generateTree(items, item.departmentid)
    }))
}

/***
 * @description 原生加密明文
 * @param {string} plaintext
 */
const encryption = (plaintext: string) => isBase64(plaintext) ? plaintext : window.btoa(window.encodeURIComponent(plaintext))

/**
 * @description 原生解密
 * @param {string} ciphertext
 */
const decryption = (ciphertext: string) => isBase64(ciphertext) ? window.decodeURIComponent(window.atob(ciphertext)) : ciphertext
