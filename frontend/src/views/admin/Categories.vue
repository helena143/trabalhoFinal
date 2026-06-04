<template>
  <AdminLayout>
    <div class="page-head">
      <div>
        <h1>Categorias</h1>
        <p>Organize os produtos da loja</p>
      </div>
      <button class="add-btn" @click="openModal()">+ Nova Categoria</button>
    </div>

    <div v-if="loading" class="loading">Carregando...</div>
    <div v-else-if="categories.length === 0" class="empty">Nenhuma categoria cadastrada.</div>
    <div v-else class="categories-grid">
      <div class="category-card" v-for="cat in categories" :key="cat._id">
        <div class="icon">{{ cat.icon || '📦' }}</div>
        <h3>{{ cat.name }}</h3>
        <p class="desc">{{ cat.description || 'Sem descrição' }}</p>
        <div class="actions">
          <button class="edit-btn" @click="openModal(cat)">Editar</button>
          <button class="delete-btn" @click="deleteCategory(cat._id)">Excluir</button>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-head">
          <h2>{{ editing ? 'Editar Categoria' : 'Nova Categoria' }}</h2>
          <button class="close-btn" @click="closeModal"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="form-group">
          <label>Nome *</label>
          <input v-model="form.name" placeholder="Nome da categoria" />
        </div>
        <div class="form-group">
          <label>Descrição</label>
          <input v-model="form.description" placeholder="Descrição (opcional)" />
        </div>
        <div class="form-group">
          <label>Ícone (emoji)</label>
          <input v-model="form.icon" placeholder="Ex: 💎 ⌚ 🧴" maxlength="4" />
        </div>
        <p v-if="message" class="msg" :class="msgType">{{ message }}</p>
        <div class="modal-footer">
          <button class="cancel-btn" @click="closeModal">Cancelar</button>
          <button class="save-btn" @click="saveCategory" :disabled="saving">{{ saving ? 'Salvando...' : 'Salvar' }}</button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const categories = ref<any[]>([])
const loading = ref(true)
const showModal = ref(false)
const editing = ref<any>(null)
const saving = ref(false)
const message = ref('')
const msgType = ref('success')
const form = ref({ name: '', description: '', icon: '' })
const token = localStorage.getItem('token')

const fetchCategories = async () => {
  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/api/categories')
    if (res.ok) categories.value = await res.json()
  } catch { } finally { loading.value = false }
}

const openModal = (cat?: any) => {
  editing.value = cat || null
  form.value = cat ? { name: cat.name, description: cat.description || '', icon: cat.icon || '' } : { name: '', description: '', icon: '' }
  message.value = ''
  showModal.value = true
}
const closeModal = () => { showModal.value = false; editing.value = null }

const saveCategory = async () => {
  if (!form.value.name.trim()) { message.value = 'Nome é obrigatório'; msgType.value = 'error'; return }
  saving.value = true
  try {
    const url = editing.value ? `http://localhost:3000/api/categories/${editing.value._id}` : 'http://localhost:3000/api/categories'
    const method = editing.value ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form.value)
    })
    if (res.ok) {
      message.value = editing.value ? 'Categoria atualizada!' : 'Categoria criada!'
      msgType.value = 'success'
      await fetchCategories()
      setTimeout(closeModal, 900)
    } else {
      const err = await res.json()
      message.value = err.message || 'Erro ao salvar'
      msgType.value = 'error'
    }
  } catch { message.value = 'Erro de conexão'; msgType.value = 'error'
  } finally { saving.value = false }
}

const deleteCategory = async (id: string) => {
  if (!confirm('Excluir esta categoria?')) return
  const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (res.ok) fetchCategories()
}

onMounted(fetchCategories)
</script>

<style scoped>
.page-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; }
.page-head p { color: #777; margin-top: 4px; }
.add-btn { height: 50px; padding: 0 24px; border: none; border-radius: 14px; background: #c9a96e; color: black; font-weight: 700; cursor: pointer; }
.loading, .empty { color: #555; padding: 60px 0; text-align: center; }
.categories-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
.category-card { background: #151515; border: 1px solid #222; border-radius: 24px; padding: 30px; text-align: center; }
.icon { width: 70px; height: 70px; border-radius: 20px; background: #1f1f1f; display: flex; align-items: center; justify-content: center; font-size: 30px; margin: 0 auto 18px; }
.category-card h3 { margin-bottom: 8px; }
.desc { color: #666; font-size: 0.85rem; margin-bottom: 20px; }
.actions { display: flex; gap: 10px; }
.edit-btn, .delete-btn { flex: 1; height: 40px; border: none; border-radius: 12px; cursor: pointer; font-size: 0.85rem; font-weight: 600; }
.edit-btn { background: #c9a96e; color: #000; }
.delete-btn { background: #341818; color: #ff7675; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.modal { background: #111; border: 1px solid #222; border-radius: 24px; padding: 36px; width: 100%; max-width: 460px; }
.modal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
.close-btn { background: none; border: none; color: #666; cursor: pointer; font-size: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
.form-group label { color: #888; font-size: 0.78rem; letter-spacing: 1px; text-transform: uppercase; }
.form-group input { height: 50px; background: #0f0f0f; border: 1px solid #2a2a2a; border-radius: 12px; padding: 0 16px; color: #e0e0e0; font-size: 0.9rem; outline: none; }
.form-group input:focus { border-color: #c9a96e; }
.msg { padding: 10px 14px; border-radius: 10px; font-size: 0.85rem; margin-bottom: 14px; }
.msg.success { background: #1f3b2d; color: #4cd137; }
.msg.error { background: #341818; color: #ff7675; }
.modal-footer { display: flex; gap: 12px; }
.cancel-btn { flex: 1; height: 50px; background: #1a1a1a; border: none; border-radius: 12px; color: #888; cursor: pointer; }
.save-btn { flex: 2; height: 50px; background: #c9a96e; border: none; border-radius: 12px; color: #000; font-weight: 700; cursor: pointer; }
.save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
