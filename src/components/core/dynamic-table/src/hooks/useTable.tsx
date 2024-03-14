import { nextTick, ref, unref, watch } from 'vue';
import { isEmpty } from 'lodash-es';
import DynamicTable from '../dynamic-table.vue';
import type { FunctionalComponent, Ref } from 'vue';
import type { DynamicTableProps } from '../dynamic-table';

type DynamicTableInstance = InstanceType<typeof DynamicTable>;

export function useTable(props?: Partial<DynamicTableProps>) {
  const dynamicTableRef = ref<DynamicTableInstance>({} as DynamicTableInstance);

  async function getTableInstance() {
    await nextTick();
    const table = unref(dynamicTableRef);
    if (isEmpty(table)) {
      console.error('未获取表格实例!');
    }
    return table;
  }

  watch(
    () => props,
    async () => {
      if (props) {
        // console.log('table onMounted', { ...props });
        await nextTick();
        const tableInstance = await getTableInstance();
        tableInstance?.setProps?.(props);
      }
    },
    {
      deep: true,
      flush: 'post',
    },
  );

  const methods = new Proxy<Ref<DynamicTableInstance>>(dynamicTableRef, {
    get(target, key: string) {
      if (Reflect.has(target, key)) {
        return unref(target);
      }
      if (target.value && Reflect.has(target.value, key)) {
        return Reflect.get(target.value, key);
      }
      return async (...rest) => {
        const table = await getTableInstance();
        return table?.[key]?.(...rest);
      };
    },
  });

  const DynamicTableRender: FunctionalComponent<DynamicTableProps> = (
    compProps,
    { attrs, slots },
  ) => {
    return (
      <DynamicTable
        ref={dynamicTableRef}
        {...{ ...attrs, ...props, ...compProps }}
        v-slots={slots}
      ></DynamicTable>
    );
  };

  return [DynamicTableRender, unref(methods)] as const;
}
