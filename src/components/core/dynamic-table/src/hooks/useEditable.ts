import { nextTick } from 'vue';
import { cloneDeep } from 'lodash-es';
import { message } from 'ant-design-vue';
import type { DynamicTableProps } from '../dynamic-table';
import type { TableState } from './useTableState';

type UseTableMethodsContext = {
  state: TableState;
  props: DynamicTableProps;
};

export type UseEditableType = ReturnType<typeof useEditable>;

export const useEditable = ({ state, props }: UseTableMethodsContext) => {
  const { tableData, editFormModel, editTableFormRef, editFormErrorMsgs } = state;

  /**
   * @description 进入编辑行状态
   *
   * @param recordKey 当前行id，即table的rowKey
   * @param currentRow 当前行数据
   */
  const startEditable = (recordKey: Key, currentRow?: Recordable) => {
    console.log('startEditable editFormModel', editFormModel);
    // 如果是单行的话，不允许多行编辑
    if (Object.keys(editFormModel.value).length > 0 && props.editableType === 'single') {
      message.warn(props.onlyOneLineEditorAlertMessage || '只能同时编辑一行');
      return false;
    }
    // 克隆当前行数据作为临时编辑的表单数据，避免直接修改原数据
    const editValue = cloneDeep(
      currentRow ?? tableData.value.find((n) => n[String(props.rowKey)] === recordKey),
    );

    Reflect.set(editFormModel.value, recordKey, editValue);
    nextTick(() => {
      editTableFormRef.value?.setFormModel(recordKey, editValue);
    });
    return true;
  };

  /**
   * 退出编辑行状态
   *
   * @param recordKey
   */
  const cancelEditable = (recordKey: Key) => {
    nextTick(() => {
      editTableFormRef.value?.delFormModel(recordKey);
    });
    const formModel = getEditFormModel(recordKey);
    /** 表单项的校验错误信息也清掉 */
    Object.keys(formModel).forEach((field) =>
      editFormErrorMsgs.value.delete(`${recordKey}.${field}`),
    );

    return Reflect.deleteProperty(editFormModel.value, recordKey);
  };

  /** 这行是不是编辑状态 */
  const isEditable = (recordKey: Key) => Reflect.has(editFormModel.value, recordKey);

  /** 获取表单编辑后的值 */
  const getEditFormModel = (recordKey: Key) => Reflect.get(editFormModel.value, recordKey);

  /** 行编辑表单是否校验通过 */
  const validateRow = async (recordKey: Key) => {
    const nameList = Object.keys(getEditFormModel(recordKey)).map((n) => [String(recordKey), n]);
    const result = await editTableFormRef.value?.validateFields(nameList);
    return result?.[recordKey] ?? result;
  };

  return {
    startEditable,
    cancelEditable,
    isEditable,
    validateRow,
    getEditFormModel,
  };
};
