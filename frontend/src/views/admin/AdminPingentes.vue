<template>
  <AdminLayout>
    <div class="page-head">
      <div><h1>Pingentes</h1><p>Gerencie o catálogo de pingentes</p></div>
      <button class="add-btn" @click="openModal()">+ Novo(a) Pingente</button>
    </div>

    <div v-if="loading" class="loading">Carregando...</div>
    <div v-else-if="items.length === 0" class="empty">Nenhum(a) pingente cadastrado(a).</div>
    <div v-else class="grid">
      <div class="card" v-for="item in items" :key="item._id">
        <img v-if="item.image" :src="imgUrl(item.image)" alt="" />
        <div class="no-img" v-else><i class="bi bi-box-seam"></i></div>
        <div class="card-body">
          <h3>{{ item.name }}</h3>
          <p class="price">R$ {{ Number(item.price).toFixed(2) }}</p>
          <p class="stock">Estoque: {{ item.stock }}</p>
          <div class="actions">
            <button class="edit-btn" @click="openModal(item)">Editar</button>
            <button class="delete-btn" @click="deleteItem(item._id)">Deletar</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-head">
          <h2>{{ editing ? 'Editar Pingente' : 'Novo(a) Pingente' }}</h2>
          <button class="close-btn" @click="closeModal"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="form-group"><label>Nome *</label><input v-model="form.name" placeholder="Nome" /></div>
        <div class="form-group"><label>Descrição *</label><input v-model="form.description" placeholder="Descrição" /></div>
        <div class="form-row">
          <div class="form-group"><label>Preço *</label><input v-model.number="form.price" type="number" min="0" /></div>
          <div class="form-group"><label>Estoque</label><input v-model.number="form.stock" type="number" min="0" /></div>
        </div>
        <div class="form-group"><label>Imagem</label><input type="file" accept="image/*" @change="handleFile" /></div>
        <p v-if="message" class="msg" :class="msgType">{{ message }}</p>
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeModal">Cancelar</button>
          <button class="save-btn" @click="saveItem" :disabled="saving">{{ saving ? 'Salvando...' : 'Salvar' }}</button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const BASE = 'http://localhost:3000/api/pingentes'
const items = ref<any[]>([])
const loading = ref(true)
const showModal = ref(false)
const editing = ref<any>(null)
const saving = ref(false)
const message = ref('')
const msgType = ref('success')
const file = ref<File | null>(null)
const form = ref({ name: '', description: '', price: 0, stock: 0 })
const token = () => localStorage.getItem('token')
const imgUrl = (p: string) => p.startsWith('http') ? p : `http://localhost:3000${p}`
const fetch_ = async (url: string, opts?: any) => fetch(url, { ...opts, headers: { Authorization: `Bearer ${token()}`, ...opts?.headers } })

const fetchItems = async () => {
  loading.value = true
  try { const r = await fetch(BASE); if (r.ok) items.value = await r.json() } catch {} finally { loading.value = false }
}
const openModal = (item?: any) => {
  editing.value = item || null
  form.value = item ? { name: item.name, description: item.description || '', price: item.price, stock: item.stock } : { name: '', description: '', price: 0, stock: 0 }
  file.value = null; message.value = ''; showModal.value = true
}
const closeModal = () => { showModal.value = false; editing.value = null }
const handleFile = (e: Event) => { file.value = (e.target as HTMLInputElement).files?.[0] || null }
const saveItem = async () => {
  if (!form.value.name) { message.value = 'Nome obrigatório'; msgType.value = 'error'; return }
  saving.value = true
  try {
    const fd = new FormData()
    Object.entries(form.value).forEach(([k, v]) => fd.append(k, String(v)))
    if (file.value) fd.append('image', file.value)
    const url = editing.value ? `${BASE}/${editing.value._id}` : BASE
    const r = await fetch_(url, { method: editing.value ? 'PUT' : 'POST', body: fd })
    if (r.ok) { message.value = 'Salvo!'; msgType.value = 'success'; await fetchItems(); setTimeout(closeModal, 900) }
    else { const e = await r.json(); message.value = e.message || 'Erro'; msgType.value = 'error' }
  } catch { message.value = 'Erro de conexão'; msgType.value = 'error' } finally { saving.value = false }
}
const deleteItem = async (id: string) => {
  if (!confirm('Deletar?')) return
  const r = await fetch_(`${BASE}/${id}`, { method: 'DELETE' })
  if (r.ok) fetchItems()
}
onMounted(fetchItems)
</script>

<style scoped>
.page-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:30px}
.page-head p{color:#777;margin-top:4px}
.add-btn{height:50px;padding:0 24px;border:none;border-radius:14px;background:#c9a96e;color:#000;font-weight:700;cursor:pointer}
.loading,.empty{color:#555;padding:60px 0;text-align:center}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px}
.card{background:#151515;border:1px solid #222;border-radius:20px;overflow:hidden}
.card img{width:100%;height:180px;object-fit:cover}
.no-img{width:100%;height:180px;background:#1a1a1a;display:flex;align-items:center;justify-content:center;color:#333;font-size:2rem}
.card-body{padding:16px}
.card-body h3{font-size:.95rem;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.price{color:#c9a96e;font-weight:700;margin-bottom:4px}
.stock{color:#666;font-size:.85rem;margin-bottom:14px}
.actions{display:flex;gap:8px}
.edit-btn,.delete-btn{flex:1;height:38px;border:none;border-radius:10px;cursor:pointer;font-size:.85rem;font-weight:600}
.edit-btn{background:#c9a96e;color:#000}
.delete-btn{background:#341818;color:#ff7675}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px}
.modal{background:#111;border:1px solid #222;border-radius:24px;padding:36px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto}
.modal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px}
.close-btn{background:none;border:none;color:#666;cursor:pointer;font-size:1rem}
.form-group{display:flex;flex-direction:column;gap:8px;margin-bottom:18px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.form-group label{color:#888;font-size:.78rem;letter-spacing:1px;text-transform:uppercase}
.form-group input{height:50px;background:#0f0f0f;border:1px solid #2a2a2a;border-radius:12px;padding:0 16px;color:#e0e0e0;font-size:.9rem;outline:none}
.form-group input[type=file]{height:auto;padding:12px 16px}
.form-group input:focus{border-color:#c9a96e}
.msg{padding:10px 14px;border-radius:10px;font-size:.85rem;margin-bottom:14px}
.msg.success{background:#1f3b2d;color:#4cd137}
.msg.error{background:#341818;color:#ff7675}
.modal-footer{display:flex;gap:12px}
.cancel-btn{flex:1;height:50px;background:#1a1a1a;border:none;border-radius:12px;color:#888;cursor:pointer}
.save-btn{flex:2;height:50px;background:#c9a96e;border:none;border-radius:12px;color:#000;font-weight:700;cursor:pointer}
.save-btn:disabled{opacity:.6;cursor:not-allowed}
</style>