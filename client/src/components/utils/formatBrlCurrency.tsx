function formatBrlCurrency(value: number): string {
  return new Intl.NumberFormat(`pt-BR`, {
    currency: `BRL`,
    style: "currency",
  }).format(value)
}

export default formatBrlCurrency
