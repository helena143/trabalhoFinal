export interface IUser {
  id: number
  nome: string
  email: string
  senha?: string
  telefone?: string
  foto?: string
  ativo: boolean
  criadoEm: string
} 