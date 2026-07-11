'use server'

import { auth } from '@/lib/auth'
import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { nanoid } from 'nanoid'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  size?: string
  calzoneOption?: string
}

interface CreateOrderInput {
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  customerName: string
  customerEmail: string
  customerPhone: string
  address: string
  notes?: string
}

export async function createOrder(input: CreateOrderInput) {
  const userId = await getUserId()
  const orderId = nanoid()
  
  await db.execute(
    sql`INSERT INTO "orders" 
    (id, "userId", items, subtotal, "deliveryFee", total, status, "customerName", "customerEmail", "customerPhone", address, notes, "createdAt", "updatedAt")
    VALUES (${orderId}, ${userId}, ${JSON.stringify(input.items)}, ${input.subtotal}, ${input.deliveryFee}, ${input.total}, 'pending', ${input.customerName}, ${input.customerEmail}, ${input.customerPhone}, ${input.address}, ${input.notes || null}, NOW(), NOW())`
  )
  
  revalidatePath('/pedidos')
  return { success: true, orderId }
}

export async function getOrders() {
  const userId = await getUserId()
  
  const orders = await db.execute(
    sql`SELECT * FROM "orders" WHERE "userId" = ${userId} ORDER BY "createdAt" DESC`
  )
  
  return orders.rows || []
}

export async function getOrderById(orderId: string) {
  const userId = await getUserId()
  
  const orders = await db.execute(
    sql`SELECT * FROM "orders" WHERE id = ${orderId} AND "userId" = ${userId}`
  )
  
  if (!orders.rows || orders.rows.length === 0) {
    throw new Error('Pedido não encontrado')
  }
  
  return orders.rows[0]
}
