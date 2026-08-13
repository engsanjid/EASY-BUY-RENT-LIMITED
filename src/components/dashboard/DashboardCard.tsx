export function DashboardCard({ title, value }: { title: string; value: string | number }) {
  return <article className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">{title}</p><strong className="text-2xl">{value}</strong></article>;
}
