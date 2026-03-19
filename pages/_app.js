// pages/_app.js
import { useEffect } from 'react';
import Head from 'next/head';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// last_seen ni yangilash
async function updateLastSeen(userId) {
  await supabase
    .from('users')
    .update({ last_seen: new Date().toISOString() })
    .eq('id', userId);
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // LocalStorage dan userni olish
    const raw = localStorage.getItem('anime_user');
    if (!raw) return;

    let user;
    try { user = JSON.parse(raw); } catch { return; }
    if (!user?.id) return;

    // Sahifa ochilganda darhol yangilash
    updateLastSeen(user.id);

    // Har 3 daqiqada bir yangilab turish (faol bo'lsa)
    const interval = setInterval(() => {
      updateLastSeen(user.id);
    }, 3 * 60 * 1000); // 3 daqiqa

    // Sichqoncha / klaviatura harakatida ham yangilash
    const handleActivity = () => updateLastSeen(user.id);
    window.addEventListener('mousemove', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });

    // Sahifa yopilganda ham oxirgi marta yozish
    const handleUnload = () => updateLastSeen(user.id);
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Anime</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}