/** 合并同名属性(覆盖式) */
type MergePropertyTypes<T, U> = {
  [K in keyof T]: K extends keyof U ? U[K] : T[K];
} & U;

/** 将联合类型转为交叉类型 */
declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

/** eg: type result = StringToUnion<'abc'> 结果：'a'|'b'|'c'*/
type StringToUnion<S extends string> = S extends `${infer S1}${infer S2}`
  ? S1 | StringToUnion<S2>
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

/** eg: type result = CamelCase<'foo-bar-baz'>, 结果：fooBarBaz */
type CamelCase<S extends string> = S extends `${infer S1}-${infer S2}`
  ? S2 extends Capitalize<S2>
    ? `${S1}-${CamelCase<S2>}`
    : `${S1}${CamelCase<Capitalize<S2>>}`
  : S;

/** eg: type result = StringToArray<'abc'>, 结果：['a', 'b', 'c'] */
type StringToArray<S extends string, T extends any[] = []> = S extends `${infer S1}${infer S2}`
  ? StringToArray<S2, [...T, S1]>
  : T;

/** `RequiredKeys`是用来获取所有必填字段，其中这些必填字段组合成一个联合类型 */
type RequiredKeys<T> = {
  [P in keyof T]: T extends Record<P, T[P]> ? P : never;
}[keyof T];

/** `OptionalKeys`是用来获取所有可选字段，其中这些可选字段组合成一个联合类型 */
type OptionalKeys<T> = {
  [P in keyof T]: {} extends Pick<T, P> ? P : never;
}[keyof T];

/** `GetRequired`是用来获取一个类型中，所有必填键及其类型所组成的一个新类型的 */
type GetRequired<T> = {
  [P in RequiredKeys<T>]-?: T[P];
};

/** `GetOptional`是用来获取一个类型中，所有可选键及其类型所组成的一个新类型的 */
type GetOptional<T> = {
  [P in OptionalKeys<T>]?: T[P];
};

/**  type result1 = Includes<[1, 2, 3, 4], '4'> 结果： false; type result2 = Includes<[1, 2, 3, 4], 4> 结果： true */
type Includes<T extends any[], K> = K extends T[number] ? true : false;

/** eg:type result = MyConcat<[1, 2], [3, 4]>  结果：[1, 2, 3, 4]*/
type MyConcat<T extends any[], U extends any[]> = [...T, ...U];
/** eg: type result1 = MyPush<[1, 2, 3], 4> 结果：[1, 2, 3, 4] */
type MyPush<T extends any[], K> = [...T, K];
/** eg: type result3 = MyPop<[1, 2, 3]>  结果：[1, 2] */
type MyPop<T extends any[]> = T extends [...infer L, infer R] ? L : never; // eslint-disable-line
