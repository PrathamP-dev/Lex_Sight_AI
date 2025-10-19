import { cookies } from 'next/headers'
import { getUserById } from './db'
import { supabase } from './db'

const SESSION_COOKIE_NAME = 'session_token'
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export async function createSession(userId: string): Promise<string> {
  const sessionToken = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + SESSION_DURATION)
  
  // Store session in database
  await supabase
    .from('sessions')
    .insert({
      session_token: sessionToken,
      user_id: userId,
      expires_at: expiresAt.toISOString(),
    })
  
  // Set cookie
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  })
  
  return sessionToken
}

export async function getSession() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
  
  if (!sessionToken) {
    console.log('[Auth] No session token in cookie')
    return null
  }
  
  // Get session from database
  const { data: session, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('session_token', sessionToken)
    .single()
  
  if (error) {
    console.error('[Auth] Error fetching session from database:', error)
    return null
  }
  
  if (!session) {
    console.log('[Auth] No session found in database for token')
    return null
  }
  
  // Check if session is expired
  if (new Date(session.expires_at) < new Date()) {
    await supabase
      .from('sessions')
      .delete()
      .eq('session_token', sessionToken)
    return null
  }
  
  const user = await getUserById(session.user_id)
  
  if (!user) {
    await supabase
      .from('sessions')
      .delete()
      .eq('session_token', sessionToken)
    return null
  }
  
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    },
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
  
  if (sessionToken) {
    await supabase
      .from('sessions')
      .delete()
      .eq('session_token', sessionToken)
  }
  
  cookieStore.delete(SESSION_COOKIE_NAME)
}
