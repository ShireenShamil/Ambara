import { v4 as uuidv4 } from 'uuid'

const KEY = 'ambara_crm_db'
const defaultDB = {
  users: [
    { id: 'admin-1', role: 'admin', name: 'Admin', email: 'admin@ambara.com', password: 'admin123' },
    { id: 'user-1', role: 'user', name: 'Saman', email: 'saman@mail.com', password: 'user123' }
  ],
  products: [
    { id: 'p1', title: 'Modern Wall Art', price: 29.99, stock: 12, category: 'Decor' },
    { id: 'p2', title: 'Handmade Mug', price: 14.5, stock: 30, category: 'Kitchen' }
  ],
  orders: [
    { id: 'o1', customerId: 'user-1', items: [{ productId: 'p1', qty: 2 }], total: 59.98, status: 'Completed' }
  ],
  messages: []
}

function read() {
  const raw = localStorage.getItem(KEY)
  if (!raw) { localStorage.setItem(KEY, JSON.stringify(defaultDB)); return structuredClone(defaultDB) }
  return JSON.parse(raw)
}
function write(db) { localStorage.setItem(KEY, JSON.stringify(db)) }

export const api = {
  async register({ name, email, password, role = 'user' }) {
    const db = read()
    if (db.users.some(u => u.email === email)) throw new Error('Email exists')
    const user = { id: uuidv4(), name, email, password, role }
    db.users.push(user); write(db); const { password: _, ...safe } = user; return safe
  },
  async login(email, password) {
    const db = read()
    const u = db.users.find(x => x.email === email && x.password === password)
    if (!u) throw new Error('Invalid credentials')
    const { password: _, ...safe } = u
    return safe
  },
  async getUsers() { return read().users },
  async getProducts() { return read().products },
  async addProduct(product) { const db = read(); db.products.unshift(product); write(db); return product },
  async updateProduct(id, patch) { const db = read(); db.products = db.products.map(p => p.id === id ? { ...p, ...patch } : p); write(db); return true },
  async deleteProduct(id) { const db = read(); db.products = db.products.filter(p => p.id !== id); write(db); return true },
  async getOrders() { return read().orders },
  async getMessages() { return read().messages },
  async addMessage(m) { const db = read(); db.messages.unshift(m); write(db); return m }
}
