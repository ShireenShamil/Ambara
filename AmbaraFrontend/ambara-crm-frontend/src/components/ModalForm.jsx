import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

export default function ModalForm({open, title, children, onClose, onSave}){
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
