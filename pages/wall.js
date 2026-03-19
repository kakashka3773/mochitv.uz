import { useEffect, useState, useCallback, useRef } from 'react';
import Head from 'next/head';
import { Search, Download, Share2, X, Check, Image as ImageIcon } from 'lucide-react';
import MobileNavbar from '../components/MobileNavbar';

// Fisher-Yates shuffle
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Ekran kengligiga qarab ustunlar soni
function getColCount() {
  if (typeof window === 'undefined') return 2;
  const w = window.innerWidth;
  if (w >= 1600) return 6;
  if (w >= 1200) return 5;
  if (w >= 900)  return 4;
  if (w >= 600)  return 3;
  return 2;
}

// Rasmlarni ustunlarga round-robin taqsimlash
function buildColumns(items, colCount) {
  const cols = Array.from({ length: colCount }, () => []);
  items.forEach((item, i) => cols[i % colCount].push(item));
  return cols;
}

export default function Wallpapers() {
  const [allWallpapers, setAllWallpapers]           = useState([]);
  const [filteredWallpapers, setFilteredWallpapers] = useState([]);
  const [wallpapers, setWallpapers]                 = useState([]);
  const [colCount, setColCount]                     = useState(getColCount);
  const [loading, setLoading]                       = useState(true);
  const [searchQuery, setSearchQuery]               = useState('');
  const [debouncedQuery, setDebouncedQuery]         = useState('');
  const [offset, setOffset]                         = useState(0);
  const [hasMore, setHasMore]                       = useState(true);
  const [selectedImage, setSelectedImage]           = useState(null);
  const [toast, setToast]                           = useState({ show: false, message: '', type: 'success' });
  const [currentUser, setCurrentUser]               = useState(null);
  const [downloading, setDownloading]               = useState(false);

  // Shuffle bir marta — refresh bo'lmaguncha o'zgarmaydi
  const shuffledRef = useRef([]);

  // Ekran o'lchamiga qarab ustunlar sonini yangilash
  useEffect(() => {
    const onResize = () => setColCount(getColCount());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('anime_user');
    if (user) setCurrentUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/get-wall');
        if (!res.ok) throw new Error('Xatolik');
        const data = await res.json();
        const shuffled = shuffleArray(data || []);
        shuffledRef.current = shuffled;
        setAllWallpapers(shuffled);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWallpapers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const filtered = debouncedQuery.trim()
      ? shuffledRef.current.filter(item => {
          const q = debouncedQuery.toLowerCase();
          return (
            (item.title && item.title.toLowerCase().includes(q)) ||
            (item.keywords && item.keywords.some(kw => kw.toLowerCase().includes(q)))
          );
        })
      : shuffledRef.current;

    setFilteredWallpapers(filtered);
    setWallpapers(filtered.slice(0, 30));
    setOffset(30);
    setHasMore(filtered.length > 30);
  }, [debouncedQuery, allWallpapers]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedId = params.get('id');
    if (sharedId && allWallpapers.length > 0) {
      const target = allWallpapers.find(w => w.id.toString() === sharedId);
      if (target) openModal(target, false);
    }
  }, [allWallpapers]);

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    const nextBatch = filteredWallpapers.slice(offset, offset + 30);
    setWallpapers(prev => [...prev, ...nextBatch]);
    setOffset(prev => prev + 30);
    if (offset + 30 >= filteredWallpapers.length) setHasMore(false);
  }, [hasMore, offset, filteredWallpapers]);

  const observer = useRef();
  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) loadMore();
    }, { rootMargin: '400px' });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  const openModal = (img, updateUrl = true) => {
    setSelectedImage(img);
    if (updateUrl) window.history.pushState({}, '', `/wall?id=${img.id}`);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    window.history.pushState({}, '', '/wall');
    document.body.style.overflow = 'auto';
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleShare = async (e, img) => {
    e?.stopPropagation();
    const link = `${window.location.origin}/wall?id=${img.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: img.title || 'Anime Wallpaper', url: link });
      } else {
        await navigator.clipboard.writeText(link);
        showToast('Link nusxalandi!');
      }
    } catch {}
  };

  const handleDownload = async (e, img) => {
    e?.stopPropagation();
    if (downloading) return;
    setDownloading(true);
    showToast('Yuklanmoqda...', 'info');

    const tryFetch = async (url) => {
      const r = await fetch(url, { mode: 'cors' });
      if (!r.ok) throw new Error('failed');
      return r.blob();
    };

    const proxies = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(img.image_url)}`,
      `https://corsproxy.io/?${encodeURIComponent(img.image_url)}`,
    ];

    let blob = null;
    try { blob = await tryFetch(img.image_url); } catch {}
    if (!blob) {
      for (const proxy of proxies) {
        try { blob = await tryFetch(proxy); break; } catch {}
      }
    }

    if (blob) {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `mochitv-wallpaper-${img.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      showToast('Muvaffaqiyatli yuklandi!');
    } else {
      window.open(img.image_url, '_blank');
      showToast('Rasm yangi tabda ochildi, saqlang!', 'info');
    }
    setDownloading(false);
  };

  // Ustunlarga taqsimlash
  const columns = buildColumns(wallpapers, colCount);
  const totalItems = wallpapers.length;

  return (
    <>
      <Head>
        <title>MochiTv Wallpapers | Style Anime</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; outline: none; }
        html, body { width: 100%; min-height: 100%; background: #090b10; color: #fff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; overscroll-behavior-y: none; }

        .bg-grid {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px; pointer-events: none; z-index: 0;
        }

        .container { position: relative; z-index: 1; padding-bottom: 90px; }

        .search-wrapper {
          position: sticky; top: 0; z-index: 100;
          padding: 15px 20px; display: flex; justify-content: center;
          background: linear-gradient(to bottom, rgba(9,11,16,0.97) 60%, transparent 100%);
          backdrop-filter: blur(10px);
        }
        .search-box {
          position: relative; width: 100%; max-width: 600px;
          display: flex; align-items: center;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px; padding: 5px 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: all 0.3s ease;
        }
        .search-box:focus-within {
          background: rgba(255,255,255,0.08); border-color: rgba(59,130,246,0.6);
          box-shadow: 0 0 20px rgba(59,130,246,0.2); transform: translateY(-2px);
        }
        .search-icon { color: rgba(255,255,255,0.4); }
        .search-input { flex: 1; background: transparent; border: none; padding: 12px 15px; color: #fff; font-size: 15px; }
        .search-input::placeholder { color: rgba(255,255,255,0.3); }
        .clear-btn { background: rgba(255,255,255,0.1); border: none; border-radius: 50%; padding: 4px; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .clear-btn:hover { background: rgba(255,75,75,0.8); }

        /* Masonry: har ustun alohida div — column-count ishlatilmaydi */
        .masonry-wrapper {
          display: flex; gap: 16px;
          padding: 10px 20px; max-width: 1800px; margin: 0 auto;
          align-items: flex-start;
        }
        @media (max-width: 900px) { .masonry-wrapper { gap: 12px; } }
        @media (max-width: 600px) { .masonry-wrapper { gap: 8px; padding: 8px; } }

        .masonry-col { flex: 1; display: flex; flex-direction: column; gap: 16px; min-width: 0; }
        @media (max-width: 900px) { .masonry-col { gap: 12px; } }
        @media (max-width: 600px) { .masonry-col { gap: 8px; } }

        .masonry-item {
          position: relative; border-radius: 14px; overflow: hidden;
          cursor: pointer; background: rgba(255,255,255,0.02);
          transform: translateZ(0);
        }
        @media (max-width: 600px) { .masonry-item { border-radius: 10px; } }

        .wall-img {
          width: 100%; display: block; border-radius: 14px;
          opacity: 0; filter: blur(8px);
          transition: opacity 0.4s ease, filter 0.4s ease, transform 0.4s ease;
        }
        .wall-img.loaded { opacity: 1; filter: blur(0); }
        .masonry-item:hover .wall-img { transform: scale(1.03); }
        @media (max-width: 600px) { .wall-img { border-radius: 10px; } }

        .img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.3s ease;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 12px; pointer-events: none;
        }
        .masonry-item:hover .img-overlay { opacity: 1; }
        @media (max-width: 768px) { .img-overlay { display: none; } }

        .action-btns { display: flex; justify-content: space-between; align-items: center; pointer-events: auto; }
        .title-text { color: #fff; font-weight: 600; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 55%; }
        .icon-group { display: flex; gap: 8px; }
        .icon-btn {
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,0.18); backdrop-filter: blur(6px);
          border: none; color: #fff; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
        }
        .icon-btn:active { transform: scale(0.88); }
        .icon-btn:hover { background: #3b82f6; }
        .icon-btn.download:hover { background: #10b981; }

        .skeleton-item {
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%);
          background-size: 200% 100%; animation: loading-skeleton 1.5s infinite;
          border-radius: 14px;
        }
        @keyframes loading-skeleton { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.88); z-index: 99999;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(12px); animation: fadeIn 0.2s ease-out; padding: 16px;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal-close {
          position: fixed; top: 16px; right: 16px;
          background: rgba(255,255,255,0.12); width: 44px; height: 44px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: 1px solid rgba(255,255,255,0.15); color: white;
          transition: background 0.2s, transform 0.3s; z-index: 10;
        }
        .modal-close:hover { background: rgba(255,255,255,0.22); transform: rotate(90deg); }
        .modal-close:active { transform: scale(0.9); }

        .modal-content {
          position: relative; display: flex; flex-direction: column; align-items: center;
          animation: popUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); max-width: 100%;
        }
        @keyframes popUp { from { transform: scale(0.88); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        .modal-img {
          max-width: min(90vw, 800px); max-height: 60vh;
          object-fit: contain; border-radius: 14px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.6); display: block;
        }
        @media (max-width: 600px) { .modal-img { max-width: 95vw; max-height: 55vh; border-radius: 10px; } }

        .modal-title {
          margin-top: 14px; color: rgba(255,255,255,0.75); font-size: 14px;
          font-weight: 500; text-align: center; max-width: 90%;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .modal-actions {
          display: flex; gap: 12px; margin-top: 18px;
          width: 100%; justify-content: center; flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          border: none; padding: 13px 28px; border-radius: 30px;
          font-weight: 700; font-size: 15px; cursor: pointer;
          display: flex; align-items: center; gap: 8px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          min-width: 140px; justify-content: center;
          -webkit-tap-highlight-color: transparent;
        }
        @media (max-width: 400px) {
          .btn-primary, .btn-secondary { padding: 12px 20px; font-size: 14px; min-width: 120px; }
        }

        .btn-secondary {
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); color: white;
        }
        .btn-secondary:hover { background: rgba(255,255,255,0.18); }
        .btn-secondary:active { transform: scale(0.95); }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;
          box-shadow: 0 6px 20px rgba(59,130,246,0.35);
        }
        .btn-primary:hover { background: linear-gradient(135deg, #2563eb, #1d4ed8); box-shadow: 0 8px 25px rgba(59,130,246,0.45); transform: translateY(-1px); }
        .btn-primary:active { transform: scale(0.95); box-shadow: none; }
        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .toast {
          position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
          padding: 12px 22px; border-radius: 30px; font-weight: 600; font-size: 14px;
          z-index: 100000; display: flex; align-items: center; gap: 10px;
          animation: slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          white-space: nowrap; max-width: 90vw;
        }
        .toast-success { background: #10b981; box-shadow: 0 10px 30px rgba(16,185,129,0.4); }
        .toast-info    { background: #3b82f6; box-shadow: 0 10px 30px rgba(59,130,246,0.4); }
        @keyframes slideUp { from { bottom: 60px; opacity: 0; } to { bottom: 100px; opacity: 1; } }

        .empty-state { text-align: center; color: rgba(255,255,255,0.35); padding: 80px 20px; }
      `}</style>

      <div className="bg-grid" />

      <div className="container">

        {/* QIDIRUV */}
        <div className="search-wrapper">
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Qidirish... (masalan: naruto, 4k)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-btn" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {wallpapers.length === 0 && !loading && (
          <div className="empty-state">
            <ImageIcon size={50} style={{ opacity: 0.3, margin: '0 auto 15px', display: 'block' }} />
            <p>Hozircha rasmlar topilmadi.</p>
          </div>
        )}

        {/* MASONRY — har ustun alohida div, reflow yo'q */}
        {loading ? (
          <div className="masonry-wrapper">
            {Array.from({ length: colCount }).map((_, ci) => (
              <div key={ci} className="masonry-col">
                {Array.from({ length: 5 }).map((_, i) => {
                  const heights = ['200px', '260px', '310px', '180px', '290px'];
                  return <div key={i} className="skeleton-item" style={{ height: heights[(ci + i) % 5] }} />;
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="masonry-wrapper">
            {columns.map((col, ci) => (
              <div key={ci} className="masonry-col">
                {col.map((item, rowIdx) => {
                  // Oxirgi element: global oxirgi item
                  const globalIdx = rowIdx * colCount + ci;
                  const isLast = globalIdx === totalItems - 1;
                  return (
                    <div
                      key={item.id}
                      ref={isLast ? lastElementRef : null}
                      className="masonry-item"
                      onClick={() => openModal(item)}
                    >
                      <img
                        src={item.image_url}
                        alt={item.title || 'Anime Wallpaper'}
                        className="wall-img"
                        loading="lazy"
                        decoding="async"
                        onLoad={e => e.target.classList.add('loaded')}
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                      <div className="img-overlay">
                        <div className="action-btns">
                          <span className="title-text">{item.title || 'Wallpaper'}</span>
                          <div className="icon-group">
                            <button className="icon-btn" title="Ulashish" onClick={e => handleShare(e, item)}>
                              <Share2 size={15} />
                            </button>
                            <button className="icon-btn download" title="Yuklab olish" onClick={e => handleDownload(e, item)}>
                              <Download size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* MODAL */}
        {selectedImage && (
          <div className="modal-overlay" onClick={closeModal}>
            <button className="modal-close" onClick={closeModal}><X size={22} /></button>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title || 'Wallpaper'}
                className="modal-img"
              />
              {selectedImage.title && <p className="modal-title">{selectedImage.title}</p>}
              <div className="modal-actions">
                <button className="btn-secondary" onClick={e => handleShare(e, selectedImage)}>
                  <Share2 size={17} /> Ulashish
                </button>
                <button className="btn-primary" onClick={e => handleDownload(e, selectedImage)} disabled={downloading}>
                  <Download size={17} /> {downloading ? 'Yuklanmoqda...' : 'Yuklab olish'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TOAST */}
        {toast.show && (
          <div className={`toast toast-${toast.type}`}>
            <Check size={16} /> {toast.message}
          </div>
        )}
      </div>

      <MobileNavbar currentUser={currentUser} activeTab="wall" />
    </>
  );
}