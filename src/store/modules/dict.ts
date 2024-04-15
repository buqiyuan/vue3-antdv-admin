import { ref } from 'vue';
import { defineStore } from 'pinia';
import { type DictType, getDictData } from '@/api/demo/dict';

export const useDictStore = defineStore('dict', () => {
  const dictMap = ref(new Map<string, LabelValueOptions>());
  const dictValueLabelMap = ref(new Map<string, Map<any, string>>());
  const dictPendingMap = ref(new Map<string, boolean>());

  const fetchDict = (dictType: DictType | DictType[]) => {
    const dictTypes = Array.isArray(dictType) ? dictType : [dictType];
    const promises = dictTypes.map(async (type) => {
      if (dictMap.value.has(type) && !dictPendingMap.value.has(type)) {
        return dictMap.value.get(type)!;
      }

      dictMap.value.set(type, []);
      dictPendingMap.value.set(type, true);
      const res = await getDictData({ type }).finally(() => dictPendingMap.value.delete(type));
      dictMap.value.set(type, res);
      dictValueLabelMap.value.set(type, new Map(res.map((item) => [item.value, item.label])));
      return res;
    });
    return Promise.all(promises);
  };

  const dictData = new Proxy({} as Record<DictType, LabelValueOptions>, {
    get(_, prop: DictType) {
      if (prop.startsWith('__v_')) {
        // console.trace('get', prop);
        return;
      }
      if (dictMap.value.has(prop)) {
        return dictMap.value.get(prop);
      }
      if (!dictPendingMap.value.has(prop)) {
        fetchDict(prop);
      }
      return dictMap.value.get(prop);
    },
  });

  const showDictLabel = (dictType: DictType, code: any) => {
    dictData[dictType];
    return dictValueLabelMap.value.get(dictType)?.get(code) || '';
  };

  const dictPending = new Proxy({} as Record<DictType, boolean>, {
    get(_, prop: DictType) {
      return dictPendingMap.value.get(prop) || false;
    },
  });

  return { dictData, dictPending, fetchDict, showDictLabel };
});
