<template>
  <div>
    <Alert message="基础表单示例" type="info" show-icon style="margin-bottom: 12px">
      <template #description>
        <a
          class="text-blue-500"
          target="_blank"
          href="https://github.com/buqiyuan/vue3-antdv-admin/blob/main/src/views/demos/form/basic-form/index.vue"
        >
          查看源码
        </a>
      </template>
    </Alert>
    <a-card>
      <a-radio-group v-model:value="layout">
        <a-radio-button value="horizontal">Horizontal</a-radio-button>
        <a-radio-button value="vertical">Vertical</a-radio-button>
      </a-radio-group>
      <SchemaForm @submit="handleSubmit">
        <template #selectA="{ formModel, field }">
          <Select
            v-model:value="formModel[field]"
            :options="optionsA"
            mode="multiple"
            allow-clear
            @change="valueSelectA = formModel[field]"
          />
        </template>
        <template #selectB="{ formModel, field }">
          <Select
            v-model:value="formModel[field]"
            :options="optionsB"
            mode="multiple"
            allow-clear
            @change="valueSelectB = formModel[field]"
          />
        </template>
        <template #localSearch="{ formModel, field }">
          <ApiSelect
            v-model:value="formModel[field]"
            :api="optionsListApi"
            show-search
            option-filter-prop="label"
            label-field="name"
            value-field="id"
          />
        </template>
        <template #remoteSearch="{ formModel, field }">
          <ApiSelect
            v-model:value="formModel[field]"
            :api="optionsListApi"
            show-search
            :filter-option="false"
            label-field="name"
            value-field="id"
            :params="searchParams"
            @search="onSearch"
          />
        </template>
      </SchemaForm>
    </a-card>
  </div>
</template>

<script lang="tsx" setup>
  import { computed, ref, unref, watch } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { Alert, message, Select } from 'ant-design-vue';
  import { schemas } from './form-schema';
  import { useForm, ApiSelect } from '@/components/core/schema-form';
  import { optionsListApi } from '@/api/demo/select';

  defineOptions({
    name: 'DemosFormBasicForm',
  });

  const [SchemaForm, SchemaFormInstance] = useForm({
    labelWidth: 200,
    schemas,
    actionColOptions: {
      span: 24,
    },
  });

  const keyword = ref<string>('');
  const layout = ref('horizontal');

  const valueSelectA = ref<string[]>([]);
  const valueSelectB = ref<string[]>([]);
  const options = ref<Recordable[]>([]);
  options.value = Array.from({ length: 10 }).map((_, i) => ({ label: `选项${i}`, value: `${i}` }));

  const optionsA = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectB).indexOf(op.value) !== -1;
      return op;
    });
  });
  const optionsB = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectA).indexOf(op.value) !== -1;
      return op;
    });
  });

  const searchParams = computed<Recordable>(() => {
    return { keyword: unref(keyword) };
  });

  watch(layout, (val) => {
    if (val === 'vertical') {
      SchemaFormInstance.setSchemaFormProps({
        layout: val,
        rowProps: { gutter: 20 },
        labelWidth: null,
      });
    } else {
      SchemaFormInstance.setSchemaFormProps({ layout: val, labelWidth: 200 });
    }
  });

  function onSearch(value: string) {
    keyword.value = value;
  }

  // 点击提交
  function handleSubmit(values) {
    message.success(
      <div>
        验证通过！<pre class="text-left">{JSON.stringify(values, null, 2)}</pre>
      </div>,
      3,
    );
    console.log('values', values);
  }
</script>

<style lang="less" scoped>
  .btn-rows {
    button {
      margin-right: 12px;
    }
  }
</style>
