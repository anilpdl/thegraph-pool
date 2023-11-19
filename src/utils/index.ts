function sumField(data: Record<string, any>, field: string) {
  const sum = data[field].reduce(
    (curr: number, acc: number) => Number(curr) + Number(acc),
    0
  );

  return sum;
}

export { sumField };
