import {
  createTypes,
  type VueTypeValidableDef,
  type VueTypesInterface,
  toValidableType,
} from 'vue-types';
import type { CSSProperties, VNodeChild } from 'vue';

export type VueNode = VNodeChild | JSX.Element;

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VueNode>;
  // readonly trueBool: VueTypeValidableDef<boolean>;
};
const newPropTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined,
}) as PropTypes;

class propTypes extends newPropTypes {
  // a native-like validator that supports the `.validable` method
  static override get style() {
    return toValidableType('style', {
      type: [String, Object],
    });
  }

  static override get VNodeChild() {
    return toValidableType('VNodeChild', {
      type: undefined,
    });
  }
}
export { propTypes };
