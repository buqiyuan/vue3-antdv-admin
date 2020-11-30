import {Module} from 'vuex'

const state = {
    coronavirus: {} // 疫情数据
}

type StateType = typeof state

const eventSource: Module<StateType, any> = {
    namespaced: true,
    state,
    mutations: {
    },
    actions: {
    }
}

export default eventSource

// 实例化 EventSource 参数是服务端监听的路由
// const source = new EventSource('/api/sse', { withCredentials: true })
// source.onopen = function (event) { // 与服务器连接成功回调
//     console.log('成功与服务器连接', event)
// }
// // 监听从服务器发送来的所有没有指定事件类型的消息(没有event字段的消息)
// source.onmessage = (event) => { // 监听未命名事件
//     try {
//         state.coronavirus = JSON.parse(event.data)
//         console.log(state.coronavirus, '从后端获取疫情数据')
//     } catch (e) {
//         console.error('从后端获取疫情数据失败')
//         window.fetch('https://ncovdata.market.alicloudapi.com/ncov/cityDiseaseInfoWithTrend', {
//             method: 'GET',
//             headers: {
//                 'Authorization': 'APPCODE cee3da0e4dc544a884ab113983c518a8'
//             }
//         }).then(res => res.json()).then(data => {
//             state.coronavirus = data
//             console.log(state.coronavirus, '前端获取疫情数据')
//         })
//     }
//     // console.log('未命名事件', event.data)
// }
// source.onerror = function (error) { // 监听错误
//     console.log('错误')
// }
// 监听指定类型的事件（可以监听多个）
// source.addEventListener("myEve", function (event: MessageEvent) {
//     console.log("myEve", event.data)
// })
