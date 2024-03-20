<template>
  <Select
    v-bind="getProps"
    :options="getOptions"
    @dropdown-visible-change="handleFetch"
    @change="handleChange"
  >
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}" />
    </template>
    <template v-if="loading" #suffixIcon>
      <LoadingOutlined spin />
    </template>
    <template v-if="loading" #notFoundContent>
      <span>
        <LoadingOutlined spin class="mr-1" />
        {{ t('component.form.apiSelectNotFound') }}
      </span>
    </template>
  </Select>
</template>
<script lang="ts" setup>
  import { ref, watchEffect, computed, unref, watch } from 'vue';
  import { get, omit } from 'lodash-es';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { selectProps } from 'ant-design-vue/es/select';
  import { Select } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import { isFunction } from '@/utils/is';
  import { useI18n } from '@/hooks/useI18n';
  import { propTypes } from '@/utils/propTypes';

  type OptionsItem = { label: string; value: string; disabled?: boolean };

  defineOptions({
    name: 'ApiSelect',
    inheritAttrs: false,
  });

  const props = defineProps({
    ...selectProps(),
    value: [Array, Object, String, Number],
    numberToString: propTypes.bool,
    api: {
      type: Function as PropType<(arg?: Recordable) => Promise<any>>,
      default: null,
    },
    // api params
    params: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    // support xxx.xxx.xx
    resultField: propTypes.string.def(''),
    labelField: propTypes.string.def('label'),
    valueField: propTypes.string.def('value'),
    immediate: propTypes.bool.def(true),
    alwaysLoad: propTypes.bool.def(false),
  });

  const emit = defineEmits(['options-change', 'change']);

  const options = ref<OptionsItem[]>([]);
  const loading = ref(false);
  const isFirstLoad = ref(true);
  const emitData = ref<any[]>([]);
  const { t } = useI18n();

  const getProps = computed(() => props as Recordable);

  // Embedded in the form, just use the hook binding to perform form verification

  const getOptions = computed(() => {
    const { labelField, valueField, numberToString } = props;

    return unref(options).reduce((prev, next: Recordable) => {
      if (next) {
        const value = next[valueField];
        prev.push({
          ...omit(next, [labelField, valueField]),
          label: next[labelField],
          value: numberToString ? `${value}` : value,
        });
      }
      return prev;
    }, [] as OptionsItem[]);
  });

  watchEffect(() => {
    props.immediate && !props.alwaysLoad && fetch();
  });

  watch(
    () => props.params,
    () => {
      !unref(isFirstLoad) && fetch();
    },
    { deep: true },
  );

  async function fetch() {
    const api = props.api;
    if (!api || !isFunction(api)) return;
    options.value = [];
    try {
      loading.value = true;
      const res = await api(props.params);
      if (Array.isArray(res)) {
        options.value = res;
        emitChange();
        return;
      }
      if (props.resultField) {
        options.value = get(res, props.resultField) || [];
      }
      emitChange();
    } catch (error) {
      console.warn(error);
    } finally {
      loading.value = false;
    }
  }

  async function handleFetch(visible) {
    if (visible) {
      if (props.alwaysLoad) {
        await fetch();
      } else if (!props.immediate && unref(isFirstLoad)) {
        await fetch();
        isFirstLoad.value = false;
      }
    }
  }

  function emitChange() {
    emit('options-change', unref(getOptions));
  }

  function handleChange(_, ...args) {
    emitData.value = args;
  }
</script>
