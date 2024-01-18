import type { ExportModalResult } from './typing';
import type { FormSchema } from '@/components/core/schema-form/';
import { useI18n } from '@/hooks/useI18n';

import { useFormModal } from '@/hooks/useModal/';

export type OpenModalOptions = {
  onOk: (val: ExportModalResult) => any;
};

const getSchemas = (t): FormSchema<ExportModalResult>[] => [
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
      formProps: {
        labelWidth: 100,
        schemas: getSchemas(t),
      },
    });
  };

  return {
    openModal,
  };
};
