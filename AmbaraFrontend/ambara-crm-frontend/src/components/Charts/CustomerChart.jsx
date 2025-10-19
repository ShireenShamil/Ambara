import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts'

export default function CustomerChart({ customers }) {
  const safeCustomers = Array.isArray(customers) ? customers : []
  if (!safeCustomers.length) {
    return (
      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#666' }}>No customer data</span>
      </div>
    )
  }
  const data = safeCustomers.map(c => ({ name: c.name, value: 1 }))
  const COLORS = ['#2E7D32', '#81C784', '#A5D6A7', '#C8E6C9']
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} fill="#2E7D32" label>
          {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}
