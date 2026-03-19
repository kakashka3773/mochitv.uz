// pages/api/get-wall.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Faqat GET so\'rovlariga ruxsat berilgan!' });
  }

  try {
    const { data, error } = await supabase
      .from('wallpaper')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(data ||[]);
  } catch (error) {
    console.error('API Get Wall xatosi:', error);
    res.status(500).json({ error: error.message });
  }
}