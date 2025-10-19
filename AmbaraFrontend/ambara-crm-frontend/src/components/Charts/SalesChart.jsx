import React from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

export default function SalesChart({ orders }) {
  const safeOrders = Array.isArray(orders) ? orders : []
  if (!safeOrders.length) {
    return (
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#666' }}>No sales data</span>
      </div>
    )
  }
  const data = safeOrders.map(o => ({ id: o.id, total: o.total }))
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
