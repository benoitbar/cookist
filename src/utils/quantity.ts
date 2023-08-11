const r1 = /^(\d+[a-z]*)\s(.*)$/i;
const r2 = /^(\d+)(.*)$/i;

export function extractQuantity(value: string, defaultQuantity: string = '') {
  const values = r1.exec(value);

  return {
    quantity: values?.[1] || defaultQuantity,
    name: values?.[2] || value,
  };
}

export function extractUnit(value: string) {
  const values = r2.exec(value);

  return {
    quantity: Number(values?.[1]),
    unit: values?.[2],
  };
}
