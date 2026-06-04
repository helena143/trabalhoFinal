<template>
  <AdminLayout>
    <div class="page-head">
      <div>
        <h1>Produtos</h1>
        <p>Gerencie o catálogo geral de produtos</p>
      </div>
      <button class="add-btn" @click="openModal()">+ Novo Produto</button>
    </div>

    <div v-if="loading" class="loading">Carregando...</div>
    <div v-else-if="products.length === 0" class="empty">Nenhum produto cadastrado.</div>
    <div v-else class="product-grid">
      <div class="product-card" v-for="p in products" :key="p._id">
        <img v-if="p.image" :src="`http://localhost:3000${p.image}`" alt="produto" />
        <div class="no-img" v-else><i class="bi bi-image"></i></div>
        <div class="card-body">
          <h3>{{ p.name }}</h3>
          <p class="price">R$ {{ Number(p.price).toFixed(2) }}</p>
          <p class="stock">Estoque: {{ p.stock }}</p>
          <div class="actions">
            <button class="edit-btn" @click="openModal(p)">Editar</button>
            <button class="delete-btn" @click="deleteProduct(p._id)">Deletar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-head">
          <h2>{{ editing ? 'Editar Produto' : 'Novo Produto' }}</h2>
          <button class="close-btn" @click="closeModal"><i class="bi bi-x-lg"></i></button>
        </div>

        <div class="form-group">
          <label>Nome *</label>
          <input v-model="form.name" placeholder="Nome do produto" />
        </div>
        <div class="form-group">
          <label>Descrição</label>
          <input v-model="form.description" placeholder="Descrição" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Preço *</label>
            <input v-model.number="form.price" type="number" min="0" placeholder="0.00" />
          </div>
          <div class="form-group">
            <label>Estoque *</label>
            <input v-model.number="form.stock" type="number" min="0" placeholder="0" />
          </div>
        </div>
        <div class="form-group">
          <label>Categoria (ID)</label>
          <input v-model="form.category" placeholder="ID da categoria" />
        </div>
        <div class="form-group">
          <label>Imagem</label>
          <input type="file" accept="image/*" @change="handleFile" />
        </div>

        <p v-if="message" class="msg" :class="msgType">{{ message }}</p>

        <div class="modal-footer">
          <button class="cancel-btn" @click="closeModal">Cancelar</button>
          <button class="save-btn" @click="saveProduct" :disabled="saving">
            {{ saving ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const products = ref<any[]>([])
const loading = ref(true)
const showModal = ref(false)
const editing = ref<any>(null)
const saving = ref(false)
const message = ref('')
const msgType = ref('success')
const file = ref<File | null>(null)

const form = ref({ name: '', description: '', price: 0, stock: 0, category: '' })

const token = () => localStorage.getItem('token')

const fetchProducts = async () => {
  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/api/products')
    products.value = await res.json()
  } catch { } finally { loading.value = false }
}

const openModal = (p?: any) => {
  editing.value = p || null
  form.value = p
    ? { name: p.name, description: p.description || '', price: p.price, stock: p.stock, category: p.category || '' }
    : { name: '', description: '', price: 0, stock: 0, category: '' }
  file.value = null
  message.value = ''
  showModal.value = true
}

const closeModal = () => { showModal.value = false; editing.value = null }

const handleFile = (e: Event) => {
  file.value = (e.target as HTMLInputElement).files?.[0] || null
}

const saveProduct = async () => {
  if (!form.value.name || form.value.price < 0) {
    message.value = 'Preencha os campos obrigatórios'
    msgType.value = 'error'
    return
  }
  saving.value = true
  try {
    const fd = new FormData()
    fd.append('name', form.value.name)
    fd.append('description', form.value.description)
    fd.append('price', String(form.value.price))
    fd.append('stock', String(form.value.stock))
    if (form.value.category) fd.append('category', form.value.category)
    if (file.value) fd.append('image', file.value)

    const url = editing.value
      ? `http://localhost:3000/api/products/${editing.value._id}`
      : 'http://localhost:3000/api/products'
    const method = editing.value ? 'PUT' : 'POST'

    const res = await fetch(url, { method, headers: { Authorization: `Bearer ${token()}` }, body: fd })
    if (res.ok) {
      message.value = editing.value ? 'Produto atualizado!' : 'Produto criado!'
      msgType.value = 'success'
      await fetchProducts()
      setTimeout(closeModal, 1000)
    } else {
      const err = await res.json()
      message.value = err.message || 'Erro ao salvar'
      msgType.value = 'error'
    }
  } catch { message.value = 'Erro de conexão'; msgType.value = 'error'
  } finally { saving.value = false }
}

const deleteProduct = async (id: string) => {
  if (!confirm('Tem certeza que deseja deletar este produto?')) return
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token()}` }
  })
  if (res.ok) fetchProducts()
}

onMounted(fetchProducts)
</script>

<style scoped>
.page-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; }
.page-head p { color: #777; margin-top: 4px; }
.add-btn { height: 50px; padding: 0 24px; border: none; border-radius: 14px; background: #c9a96e; color: black; font-weight: 700; cursor: pointer; font-size: 0.9rem; }
.loading, .empty { color: #555; padding: 60px 0; text-align: center; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
.product-card { background: #151515; border: 1px solid #222; border-radius: 20px; overflow: hidden; }
.product-card img { width: 100%; height: 180px; object-fit: cover; }
.no-img { width: 100%; height: 180px; background: #1a1a1a; display: flex; align-items: center; justify-content: center; color: #333; font-size: 2rem; }
.card-body { padding: 16px; }
.card-body h3 { font-size: 0.95rem; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.price { color: #c9a96e; font-weight: 700; margin-bottom: 4px; }
.stock { color: #666; font-size: 0.85rem; margin-bottom: 14px; }
.actions { display: flex; gap: 8px; }
.edit-btn, .delete-btn { flex: 1; height: 38px; border: none; border-radius: 10px; cursor: pointer; font-size: 0.85rem; font-weight: 600; }
.edit-btn { background: #c9a96e; color: #000; }
.delete-btn { background: #341818; color: #ff7675; }

/* MODAL */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.modal { background: #111; border: 1px solid #222; border-radius: 24px; padding: 36px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; }
.modal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; }
.modal-head h2 { font-size: 1.1rem; }
.close-btn { background: none; border: none; color: #666; cursor: pointer; font-size: 1rem; }
.close-btn:hover { color: #e0e0e0; }
.form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-group label { color: #888; font-size: 0.78rem; letter-spacing: 1px; text-transform: uppercase; }
.form-group input { height: 50px; background: #0f0f0f; border: 1px solid #2a2a2a; border-radius: 12px; padding: 0 16px; color: #e0e0e0; font-size: 0.9rem; outline: none; }
.form-group input[type="file"] { height: auto; padding: 12px 16px; }
.form-group input:focus { border-color: #c9a96e; }
.msg { padding: 12px 16px; border-radius: 10px; font-size: 0.85rem; margin-bottom: 16px; }
.msg.success { background: #1f3b2d; color: #4cd137; }
.msg.error { background: #341818; color: #ff7675; }
.modal-footer { display: flex; gap: 12px; margin-top: 8px; }
.cancel-btn { flex: 1; height: 50px; background: #1a1a1a; border: none; border-radius: 12px; color: #888; cursor: pointer; }
.save-btn { flex: 2; height: 50px; background: #c9a96e; border: none; border-radius: 12px; color: #000; font-weight: 700; cursor: pointer; }
.save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
