import { nextTick, watch } from 'vue';
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
  const {
    tableData,
    editFormModel,
    editTableFormRef,
    editFormErrorMsgs,
    editableCellKeys,
    editableRowKeys,
  } = state;

  watch(
    () => props.editableType,
    (type) => {
      if (type === 'cell') {
        editableRowKeys.value.clear();
      } else {
        editableCellKeys.value.clear();
      }
    },
  );

  /** 设置表单值 */
  const setEditFormModel = (recordKey: Key, editValue: Recordable) => {
    Reflect.set(editFormModel.value, recordKey, editValue);
    nextTick(() => {
      editTableFormRef.value?.setFormModel(recordKey, editValue);
    });
  };

  /**
   * @description 进入编辑行状态
   *
   * @param recordKey 当前行id，即table的rowKey
   * @param currentRow 当前行数据
   */
  const startEditable = (recordKey: Key, currentRow?: Recordable) => {
    editableCellKeys.value.clear();
    console.log('startEditable editFormModel', editFormModel);
    // 如果是单行的话，不允许多行编辑
    if (editableRowKeys.value.size > 0 && props.editableType === 'single') {
      message.warn(props.onlyOneLineEditorAlertMessage || '只能同时编辑一行');
      return false;
    }
    // 克隆当前行数据作为临时编辑的表单数据，避免直接修改原数据
    const editValue = cloneDeep(
      currentRow ?? tableData.value.find((n) => n[String(props.rowKey)] === recordKey),
    );
    // 用户设置的默认值优先
    props.columns.forEach((item) => {
      const field = (item.dataIndex || item.key) as string;
      if (item.formItemProps && Reflect.has(item.formItemProps, 'defaultValue')) {
        editValue[field] = item.formItemProps.defaultValue;
      }
      if (item.editFormItemProps && Reflect.has(item.editFormItemProps, 'defaultValue')) {
        editValue[field] = item.editFormItemProps.defaultValue;
      }
    });
    setEditFormModel(recordKey, editValue);
    editableRowKeys.value.add(recordKey);
    return true;
  };

  /** 进入编辑单元格状态 */
  const startCellEditable = (recordKey: Key, dataIndex: Key, currentRow?: Recordable) => {
    editableRowKeys.value.clear();
    // 克隆当前行数据作为临时编辑的表单数据，避免直接修改原数据
    const editValue = cloneDeep(
      currentRow ?? tableData.value.find((n) => n[String(props.rowKey)] === recordKey),
    );
    const targetColumn = props.columns.find((n) => n.dataIndex === dataIndex);
    if (targetColumn) {
      const field = (targetColumn.dataIndex || targetColumn.key) as string;
      if (targetColumn.formItemProps && Reflect.has(targetColumn.formItemProps, 'defaultValue')) {
        editValue[field] = targetColumn.formItemProps.defaultValue;
      }
      if (
        targetColumn.editFormItemProps &&
        Reflect.has(targetColumn.editFormItemProps, 'defaultValue')
      ) {
        editValue[field] = targetColumn.editFormItemProps.defaultValue;
      }
    }
    editableCellKeys.value.add(`${recordKey}.${dataIndex}`);
    setEditFormModel(recordKey, {
      ...(getEditFormModel(recordKey) || editValue),
      [dataIndex]: editValue[dataIndex],
    });
  };

  /** 取消编辑单元格 */
  const cancelCellEditable = (recordKey: Key, dataIndex: Key) => {
    editableCellKeys.value.delete(`${recordKey}.${dataIndex}`);
    const editFormModel = getEditFormModel(recordKey);
    const record = tableData.value.find((n) => n[String(props.rowKey)] === recordKey);
    if (record) {
      // 取消编辑，还原默认值
      Reflect.set(editFormModel, dataIndex, record[dataIndex]);
    }
    /** 表单项的校验错误信息也清掉 */
    editFormErrorMsgs.value.delete(`${recordKey}.${dataIndex}`);
  };

  /**
   * 退出编辑行状态
   *
   * @param recordKey
   */
  const cancelEditable = (recordKey: Key) => {
    const formModel = getEditFormModel(recordKey);
    /** 表单项的校验错误信息也清掉 */
    Object.keys(formModel).forEach((field) =>
      editFormErrorMsgs.value.delete(`${recordKey}.${field}`),
    );

    nextTick(() => {
      editTableFormRef.value?.delFormModel?.(recordKey);
    });

    editableRowKeys.value.delete(recordKey);
    return Reflect.deleteProperty(editFormModel.value, recordKey);
  };

  /** 这行是不是编辑状态 */
  const isEditable = (recordKey: Key) => editableRowKeys.value.has(recordKey);

  /** 获取表单编辑后的值 */
  const getEditFormModel = (recordKey: Key) => Reflect.get(editFormModel.value, recordKey);

  /** 行编辑表单是否校验通过 */
  const validateRow = async (recordKey: Key) => {
    const nameList = Object.keys(getEditFormModel(recordKey)).map((n) => [String(recordKey), n]);
    const result = await editTableFormRef.value?.validateFields(nameList);
    return result?.[recordKey] ?? result;
  };

  /**
   * 单元格表单是否校验通过
   * @param recordKey 当前行ID
   * @param dataIndex 当前单元格字段名, eg: `column.dataIndex`
   *  */
  const validateCell = async (recordKey: Key, dataIndex: Key) => {
    const result = await editTableFormRef.value?.validateFields([[String(recordKey), dataIndex]]);
    return result?.[recordKey] ?? result;
  };

  return {
    setEditFormModel,
    startEditable,
    startCellEditable,
    cancelCellEditable,
    cancelEditable,
    isEditable,
    validateRow,
    validateCell,
    getEditFormModel,
  };
};
