import React, { useState } from 'react'
import { Box, Button, Typography, Card, CardContent } from '@mui/material'
import { api } from '../api/crmApi'

export default function TemplateUploader({ onAdd }) {
  const [file, setFile] = useState(null)

  async function handleFile(e){
    const f = e.target.files[0]
    if(!f) return
    const url = URL.createObjectURL(f)
    const tpl = { id: f.name + '-' + Date.now(), name: f.name, type: f.type, url }
    setFile(tpl)
    try{
      const saved = await api.addTemplate(tpl)
      if(onAdd) onAdd(saved)
    }catch(err){
      console.error('Failed to save template', err)
      if(onAdd) onAdd(tpl)
    }
  }

  return (
    <Card sx={{p:1}}>
      <CardContent>
        <Typography variant="subtitle1">Upload Template (T-shirt, Mug, Frame, Banner, Logo)</Typography>
        <Box sx={{display:'flex', gap:2, alignItems:'center', mt:1}}>
          <input id="tpl-upload" type="file" accept="image/*" onChange={handleFile} style={{display:'none'}} />
          <label htmlFor="tpl-upload">
            <Button variant="contained" component="span">Choose File</Button>
          </label>
          {file && <Typography>{file.name}</Typography>}
        </Box>
      </CardContent>
    </Card>
  )
}
