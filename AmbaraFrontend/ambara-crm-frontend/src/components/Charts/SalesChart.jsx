import React from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

export default function SalesChart({ orders }) {
  const data = orders.map(o => ({ id: o.id, total: o.total }))
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#2E7D32" />
      </BarChart>
    </ResponsiveContainer>
  )
}
