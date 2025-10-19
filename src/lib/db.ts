import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface User {
  id: string
  email: string
  name?: string
  image?: string
  password?: string
  email_verified?: Date
  created_at: Date
  updated_at: Date
}

export interface Document {
  id: string
  user_id: string
  name: string
  content: string
  type: string
  created_at: Date
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !data) return null
  
  return {
    ...data,
    email_verified: data.email_verified ? new Date(data.email_verified) : undefined,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  }
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null

  return {
    ...data,
    email_verified: data.email_verified ? new Date(data.email_verified) : undefined,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  }
}

export async function createUser(data: {
  email: string
  name?: string
  image?: string
  password?: string
  email_verified?: Date
}): Promise<User> {
  const { data: user, error } = await supabase
    .from('users')
    .insert({
      email: data.email,
      name: data.name,
      image: data.image,
      password: data.password,
      email_verified: data.email_verified?.toISOString()
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create user: ${error.message}`)
  }

  return {
    ...user,
    email_verified: user.email_verified ? new Date(user.email_verified) : undefined,
    created_at: new Date(user.created_at),
    updated_at: new Date(user.updated_at)
  }
}

export async function createUserWithPassword(
  email: string,
  password: string,
  name?: string
): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10)
  
  return createUser({
    email,
    password: hashedPassword,
    name,
    email_verified: new Date()
  })
}

export async function createDocument(data: {
  user_id: string
  name: string
  content: string
  type: string
}): Promise<Document> {
  const { data: doc, error } = await supabase
    .from('documents')
    .insert({
      user_id: data.user_id,
      name: data.name,
      content: data.content,
      type: data.type
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create document: ${error.message}`)
  }

  return {
    ...doc,
    created_at: new Date(doc.created_at)
  }
}

export async function getDocumentsByUserId(userId: string): Promise<Document[]> {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching documents:', error)
    return []
  }

  return (data || []).map(doc => ({
    ...doc,
    created_at: new Date(doc.created_at)
  }))
}

export async function getDocumentById(id: string): Promise<Document | null> {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null

  return {
    ...data,
    created_at: new Date(data.created_at)
  }
}

export async function deleteDocumentById(id: string): Promise<void> {
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete document: ${error.message}`)
  }
}
