import React from 'react'
import { Button } from '@mui/material'
import Papa from 'papaparse'
import { api } from '../api/crmApi'

export default function BulkImport({ onImported }){
  const handle = async (e)=>{
    const f = e.target.files[0]
    if(!f) return
    Papa.parse(f, { header: true, complete: async (res)=>{
      const items = res.data.map(r=> ({ title: r.title, price: parseFloat(r.price||0), stock: parseInt(r.stock||0), category: r.category||'Misc' }))
      const saved = await api.bulkAddProducts(items)
      if(onImported) onImported(saved)
    } })
  }
  return (
    <label>
      <input type="file" accept="text/csv" onChange={handle} style={{display:'none'}} />
      <Button component="span" variant="outlined">Bulk Import CSV</Button>
    </label>
  )
}
