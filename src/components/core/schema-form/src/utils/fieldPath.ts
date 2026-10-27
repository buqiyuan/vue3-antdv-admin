import { get, set, unset } from 'lodash-es';

/**
 * Schema fields such as `[start, end]` are one literal key.
 * Lodash `set`/`get`/`unset` parse `[...]` and `.` as path syntax, so those
 * keys have to be passed as a single array segment.
 */
const LITERAL_BRACKET_FIELD = /^\[[^[\]]+\]$/;

export type FieldKey = string | number | Array<string | number>;

export function isLiteralFieldKey(key: string): boolean {
  return LITERAL_BRACKET_FIELD.test(key);
}

function toPath(key: FieldKey): FieldKey {
  if (typeof key === 'string' && isLiteralFieldKey(key)) {
    return [key];
  }
  return key;
}

export function setFieldValue(target: object, key: FieldKey, value: unknown) {
  set(target, toPath(key) as never, value);
  return target;
}

export function getFieldValue(target: object, key: FieldKey) {
  return get(target, toPath(key) as never);
}

export function unsetFieldValue(target: object, key: FieldKey) {
  return unset(target, toPath(key) as never);
}

/**
 * Name path used by Form.Item and the schema-form v-model.
 * Dots are nested segments, except:
 * - a bracket-wrapped field (`[start, end]`) is one segment
 * - the editable-table rowKey prefix is one segment, even when the id contains dots
 */
export function resolveFieldNamePath(
  field: FieldKey | undefined | null,
  tableRowKey?: string | number,
): string[] {
  if (field === undefined || field === null || field === '') {
    return [];
  }
  if (Array.isArray(field)) {
    return field.map((segment) => String(segment));
  }
  const fieldStr = String(field);
  if (tableRowKey !== undefined && tableRowKey !== null && tableRowKey !== '') {
    const rowKey = String(tableRowKey);
    if (fieldStr === rowKey) {
      return [rowKey];
    }
    const prefix = `${rowKey}.`;
    if (fieldStr.startsWith(prefix)) {
      const rest = fieldStr.slice(prefix.length);
      return rest ? [rowKey, ...rest.split('.')] : [rowKey];
    }
  }
  if (isLiteralFieldKey(fieldStr)) {
    return [fieldStr];
  }
  return fieldStr.split('.');
}
