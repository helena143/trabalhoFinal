<template>
  <AdminLayout>
    <div class="page-head">
      <div>
        <h1>Usuários</h1>
        <p>Clientes cadastrados na plataforma</p>
      </div>
    </div>

    <div v-if="loading" class="loading">Carregando usuários...</div>
    <div v-else-if="users.length === 0" class="empty">Nenhum usuário encontrado.</div>
    <div v-else class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Email</th>
            <th>Perfil</th>
            <th>Cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td class="user-col">
              <div class="avatar">{{ (user.name || 'U')[0].toUpperCase() }}</div>
              {{ user.name }}
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span class="badge" :class="user.role === 'admin' ? 'admin' : 'user'">
                {{ user.role === 'admin' ? 'Admin' : 'Cliente' }}
              </span>
            </td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td class="actions">
              <button class="delete-btn" @click="deleteUser(user._id)">Remover</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const users = ref<any[]>([])
const loading = ref(true)
const token = localStorage.getItem('token')

const formatDate = (d: string) => d ? new Date(d).toLocaleDateString('pt-BR') : '—'

const fetchUsers = async () => {
  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.ok) users.value = await res.json()
  } catch { } finally { loading.value = false }
}

const deleteUser = async (id: string) => {
  if (!confirm('Tem certeza que deseja remover este usuário?')) return
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (res.ok) fetchUsers()
}

onMounted(fetchUsers)
</script>

<style scoped>
.page-head { margin-bottom: 30px; }
.page-head p { color: #777; margin-top: 4px; }
.loading, .empty { color: #555; padding: 60px 0; text-align: center; }
.table-wrapper { background: #151515; border: 1px solid #222; border-radius: 24px; overflow: hidden; }
table { width: 100%; border-collapse: collapse; }
thead { background: #1b1b1b; }
th { text-align: left; padding: 18px 20px; color: #666; font-size: 0.78rem; letter-spacing: 1px; text-transform: uppercase; }
td { padding: 18px 20px; border-top: 1px solid #1a1a1a; font-size: 0.9rem; }
.user-col { display: flex; align-items: center; gap: 14px; }
.avatar { width: 42px; height: 42px; border-radius: 50%; background: #c9a96e; color: #000; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
.badge { padding: 6px 14px; border-radius: 999px; font-size: 0.75rem; }
.badge.admin { background: #2d1f3b; color: #a29bfe; }
.badge.user { background: #1f3b2d; color: #55efc4; }
.actions { display: flex; gap: 10px; }
.delete-btn { height: 38px; padding: 0 16px; border: none; border-radius: 10px; background: #341818; color: #ff7675; cursor: pointer; font-size: 0.85rem; }
</style>
