// pages/api/wall-upload.js

// Next.js da katta hajmdagi rasmlarni JSON orqali qabul qilish uchun limitni oshiramiz
export const config = {
    api: {
      bodyParser: {
        sizeLimit: '25mb',
      },
    },
  };
  
  export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Faqat POST so\'rovlariga ruxsat berilgan!' });
    }
  
    try {
      const { image, name, type } = req.body;
  
      if (!image) {
        return res.status(400).json({ error: 'Rasm yuborilmadi!' });
      }
  
      // Frontenddan kelgan Base64 rasmni Buffer (fayl) holatiga keltiramiz
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');
      
      // Node.js 18+ uchun Blob obyektini yaratamiz
      const blob = new Blob([buffer], { type: type || 'image/jpeg' });
  
      // Catbox.moe uchun FormData shakllantiramiz
      const formData = new FormData();
      formData.append('reqtype', 'fileupload');
      formData.append('userhash', '2f5d304c9d3a6788a634c9250');
      formData.append('fileToUpload', blob, name || 'wallpaper.jpg');
  
      // Catbox API ga so'rov yuborish
      const response = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Catbox serveriga yuklashda xatolik yuz berdi!');
      }
  
      // Catbox faqatgina text (URL) qaytaradi
      const url = await response.text();
  
      res.status(200).json({ url: url.trim() });
    } catch (error) {
      console.error('API Upload Xatosi:', error);
      res.status(500).json({ error: error.message });
    }
  }