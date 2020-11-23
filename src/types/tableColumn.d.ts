import {ColumnProps} from 'ant-design-vue/lib/table/interface.d.ts'

export declare interface ActionOptions {
    type: 'select' | 'button' | 'text' | 'popconfirm'; // 控制类型，默认为a,可选： select | button | text
    key?: 'fileid'; // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
    text: string;
    permission?: { // 权限
        action: 'create' | 'delete' | 'update' | 'retrieve'; // CRUD权限：创建（Create）、更新（Update）、读取（Retrieve）和删除（Delete）操作
        effect?: 'disabled'
    };
    props?: any; // 组件属性，v-bind="props"
    func?: ({text, record, index}, callback) => Promise<any>; // 动作事件触发回调
}

export declare type TableColumn = ColumnProps & {
    slotsType: 'format' | 'link';
    slotsFunc: (val) => any;
    actions: ActionOptions[];
}
