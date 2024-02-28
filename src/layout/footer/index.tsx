import { defineComponent } from 'vue';

import { GithubOutlined, CopyrightOutlined } from '@ant-design/icons-vue';
import { Layout } from 'ant-design-vue';
import styles from './index.module.less';

const { Footer: ALayoutFooter } = Layout;

export default defineComponent({
  name: 'PageFooter',
  components: { ALayoutFooter },
  setup() {
    return () => (
      <>
        <a-layout-footer class={styles.page_footer}>
          <div class={styles.page_footer_link}>
            <a href="https://buqiyuan.github.io/vue3-antdv-admin" target="_blank">
              在线预览
            </a>
            <a href="https://github.com/buqiyuan/vue3-antdv-admin" target="_blank">
              <GithubOutlined />
            </a>
            <a href="https://buqiyuan.github.io/vue3-antdv-admin-docs/" target="_blank">
              在线文档
            </a>
          </div>
          <div class={styles.copyright}>
            Copyright <CopyrightOutlined /> 2022 vue3-antdv-admin
          </div>
        </a-layout-footer>
      </>
    );
  },
});
