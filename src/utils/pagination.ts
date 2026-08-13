export function getPageOffset(page: number, pageSize: number) {
  return Math.max(page - 1, 0) * pageSize;
}
