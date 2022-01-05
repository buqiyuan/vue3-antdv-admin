import type { ExportModalResult } from './typing';
import type { FormItemSchema } from '@/components/core/schema-form/types/form';

import { useFormModal } from '@/hooks/useModal/useFormModal';

import { useI18n } from 'vue-i18n';

export type OpenModalOptions = {
  onOk: (val: ExportModalResult) => any;
};

const getSchemas = (t): FormItemSchema<ExportModalResult>[] => [
  {
    field: 'filename',
    component: 'Input',
    label: t('component.excel.fileName'),
    rules: [{ required: true }],
  },
  {
    field: 'bookType',
    component: 'Select',
    label: t('component.excel.fileType'),
    defaultValue: 'xlsx',
    rules: [{ required: true }],
    componentProps: {
      options: [
        {
          label: 'xlsx',
          value: 'xlsx',
          key: 'xlsx',
        },
        {
          label: 'html',
          value: 'html',
          key: 'html',
        },
        {
          label: 'csv',
          value: 'csv',
          key: 'csv',
        },
        {
          label: 'txt',
          value: 'txt',
          key: 'txt',
        },
      ],
    },
  },
];

export const useExportExcelModal = () => {
  const { t } = useI18n();
  const [showModal] = useFormModal();

  const openModal = ({ onOk }: OpenModalOptions) => {
    showModal<ExportModalResult>({
      modalProps: {
        title: t('component.excel.exportModalTitle'),
        onFinish: async (values) => {
          const { filename, bookType } = values;

          onOk({
            filename: `${filename.split('.').shift()}.${bookType}`,
            bookType,
          });
        },
      },
      formSchema: {
        labelWidth: 100,
        layout: 'vertical',
        schemas: getSchemas(t),
      },
    });
  };

  return {
    openModal,
  };
};
