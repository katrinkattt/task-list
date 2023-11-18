export function validator(...validators: ((value: string) => string | void)[]) {
  return (value: string) => {
    for (const fn of validators) {
      const message = fn(value);
      if (message) {
        return message;
      }
    }
  };
}
export function required(value: string) {
  if (
    value === '' ||
    value === null ||
    value === undefined ||
    value.length === 0
  ) {
    return 'Это поле обязательно к заполнению';
  }
}
