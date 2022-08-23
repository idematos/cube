function FormatBrlCurrency(
  value: number,
  language: string,
  currencyCode: string
): string {
  return new Intl.NumberFormat(language, {
    currency: currencyCode,
    style: "currency",
  }).format(value)
}

export default FormatBrlCurrency
