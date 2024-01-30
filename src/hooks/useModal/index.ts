import { installUseModal, useModal } from './useModal';
import { useFormModal } from './useFormModal';
import type { App } from 'vue';

const install = (app: App) => {
  installUseModal(app);
};

export { useModal, useFormModal, install };

export default install;
