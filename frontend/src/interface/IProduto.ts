export interface IProduto{
    id: string
    nome:string
    preco:number
    linksImagens: string[]
    
    ocasiao?: "Aniversário" | "Casamento" | "Formatura" | "Festa de família"
    descricao?:string
    tamanhos?: string[]
}