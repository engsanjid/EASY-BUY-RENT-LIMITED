export function formatCurrency(amount: number, currency = "BDT") {
  return new Intl.NumberFormat("en-BD", { style: "currency", currency }).format(amount);
}
