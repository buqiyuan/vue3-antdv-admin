import {defineComponent, ref} from 'vue';

import {Layout} from 'ant-design-vue'
import {GithubOutlined, CopyrightOutlined} from '@ant-design/icons-vue'
import styles from './index.module.scss'

const {Footer: ALayoutFooter} = Layout

export default defineComponent({
    name: 'page-footer',
    components: {ALayoutFooter},
    setup() {
        return () => (
            <>
                <a-layout-footer class={styles.page_footer}>
                    <div class={styles.page_footer_link}>
                        <a href="https://github.com/vuejs/vue-next" target="_blank">vue 3.0</a>
                        <a href="https://github.com/buqiyuan" target="_blank">
                            <GithubOutlined />
                        </a>
                        <a href="https://github.com/vueComponent/ant-design-vue" target="_blank"> ant-design-vue 2.0</a>
                    </div>
                    <div class={styles.copyright}>
                        Copyright <CopyrightOutlined /> 2020 <a href="https://buqiyuan.gitee.io"  target="_blank">buqiyuan.gitee.io</a>
                    </div>
                </a-layout-footer>
            </>
        );
    },
});
