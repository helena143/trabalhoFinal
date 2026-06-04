<template>
  <AdminLayout>

    <!-- HEADER -->
    <div class="page-head">

      <div>
        <span class="mini-tag">ADMIN · CATÁLOGO</span>

        <h1>Joias</h1>

        <p>
          Gerencie o catálogo premium da loja
        </p>
      </div>

      <button
        class="add-btn"
        @click="openModal()"
      >
        + Nova Joia
      </button>

    </div>

    <!-- STATS -->
    <div class="stats-grid">

      <div class="stat-card">
        <span>✦</span>

        <div>
          <h3>{{ items.length }}</h3>
          <p>Total de produtos</p>
        </div>
      </div>

      <div class="stat-card">
        <span>⬤</span>

        <div>
          <h3>
            {{
              items.reduce(
                (acc, item) => acc + Number(item.stock || 0),
                0
              )
            }}
          </h3>

          <p>Estoque total</p>
        </div>
      </div>

      <div class="stat-card">
        <span>♡</span>

        <div>
          <h3>
            R$
            {{
              items.reduce(
                (acc, item) =>
                  acc + Number(item.price || 0),
                0
              ).toFixed(0)
            }}
          </h3>

          <p>Valor catálogo</p>
        </div>
      </div>

    </div>

    <!-- SEARCH -->
    <div class="toolbar">

      <div class="search-box">

        <input
          v-model="search"
          placeholder="Buscar joia..."
        />

      </div>

    </div>

    <!-- LOADING -->
    <div
      v-if="loading"
      class="loading"
    >
      Carregando joias...
    </div>

    <!-- EMPTY -->
    <div
      v-else-if="filteredItems.length === 0"
      class="empty"
    >

      <div class="empty-icon">
        ✦
      </div>

      <h2>
        Nenhuma joia encontrada
      </h2>

      <p>
        Cadastre produtos para começar.
      </p>

    </div>

    <!-- GRID -->
    <div
      v-else
      class="grid"
    >

      <div
        class="card"
        v-for="item in filteredItems"
        :key="item._id"
      >

        <div class="card-image">

          <img
            v-if="item.image"
            :src="imgUrl(item.image)"
            alt=""
          />

          <div
            v-else
            class="no-img"
          >
            ✦
          </div>

          <div class="overlay-actions">

            <button
              class="overlay-btn edit"
              @click="openModal(item)"
            >
              Editar
            </button>

            <button
              class="overlay-btn delete"
              @click="deleteItem(item._id)"
            >
              Excluir
            </button>

          </div>

        </div>

        <div class="card-body">

          <span class="product-category">
            JOIA PREMIUM
          </span>

          <h3>
            {{ item.name }}
          </h3>

          <p class="desc">
            {{ item.description }}
          </p>

          <div class="product-bottom">

            <div>
              <p class="price">
                R$ {{ Number(item.price).toFixed(2) }}
              </p>

              <span class="stock">
                Estoque:
                {{ item.stock }}
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- MODAL -->
    <transition name="fade">

      <div
        v-if="showModal"
        class="modal-overlay"
        @click.self="closeModal"
      >

        <div class="modal">

          <!-- TOP -->
          <div class="modal-head">

            <div>

              <span class="mini-tag">
                {{ editing ? 'EDITAR' : 'NOVO' }}
              </span>

              <h2>
                {{ editing ? 'Editar Joia' : 'Nova Joia' }}
              </h2>

            </div>

            <button
              class="close-btn"
              @click="closeModal"
            >
              ✕
            </button>

          </div>

          <!-- FORM -->
          <div class="form-group">

            <label>Nome *</label>

            <input
              v-model="form.name"
              placeholder="Nome da joia"
            />

          </div>

          <div class="form-group">

            <label>Descrição *</label>

            <textarea
              v-model="form.description"
              placeholder="Descrição da joia"
            ></textarea>

          </div>

          <div class="form-row">

            <div class="form-group">

              <label>Preço *</label>

              <input
                v-model.number="form.price"
                type="number"
                min="0"
              />

            </div>

            <div class="form-group">

              <label>Estoque</label>

              <input
                v-model.number="form.stock"
                type="number"
                min="0"
              />

            </div>

          </div>

          <div class="form-group">

            <label>Imagem</label>

            <input
              type="file"
              accept="image/*"
              @change="handleFile"
            />

          </div>

          <!-- PREVIEW -->
          <div
            v-if="previewImage"
            class="preview"
          >

            <img
              :src="previewImage"
              alt=""
            />

          </div>

          <!-- MSG -->
          <p
            v-if="message"
            class="msg"
            :class="msgType"
          >
            {{ message }}
          </p>

          <!-- FOOTER -->
          <div class="modal-footer">

            <button
              class="cancel-btn"
              @click="closeModal"
            >
              Cancelar
            </button>

            <button
              class="save-btn"
              @click="saveItem"
              :disabled="saving"
            >
              {{
                saving
                  ? 'Salvando...'
                  : 'Salvar Produto'
              }}
            </button>

          </div>

        </div>

      </div>

    </transition>

  </AdminLayout>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted
} from 'vue'

import AdminLayout from '@/layouts/AdminLayout.vue'

const BASE =
  'http://localhost:3000/api/joias'

const items = ref<any[]>([])

const loading = ref(true)

const showModal = ref(false)

const editing = ref<any>(null)

const saving = ref(false)

const message = ref('')

const msgType = ref('success')

const file = ref<File | null>(null)

const previewImage = ref('')

const search = ref('')

const form = ref({
  name: '',
  description: '',
  price: 0,
  stock: 0
})

const token = () =>
  localStorage.getItem('token')

const imgUrl = (p: string) =>
  p.startsWith('http')
    ? p
    : `http://localhost:3000${p}`

const fetch_ = async (
  url: string,
  opts?: any
) =>
  fetch(url, {
    ...opts,
    headers: {
      Authorization:
        `Bearer ${token()}`,
      ...opts?.headers
    }
  })

const filteredItems = computed(() => {

  return items.value.filter(item =>
    item.name
      ?.toLowerCase()
      .includes(search.value.toLowerCase())
  )
})

const fetchItems = async () => {

  loading.value = true

  try {

    const r = await fetch(BASE)

    if (r.ok)
      items.value = await r.json()

  } catch (err) {

    console.log(err)

  } finally {

    loading.value = false
  }
}

const openModal = (item?: any) => {

  editing.value = item || null

  form.value = item
    ? {
        name: item.name,
        description:
          item.description || '',
        price: item.price,
        stock: item.stock
      }
    : {
        name: '',
        description: '',
        price: 0,
        stock: 0
      }

  previewImage.value =
    item?.image
      ? imgUrl(item.image)
      : ''

  file.value = null

  message.value = ''

  showModal.value = true
}

const closeModal = () => {

  showModal.value = false

  editing.value = null
}

const handleFile = (e: Event) => {

  const selected =
    (e.target as HTMLInputElement)
      .files?.[0]

  if (!selected) return

  file.value = selected

  previewImage.value =
    URL.createObjectURL(selected)
}

const saveItem = async () => {

  if (
    !form.value.name ||
    !form.value.description
  ) {

    message.value =
      'Preencha os campos obrigatórios'

    msgType.value = 'error'

    return
  }

  saving.value = true

  try {

    const fd = new FormData()

    Object.entries(form.value)
      .forEach(([k, v]) => {

        fd.append(k, String(v))
      })

    if (file.value)
      fd.append(
        'image',
        file.value
      )

    const url = editing.value
      ? `${BASE}/${editing.value._id}`
      : BASE

    const r = await fetch_(url, {
      method:
        editing.value
          ? 'PUT'
          : 'POST',
      body: fd
    })

    if (r.ok) {

      message.value =
        editing.value
          ? 'Joia atualizada!'
          : 'Joia criada!'

      msgType.value = 'success'

      await fetchItems()

      setTimeout(() => {

        closeModal()

      }, 1000)

    } else {

      const e = await r.json()

      message.value =
        e.message || 'Erro'

      msgType.value = 'error'
    }

  } catch {

    message.value =
      'Erro de conexão'

    msgType.value = 'error'

  } finally {

    saving.value = false
  }
}

const deleteItem = async (
  id: string
) => {

  const confirmDelete =
    confirm(
      'Deseja realmente excluir esta joia?'
    )

  if (!confirmDelete) return

  try {

    const r = await fetch_(
      `${BASE}/${id}`,
      {
        method: 'DELETE'
      }
    )

    if (r.ok)
      fetchItems()

  } catch (err) {

    console.log(err)
  }
}

onMounted(fetchItems)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

.page-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:32px;
  gap:20px;
}

.mini-tag{
  color:#3b82f6;
  font-size:11px;
  font-weight:700;
  letter-spacing:3px;
}

.page-head h1{
  font-size:56px;
  color:#0f172a;
  font-family:'Cormorant Garamond',serif;
}

.page-head p{
  margin-top:6px;
  color:#64748b;
}

.add-btn{
  height:56px;
  padding:0 28px;
  border:none;
  border-radius:18px;
  background:#0f172a;
  color:white;
  font-weight:700;
  cursor:pointer;
  transition:.3s;
}

.add-btn:hover{
  transform:translateY(-3px);
}

.stats-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-bottom:26px;
}

.stat-card{
  background:white;
  border:1px solid #e2e8f0;
  border-radius:24px;
  padding:28px;
  display:flex;
  align-items:center;
  gap:18px;
}

.stat-card span{
  width:60px;
  height:60px;
  border-radius:18px;
  background:#0f172a;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:22px;
}

.stat-card h3{
  font-size:30px;
  color:#0f172a;
}

.stat-card p{
  color:#64748b;
  margin-top:4px;
}

.toolbar{
  margin-bottom:24px;
}

.search-box input{
  width:100%;
  height:56px;
  border:1px solid #dbe2ea;
  border-radius:18px;
  padding:0 18px;
  background:white;
  outline:none;
}

.grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
  gap:22px;
}

.card{
  background:white;
  border-radius:28px;
  overflow:hidden;
  border:1px solid #e2e8f0;
  transition:.35s;
}

.card:hover{
  transform:translateY(-6px);
}

.card-image{
  position:relative;
  height:260px;
  background:#f8fafc;
}

.card-image img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.no-img{
  width:100%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#94a3b8;
  font-size:40px;
}

.overlay-actions{
  position:absolute;
  inset:0;
  background:rgba(15,23,42,.75);
  display:flex;
  align-items:center;
  justify-content:center;
  gap:12px;
  opacity:0;
  transition:.3s;
}

.card:hover .overlay-actions{
  opacity:1;
}

.overlay-btn{
  height:42px;
  padding:0 18px;
  border:none;
  border-radius:12px;
  cursor:pointer;
  font-weight:600;
}

.overlay-btn.edit{
  background:white;
  color:#0f172a;
}

.overlay-btn.delete{
  background:#ef4444;
  color:white;
}

.card-body{
  padding:22px;
}

.product-category{
  font-size:11px;
  letter-spacing:2px;
  color:#3b82f6;
  font-weight:700;
}

.card-body h3{
  margin-top:10px;
  font-size:20px;
  color:#0f172a;
}

.desc{
  margin-top:10px;
  color:#64748b;
  line-height:1.6;
  min-height:48px;
}

.product-bottom{
  margin-top:18px;
}

.price{
  font-size:22px;
  font-weight:700;
  color:#0f172a;
}

.stock{
  display:block;
  margin-top:6px;
  color:#64748b;
}

.loading,
.empty{
  padding:80px 20px;
  text-align:center;
}

.empty-icon{
  width:90px;
  height:90px;
  margin:auto;
  border-radius:50%;
  background:#eff6ff;
  color:#2563eb;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:34px;
  margin-bottom:20px;
}

.empty h2{
  color:#0f172a;
}

.empty p{
  margin-top:10px;
  color:#64748b;
}

.modal-overlay{
  position:fixed;
  inset:0;
  background:rgba(15,23,42,.7);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px;
  z-index:9999;
}

.modal{
  width:100%;
  max-width:620px;
  background:white;
  border-radius:32px;
  padding:34px;
}

.modal-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:24px;
}

.modal-head h2{
  margin-top:6px;
  font-size:42px;
  color:#0f172a;
  font-family:'Cormorant Garamond',serif;
}

.close-btn{
  width:42px;
  height:42px;
  border:none;
  border-radius:12px;
  background:#f1f5f9;
  cursor:pointer;
}

.form-group{
  display:flex;
  flex-direction:column;
  gap:8px;
  margin-bottom:18px;
}

.form-row{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:16px;
}

.form-group label{
  color:#334155;
  font-size:13px;
  font-weight:600;
}

.form-group input,
.form-group textarea{
  border:1px solid #dbe2ea;
  border-radius:16px;
  padding:16px;
  background:#fff;
  outline:none;
  font-size:.95rem;
}

.form-group textarea{
  min-height:120px;
  resize:none;
}

.preview{
  width:100%;
  height:220px;
  overflow:hidden;
  border-radius:20px;
  margin-bottom:18px;
}

.preview img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.msg{
  padding:14px;
  border-radius:14px;
  margin-bottom:16px;
}

.msg.success{
  background:#dcfce7;
  color:#166534;
}

.msg.error{
  background:#fee2e2;
  color:#991b1b;
}

.modal-footer{
  display:flex;
  gap:12px;
}

.cancel-btn,
.save-btn{
  flex:1;
  height:56px;
  border:none;
  border-radius:18px;
  cursor:pointer;
  font-weight:700;
}

.cancel-btn{
  background:#e2e8f0;
  color:#0f172a;
}

.save-btn{
  background:#0f172a;
  color:white;
}

.fade-enter-active,
.fade-leave-active{
  transition:all .3s ease;
}

.fade-enter-from,
.fade-leave-to{
  opacity:0;
  transform:scale(.95);
}

@media(max-width:900px){

  .stats-grid{
    grid-template-columns:1fr;
  }

  .page-head{
    flex-direction:column;
    align-items:flex-start;
  }
}

@media(max-width:700px){

  .form-row{
    grid-template-columns:1fr;
  }

  .modal{
    padding:24px;
  }

  .page-head h1{
    font-size:42px;
  }
}
</style>