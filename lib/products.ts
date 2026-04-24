export type PizzaSize = 'mini' | 'media' | 'familiar'

export interface PizzaSizeOption {
  id: PizzaSize
  label: string
  price: number
}

export const pizzaSizes: PizzaSizeOption[] = [
  { id: 'mini', label: 'Mini', price: 2500 },
  { id: 'media', label: 'Média', price: 7000 },
  { id: 'familiar', label: 'Familiar', price: 9000 },
]

export interface Product {
  id: string
  name: string
  description: string
  ingredients: string[]
  image: string
  category: 'classica' | 'especial' | 'vegetariana' | 'doce'
  badge?: {
    text: string
    type: 'destaque' | 'picante' | 'veggie' | 'doce'
  }
  hasSizes: boolean
  fixedPrice?: number
  calzoneOptions?: string[]
}

export const products: Product[] = [
  {
    id: 'marguerita',
    name: 'Marguerita',
    description: 'A clássica italiana com ingredientes frescos e saborosos.',
    ingredients: ['Queijo', 'Mozzarella', 'Tomate', 'Manjericão', 'Orégano'],
    image: '/images/pizza1.jpg',
    category: 'classica',
    hasSizes: true,
  },
  {
    id: 'havaiana',
    name: 'Havaiana',
    description: 'O sabor tropical com a combinação perfeita de doce e salgado.',
    ingredients: ['Queijo', 'Mozzarella', 'Fiambre', 'Ananás', 'Orégano'],
    image: '/images/pizza7.jpg',
    category: 'classica',
    hasSizes: true,
  },
  {
    id: 'bolonesa',
    name: 'Bolonesa',
    description: 'Recheio generoso de carne com toque defumado.',
    ingredients: ['Queijo', 'Mozzarella', 'Chouriço', 'Carne', 'Bacon', 'Cebola', 'Pimenta', 'Orégano'],
    image: '/images/pizza5.jpg',
    category: 'classica',
    hasSizes: true,
  },
  {
    id: 'frango-picante',
    name: 'Frango Picante',
    description: 'Para os amantes de sabores intensos e picantes.',
    ingredients: ['Queijo', 'Mozzarella', 'Frango Picante', 'Cebola', 'Milho', 'Pimenta', 'Azeitonas', 'Orégano'],
    image: '/images/pizza2.jpg',
    category: 'classica',
    badge: { text: 'Picante', type: 'picante' },
    hasSizes: true,
  },
  {
    id: 'piturca',
    name: 'Piturca',
    description: 'A especialidade da casa! Uma combinação única e irresistível.',
    ingredients: ['Queijo', 'Mozzarella', 'Chouriço', 'Azeitona', 'Carne', 'Cebola', 'Orégano'],
    image: '/images/pizza3.jpg',
    category: 'especial',
    badge: { text: 'Especial', type: 'destaque' },
    hasSizes: true,
  },
  {
    id: 'vegetariana',
    name: 'Vegetariana',
    description: 'Leve, saudável e cheia de sabor natural.',
    ingredients: ['Queijo', 'Mozzarella', 'Cebola', 'Milho', 'Cogumelos', 'Azeitonas', 'Orégano'],
    image: '/images/pizza4.jpg',
    category: 'vegetariana',
    badge: { text: 'Veg', type: 'veggie' },
    hasSizes: true,
  },
  {
    id: 'frango-bbq',
    name: 'Frango BBQ',
    description: 'Frango suculento com molho barbecue defumado.',
    ingredients: ['Queijo', 'Mozzarella', 'Frango', 'Cebola', 'Orégãos', 'Pimenta', 'Orégano'],
    image: '/images/pizza8.jpg',
    category: 'classica',
    hasSizes: true,
  },
  {
    id: 'calzone',
    name: 'Calzone',
    description: 'Massa recheada e assada no ponto perfeito.',
    ingredients: ['Massa recheada com os ingredientes da sua escolha'],
    image: '/images/pizza6.jpg',
    category: 'especial',
    badge: { text: 'Especial', type: 'destaque' },
    hasSizes: true,
    calzoneOptions: ['Frango', 'Vegetariana', 'Bolonesa'],
  },
  {
    id: 'chocolate',
    name: 'Chocolate com Banana',
    description: 'Deliciosa pizza doce com chocolate derretido e banana fresca.',
    ingredients: ['Chocolate', 'Banana', 'Canela'],
    image: '/images/pizza9.jpg',
    category: 'doce',
    badge: { text: 'Doce', type: 'doce' },
    hasSizes: false,
    fixedPrice: 5000,
  },
]

export const categories = [
  { id: 'todos', label: 'Todas' },
  { id: 'classica', label: 'Clássicas' },
  { id: 'especial', label: 'Especiais' },
  { id: 'vegetariana', label: 'Vegetariana' },
  { id: 'doce', label: 'Doces' },
] as const

export type Category = typeof categories[number]['id']

export function getPriceForSize(size: PizzaSize): number {
  const sizeOption = pizzaSizes.find(s => s.id === size)
  return sizeOption?.price ?? 7000
}

export function getSizeLabel(size: PizzaSize): string {
  const sizeOption = pizzaSizes.find(s => s.id === size)
  return sizeOption?.label ?? 'Média'
}
