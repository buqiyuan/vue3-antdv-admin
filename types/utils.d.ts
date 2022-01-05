/** 提取Promise返回值 */
type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

/** 将联合类型转为交叉类型 */
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

/** 字符串替换，类似js的字符串replace方法 */
type Replace<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Left}${From}${infer Right}` ? `${Left}${To}${Right}` : Str;

/** 字符串替换，类似js的字符串replaceAll方法 */
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Left}${From}${infer Right}`
  ? Replace<Replace<`${Left}${To}${Right}`, From, To>, From, To>
  : Str;
