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

export default function ActivityChart({ data }) {
  return (
    <div className="chart-card">
      <h3>Actividad últimos 7 días</h3>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" name="Actividades" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}