import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
let client: SupabaseClient | null = null;
let configurationError = '';
if (url || key) {
 if (!url || !key) configurationError = 'Preencha URL e chave pública do Supabase no .env e reinicie o Expo.';
 else { try { client = createClient(url, key, { auth: { storage: AsyncStorage, persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } }); } catch { configurationError = 'Configuração Supabase inválida. Confira a URL e a chave pública no .env.'; } }
}
export const supabase = client;
export const dataMode = url || key ? 'Supabase' : 'Local';
export function assertDataConfiguration() { if (configurationError) throw new Error(configurationError); }
export async function getUserId() {
 assertDataConfiguration();
 if (!supabase) throw new Error('Supabase não configurado.');
 const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
 if (sessionError) throw sessionError;
 if (sessionData.session) return sessionData.session.user.id;
 const { data, error } = await supabase.auth.signInAnonymously();
 if (error) throw error;
 if (!data.user) throw new Error('Não foi possível iniciar a sessão.');
 return data.user.id;
}