import { computed, unref } from 'vue';
import type { Ref } from 'vue';
import type { FormSchema } from '../types/form';
import type { SchemaFormProps } from '../schema-form';
import { isNumber } from '@/utils/is';

export function useItemLabelWidth(schemaItemRef: Ref<FormSchema>, propsRef: Ref<SchemaFormProps>) {
  return computed(() => {
    const schemaItem = unref(schemaItemRef);
    const { labelCol = {}, wrapperCol = {} } = schemaItem.formItemProps || {};
    const { labelWidth, disabledLabelWidth } = schemaItem;

    const {
      labelWidth: globalLabelWidth,
      labelCol: globalLabelCol,
      wrapperCol: globWrapperCol,
      layout,
    } = unref(propsRef);

    // If labelWidth is set globally, all items setting
    if ((!globalLabelWidth && !labelWidth && !globalLabelCol) || disabledLabelWidth) {
      labelCol.style = {
        textAlign: 'left',
      };
      return { labelCol, wrapperCol };
    }
    let width = labelWidth || globalLabelWidth;
    const col = { ...globalLabelCol, ...labelCol };
    const wrapCol = { ...globWrapperCol, ...wrapperCol };

    if (width) {
      width = isNumber(width) ? `${width}px` : width;
    }

    return {
      labelCol: { style: { width }, ...col },
      wrapperCol: {
        style: { width: layout === 'vertical' ? '100%' : `calc(100% - ${width})` },
        ...wrapCol,
      },
    };
  });
}
