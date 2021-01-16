<script lang="tsx">
import {defineComponent, onBeforeMount} from 'vue';
import {useRoute, useRouter} from "vue-router";
import {Empty} from 'ant-design-vue'

export default defineComponent({
  name: 'Redirect',
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    onBeforeMount(() => {
      const {params, query} = route;
      const {path} = params;
      router.replace({
        path: '/' + (Array.isArray(path) ? path.join('/') : path),
        query,
      });
      // const { openPageLoading } = appStore.getProjCfg;
      // if (openPageLoading) {
      // }
    });
    return () => <Empty />;
  },
});
</script>
