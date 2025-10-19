import { v4 as uuidv4 } from 'uuid'

const KEY = 'ambara_crm_db'
const defaultDB = {
  users: [
    { id: 'admin-1', role: 'admin', name: 'Admin', email: 'admin@ambara.com', password: 'admin123' },
    { id: 'op-1', role: 'operator', name: 'Nadeem (Operator)', email: 'nadeem@ambara.com', password: 'op123' },
    { id: 'user-1', role: 'user', name: 'Saman', email: 'saman@mail.com', password: 'user123' },
    { id: 'user-2', role: 'user', name: 'Aisha', email: 'aisha@mail.com', password: 'user123' },
    { id: 'user-3', role: 'user', name: 'Kamal', email: 'kamal@mail.com', password: 'user123' },
    { id: 'user-4', role: 'user', name: 'Rina', email: 'rina@mail.com', password: 'user123' }
  ],
  products: [
    { id: 'p1', title: 'Modern Wall Art', price: 29.99, stock: 12, category: 'Decor' },
    { id: 'p2', title: 'Handmade Mug', price: 14.5, stock: 30, category: 'Kitchen' },
    { id: 'p3', title: 'Custom T-Shirt (Cotton)', price: 19.99, stock: 120, category: 'Apparel' },
    { id: 'p4', title: 'Photo Print Mug', price: 17.5, stock: 80, category: 'Apparel' },
    { id: 'p5', title: 'Canvas Frame 16x20', price: 45.0, stock: 24, category: 'Decor' },
    { id: 'p6', title: 'Large Vinyl Banner (3x6)', price: 79.0, stock: 10, category: 'Signage' },
    { id: 'p7', title: 'Logo Design (2 concepts)', price: 120.0, stock: 9999, category: 'Design' },
    { id: 'p8', title: 'Embroidered Cap', price: 12.5, stock: 200, category: 'Accessories' }
  ],
  orders: [
    { id: 'o1', customerId: 'user-1', items: [{ productId: 'p1', qty: 2, price: 29.99 }], total: 59.98, status: 'Completed', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString() },
    { id: 'o2', customerId: 'user-2', items: [{ productId: 'p3', qty: 3, price: 19.99 }], total: 59.97, status: 'Production', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
    { id: 'o3', customerId: 'user-3', items: [{ productId: 'p4', qty: 1, price: 17.5 }, { productId: 'p8', qty: 2, price: 12.5 }], total: 42.5, status: 'QA', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString() },
    { id: 'o4', customerId: 'user-4', items: [{ productId: 'p6', qty: 1, price: 79.0 }], total: 79.0, status: 'Received', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString() },
    { id: 'o5', customerId: 'user-2', items: [{ productId: 'p5', qty: 1, price: 45.0 }], total: 45.0, status: 'Shipped', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() }
  ],
  messages: [],
  templates: []
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
  async bulkAddProducts(list) { const db = read(); const items = list.map(p=> ({ id: p.id || uuidv4(), ...p })); db.products = [...items, ...db.products]; write(db); return items },
  async getOrders() { return read().orders },
  async addOrder(order) { const db = read(); const newOrder = { id: uuidv4(), createdAt: new Date().toISOString(), status: 'Received', ...order }; db.orders.unshift(newOrder); write(db); return newOrder },
  async updateOrderStatus(id, status, note = '') { const db = read(); db.orders = db.orders.map(o => o.id === id ? { ...o, status, lastNote: note, updatedAt: new Date().toISOString() } : o); write(db); return true },
  async getMessages() { return read().messages },
  async addMessage(m) { const db = read(); db.messages.unshift(m); write(db); return m }
  ,async getTemplates() { return read().templates }
  ,async addTemplate(tpl) { const db = read(); const entry = { id: tpl.id || uuidv4(), name: tpl.name, type: tpl.type, url: tpl.url, createdAt: new Date().toISOString() }; db.templates.unshift(entry); write(db); return entry }
}
