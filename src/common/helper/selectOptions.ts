export class SelectOptions {
  static fromEnum = (e: any, placeholder: string) =>
    [{ value: '', option: placeholder }].concat(
      Object.keys(e)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
          value: key,
          option: key,
        }))
    );

  static fromCollection = <T>(
    items: T[],
    placeholder: string,
    valueSelector: (item: T) => string | number,
    labelSelector: (item: T) => string
  ) => [
    { value: '', option: placeholder },
    ...items.map((item) => ({
      value: valueSelector(item).toString(),
      option: labelSelector(item),
    })),
  ];
}
