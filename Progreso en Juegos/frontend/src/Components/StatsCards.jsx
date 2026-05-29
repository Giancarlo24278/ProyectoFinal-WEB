export default function StatsCards({
  total,
  visibles,
  completados,
  archivados,
}) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span>Total</span>
        <strong>{total}</strong>
      </div>

      <div className="stat-card">
        <span>Visibles</span>
        <strong>{visibles}</strong>
      </div>

      <div className="stat-card">
        <span>Completados</span>
        <strong>{completados}</strong>
      </div>

      <div className="stat-card">
        <span>Archivados</span>
        <strong>{archivados}</strong>
      </div>
    </div>
  )
}