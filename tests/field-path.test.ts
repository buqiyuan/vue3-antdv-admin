import { computed, reactive, ref } from 'vue';
import { describe, expect, it } from 'vitest';

function installMemoryStorage() {
  const memory = new Map<string, string>();
  const storage = {
    getItem: (key: string) => memory.get(key) ?? null,
    setItem: (key: string, value: string) => {
      memory.set(key, String(value));
    },
    removeItem: (key: string) => {
      memory.delete(key);
    },
    clear: () => memory.clear(),
    key: (index: number) => [...memory.keys()][index] ?? null,
    get length() {
      return memory.size;
    },
  };
  Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true });
  Object.defineProperty(globalThis, 'sessionStorage', { value: storage, configurable: true });
}

installMemoryStorage();

const { useFormMethods } = await import('@/components/core/schema-form/src/hooks/useFormMethods');
const { resolveFieldNamePath } = await import(
  '@/components/core/schema-form/src/utils/fieldPath'
);

function createMethods(schemas: Recordable[]) {
  const formModel = reactive<Recordable>({});
  const formPropsRef = ref({ schemas });
  const methods = useFormMethods({
    emit: () => {},
    formState: {
      compRefMap: new Map(),
      formModel,
      formPropsRef,
      cacheFormModel: {},
      schemaFormRef: ref(),
      getFormProps: computed(() => formPropsRef.value),
      defaultFormValues: reactive({}),
      originComponentPropsFnMap: new Map(),
    } as any,
  });
  return { formModel, methods };
}

describe('setFieldsValue literal keys (#241)', () => {
  it('assigns bracket-wrapped field names without stripping the brackets', async () => {
    const { formModel, methods } = createMethods([
      { field: '[start, end]', component: 'Input' },
      { field: 'a.b.c', component: 'Select' },
    ]);

    await methods.setFieldsValue({
      '[start, end]': ['2025-05-20', '2025-05-21'],
      'a.b.c': 1,
    });

    expect(formModel['[start, end]']).toEqual(['2025-05-20', '2025-05-21']);
    expect(formModel['start, end']).toBeUndefined();
    expect(formModel.a.b.c).toBe(1);
  });

  it('keeps a literal bracket key when submitting without transform', () => {
    const { methods } = createMethods([
      { field: '[start, end]', component: 'Input' },
      { field: 'a.b.c', component: 'Select' },
    ]);
    const res = methods.handleFormValues({
      '[start, end]': ['2025-05-20', '2025-05-21'],
      'a.b.c': 1,
    });
    expect(res['[start, end]']).toEqual(['2025-05-20', '2025-05-21']);
    expect(res['start, end']).toBeUndefined();
    expect(res.a.b.c).toBe(1);
  });

  it('still applies the range transform for a bracket field', () => {
    const { methods } = createMethods([
      {
        field: '[start, end]',
        component: 'RangePicker',
        transform(value: string[] = []) {
          const [start, end] = value;
          return { start, end };
        },
      },
    ]);
    expect(methods.handleFormValues({ '[start, end]': ['2025-05-20', '2025-05-21'] })).toEqual({
      start: '2025-05-20',
      end: '2025-05-21',
    });
  });

  it('stores a dotted rowKey as one literal segment (#225)', () => {
    const rowKey = '190ba29b7de.1.7f000001.002bf960.895300c9';
    const { formModel, methods } = createMethods([]);
    methods.setFormModel([rowKey], { name: 'alice' });
    expect(formModel[rowKey]).toEqual({ name: 'alice' });
    expect(formModel['190ba29b7de']).toBeUndefined();
    methods.delFormModel([rowKey]);
    expect(formModel[rowKey]).toBeUndefined();
  });
});

describe('editable row name path (#225)', () => {
  const rowKey = '190ba29b7de.1.7f000001.002bf960.895300c9';

  it('reads the row object stored under the literal rowKey', () => {
    const field = `${rowKey}.name`;
    const editFormModel: Recordable = {};
    Reflect.set(editFormModel, rowKey, { name: 'alice', age: 3 });

    const splitPath = field.split('.');
    expect(splitPath.reduce((prev, key) => prev?.[key], editFormModel)).toBeUndefined();

    const namePath = resolveFieldNamePath(field, rowKey);
    expect(namePath).toEqual([rowKey, 'name']);
    expect(namePath.reduce((prev, key) => prev?.[key], editFormModel)).toBe('alice');
  });

  it('keeps nested column paths under the literal rowKey', () => {
    expect(resolveFieldNamePath(`${rowKey}.user.name`, rowKey)).toEqual([rowKey, 'user', 'name']);
    expect(resolveFieldNamePath('a.b.c')).toEqual(['a', 'b', 'c']);
    expect(resolveFieldNamePath('[start, end]')).toEqual(['[start, end]']);
  });
});
