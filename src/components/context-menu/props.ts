import { Prop } from 'vue';
import { Axis, ContextMenuItem } from './types';
export const props = {
    width: {
        type: Number,
        default: 180,
    },
    customEvent: {
        type: Object,
        default: null,
    } as Prop<Event>,
    // 样式
    styles: {
        type: Object,
        default: null,
    } as Prop<any>,
    showIcon: {
        // 是否显示icon
        type: Boolean,
        default: true,
    } as Prop<boolean>,
    axis: {
        // 鼠标右键点击的位置
        type: Object,
        default() {
            return { x: 0, y: 0 };
        },
    } as Prop<Axis>,
    items: {
        // 最重要的列表，没有的话直接不显示
        type: Array,
        default() {
            return [];
        },
    } as Prop<ContextMenuItem[]>,
    resolve: {
        type: Function,
        default: null,
    } as Prop<any>,
};
