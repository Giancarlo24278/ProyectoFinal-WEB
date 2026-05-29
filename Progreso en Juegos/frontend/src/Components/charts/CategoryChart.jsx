import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { categorias } from '../../../utils/Categorias'

export default function CategoryChart({ data }) {
  return (
    <div className="chart-card">
      <h3>Distribución por categoría</h3>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={95}
          >
            {data.map((entry) => {
              const categoria = categorias.find(
                (c) => c.nombre === entry.name
              )
              return (
                <Cell
                  key={entry.name}
                  fill={categoria?.color || '#22c55e'}
                />
              )
            })}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}