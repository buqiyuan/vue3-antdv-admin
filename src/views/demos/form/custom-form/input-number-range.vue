<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { Form } from 'ant-design-vue';

  defineOptions({ inheritAttrs: false });
  const formItemContext = Form.useInjectFormItemContext();

  const minimum = ref();
  const maximum = ref();
  const modelValue = defineModel<string[]>('value', { type: Array });

  watch([minimum, maximum], (value) => {
    modelValue.value = value;
    formItemContext.onFieldChange();
  });

  watch(modelValue, (value) => {
    if (!value) {
      minimum.value = maximum.value = '';
    }
  });
</script>

<template>
  <a-form-item-rest>
    <a-input-group compact>
      <a-input
        v-model:value="minimum"
        style="width: 100px; text-align: center"
        placeholder="Minimum"
      />
      <div class="!align-sub px-1"> 至 </div>
      <a-input
        v-model:value="maximum"
        class="site-input-right"
        style="width: 100px; text-align: center"
        placeholder="Maximum"
      />
    </a-input-group>
  </a-form-item-rest>
</template>
