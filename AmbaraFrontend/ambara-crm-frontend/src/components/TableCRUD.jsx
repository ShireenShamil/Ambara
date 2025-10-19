import React from 'react'
import { DataGrid } from '@mui/x-data-grid'

export default function TableCRUD({ rows, columns, editable = false }) {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows.map(r => ({ id: r.id, ...r }))}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection={editable}
      />
    </div>
  )
}
