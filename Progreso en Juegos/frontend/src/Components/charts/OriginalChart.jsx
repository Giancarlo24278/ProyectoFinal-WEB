import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function OriginalChart({ data }) {
  return (
    <div className="chart-card chart-card-full">
      <h3>Promedio de progreso por categoría</h3>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoria" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="promedio" name="Promedio % progreso" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}