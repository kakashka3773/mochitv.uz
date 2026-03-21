export default function handler(req, res) {
  const { file } = req.query
  if (!file) return res.status(400).json({ error: "Fayl nomi yo'q" })

  // ✅ R2 public URL bo'lsa — faqat fayl nomini olib, Worker R2 binding ishlatadi
  const r2PublicDomain = "pub-783f29284d544b16a0c9a95b1e9921eb.r2.dev"
  
  let filename = file

  if (file.includes(r2PublicDomain)) {
    // https://pub-xxx.r2.dev/anime_xxx.mp4 → anime_xxx.mp4
    try {
      const parsed = new URL(file)
      filename = parsed.pathname.replace(/^\//, '')
    } catch {
      filename = file.split('/').pop()
    }
  }

  const data = `${filename}:${Date.now()}`
  const signature = btoa(data + process.env.VIDEO_SECRET).slice(0, 16)
  const token = `${btoa(data)}.${signature}`

  // ✅ R2 fayl yoki R2 public URL → Worker R2 binding orqali
  if (!filename.startsWith('http://') && !filename.startsWith('https://')) {
    const url = `https://video-stream.itachiabdurahmonov.workers.dev/watch?file=${encodeURIComponent(filename)}&token=${token}`
    return res.status(200).json({ url })
  }

  // ✅ Boshqa tashqi URL — proxy orqali
  const data2 = `${filename}:${Date.now()}`
  const signature2 = btoa(data2 + process.env.VIDEO_SECRET).slice(0, 16)
  const token2 = `${btoa(data2)}.${signature2}`
  const url = `https://video-stream.itachiabdurahmonov.workers.dev/watch?proxy=${encodeURIComponent(filename)}&token=${token2}`
  return res.status(200).json({ url })
}
