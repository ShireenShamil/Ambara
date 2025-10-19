import React from 'react'
import { api } from '../api/crmApi'

const CRMContext = React.createContext(null)

export function CRMProvider({ children }) {
  const [customers, setCustomers] = React.useState([])
  const [orders, setOrders] = React.useState([])
  const [products, setProducts] = React.useState([])
  const [messages, setMessages] = React.useState([])

  React.useEffect(() => { loadData() }, [])

  const loadData = async () => {
    setCustomers(await api.getUsers())
    setOrders(await api.getOrders())
    setProducts(await api.getProducts())
    setMessages(await api.getMessages())
  }

  const value = { customers, orders, products, messages, reload: loadData }
  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>
}

export function useCRM() {
  return React.useContext(CRMContext)
}
