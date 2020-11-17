import {Layout, Avatar, Menu, Dropdown, Breadcrumb,Tooltip} from 'ant-design-vue'

import {
    SettingOutlined,
    SearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    PoweroffOutlined,
    GithubOutlined,
    LockOutlined
} from '@ant-design/icons-vue';

export default {
    [Layout.Header.name]: Layout.Header,
    [Avatar.name]: Avatar,
    [Menu.name]: Menu,
    [Tooltip.name]: Tooltip,
    [Menu.Divider.name]: Menu.Divider,
    SettingOutlined,
    Dropdown,
    LockOutlined,
    GithubOutlined,
    SearchOutlined,
    [Breadcrumb.name]: Breadcrumb,
    [Breadcrumb.Item.name]: Breadcrumb.Item,
    MenuFoldOutlined, MenuUnfoldOutlined, FullscreenOutlined, FullscreenExitOutlined,
    PoweroffOutlined
}
