import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material'

export default function ProductQuickEdit({ open, product, onClose, onSave }){
  const [form, setForm] = useState(product || {})
  React.useEffect(()=> setForm(product || {}), [product])
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Quick Edit Product</DialogTitle>
      <DialogContent>
        <TextField label="Title" fullWidth margin="dense" value={form.title||''} onChange={e=>setForm({...form, title:e.target.value})} />
        <TextField label="Price" fullWidth margin="dense" value={form.price||0} onChange={e=>setForm({...form, price:parseFloat(e.target.value||0)})} />
        <TextField label="Stock" fullWidth margin="dense" value={form.stock||0} onChange={e=>setForm({...form, stock:parseInt(e.target.value||0)})} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={()=>onSave(form)} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  )
}
