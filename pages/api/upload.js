// pages/api/upload.js
// Catbox.moe ga server tomondan upload qiladi (CORS muammosi yo‘q)
// Siz bergan userhash: 2f5d304c9d3a6788a634c9250

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '80mb', // video katta bo‘lsa oshirishingiz mumkin
      },
    },
  };
  
  const CATBOX_ENDPOINT = 'https://catbox.moe/user/api.php';
  const CATBOX_USERHASH = '2f5d304c9d3a6788a634c9250';
  
  // Ba'zi serverlarda FormData/Blob global bo'ladi, bo'lmasa node:buffer dan olamiz
  async function getFormDataAndBlob() {
    if (typeof FormData !== 'undefined' && typeof Blob !== 'undefined') {
      return { FormData, Blob };
    }
    try {
      const mod = await import('node:buffer');
      return { FormData: mod.FormData, Blob: mod.Blob };
    } catch (e) {
      return { FormData: undefined, Blob: undefined };
    }
  }
  
  function extFromName(name = '') {
    const i = name.lastIndexOf('.');
    if (i === -1) return '';
    return name.slice(i).toLowerCase();
  }
  
  function normalizeName(originalName = 'file') {
    // Catbox ba'zan g'alati belgilarni yoqtirmaydi — soddalashtiramiz
    const safe = originalName
      .replace(/[^\w.\-]+/g, '_')
      .replace(/_+/g, '_')
      .slice(0, 120);
    return safe || 'file';
  }
  
  export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
    try {
      const { fileBase64, fileName, fileType } = req.body || {};
  
      if (!fileBase64 || !fileName) {
        return res.status(400).json({ error: 'fileBase64 va fileName majburiy' });
      }
  
      const { FormData, Blob } = await getFormDataAndBlob();
      if (!FormData || !Blob) {
        return res.status(500).json({
          error: "Serverda FormData/Blob topilmadi. Node 18+ yoki polyfill kerak bo'lishi mumkin.",
        });
      }
  
      // Base64 -> Buffer
      const buffer = Buffer.from(String(fileBase64), 'base64');
      if (!buffer?.length) return res.status(400).json({ error: 'Base64 fayl bo‘sh' });
  
      const safeName = normalizeName(fileName);
      const mime =
        (typeof fileType === 'string' && fileType.trim()) ||
        (safeName.endsWith('.mp4') ? 'video/mp4' : 'application/octet-stream');
  
      // Catbox "fileToUpload" field talab qiladi
      const form = new FormData();
      form.append('reqtype', 'fileupload');
      form.append('userhash', CATBOX_USERHASH);
  
      // Blob + filename
      const blob = new Blob([buffer], { type: mime });
      form.append('fileToUpload', blob, safeName);
  
      const r = await fetch(CATBOX_ENDPOINT, {
        method: 'POST',
        body: form,
      });
  
      const text = await r.text();
  
      if (!r.ok) {
        return res.status(502).json({
          error: `Catbox HTTP xato: ${r.status}`,
          detail: text?.slice(0, 4000),
        });
      }
  
      // Catbox muvaffaqiyatda faqat URL string qaytaradi
      const url = (text || '').trim();
  
      if (!url.startsWith('http')) {
        // Ba'zan xatolik matn qaytishi mumkin
        return res.status(400).json({
          error: 'Catbox javobi URL emas',
          detail: url?.slice(0, 4000),
        });
      }
  
      // Hammasi OK
      return res.status(200).json({
        ok: true,
        url,
        name: safeName,
        type: mime,
        size: buffer.length,
        ext: extFromName(safeName),
      });
    } catch (err) {
      return res.status(500).json({ error: err?.message || 'Server error' });
    }
  }