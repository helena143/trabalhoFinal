export interface IPerfume {
  id: string
  nome: string
  preco: number
  imagem: string
  volumes: IVolumePerfume[]
}

export interface IVolumePerfume{
    tamanho: string
    preco: number
}