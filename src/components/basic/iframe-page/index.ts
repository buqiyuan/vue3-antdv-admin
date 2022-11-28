import IFramePage from './index.vue';
import type { DefineComponent } from 'vue';

export default IFramePage as unknown as DefineComponent<{ src: string }>;
