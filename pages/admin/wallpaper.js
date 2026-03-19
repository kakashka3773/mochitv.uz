import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Image as ImageIcon, Plus, Trash2, X, Upload, Loader, Edit, ArrowLeft, Tag } from 'lucide-react';

// Supabase ma'lumotlar saqlash va o'chirish uchun kerak bo'ladi
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function WallpaperAdmin() {
  const [modal, setModal] = useState({ show: false, type: '', message: '', title: '', onConfirm: null, data: null });
  const[wallpaperList, setWallpaperList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const[authChecked, setAuthChecked] = useState(false);

  const showModal = (type, message, onConfirm = null, title = '', data = null) => {
    setModal({ show: true, type, message, onConfirm, title, data });
  };

  const hideModal = () => {
    setModal({ show: false, type: '', message: '', title: '', onConfirm: null, data: null });
  };

  useEffect(() => {
    checkAuth();
  },[]);

  const checkAuth = () => {
    const user = localStorage.getItem('anime_user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.username === 'Malika') {
        setCurrentUser(parsedUser);
        loadWallpapers();
      } else {
        showModal('error', 'Sizda admin panelga kirish huquqi yo\'q!', () => {
          window.location.href = '/';
        });
      }
    } else {
      showModal('error', 'Iltimos avval tizimga kiring!', () => {
        window.location.href = '/';
      });
    }
    setAuthChecked(true);
  };

  // ✅ 1. Barcha ma'lumotlarni o'zimizning API orqali olib kelamiz
  const loadWallpapers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/get-wall');
      if (!response.ok) {
        throw new Error('Serverdan ma\'lumot olishda xato!');
      }
      const data = await response.json();
      setWallpaperList(data ||[]);
    } catch (error) {
      console.error('Error loading wallpapers:', error);
      showModal('error', 'Wallpaperlarni yuklashda xato: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWallpaper = () => {
    showModal('form', '', null, 'Wallpaper qo\'shish');
  };

  const handleEditWallpaper = (wallpaper) => {
    showModal('form', '', null, 'Wallpaper tahrirlash', wallpaper);
  };

  const handleDeleteWallpaper = (id, title) => {
    showModal('error', `"${title}" ni o'chirmoqchimisiz?`, async () => {
      try {
        const { error } = await supabase
          .from('wallpaper')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        showModal('success', 'Wallpaper muvaffaqiyatli o\'chirildi!');
        loadWallpapers();
      } catch (error) {
        showModal('error', 'Xato: ' + error.message);
      }
    });
  };

  if (!authChecked || !currentUser || currentUser.username !== 'Malika') {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; outline: none; }
        body { font-family: 'Courier New', Courier, monospace; background: #000000; color: #ffffff; padding: 20px; min-height: 100vh; }
        .admin-container { max-width: 1400px; margin: 0 auto; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding: 30px; background: #000000; border-radius: 8px; border: 2px solid #ffffff; flex-wrap: wrap; gap: 15px; }
        .admin-title { font-size: 32px; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 2px; }
        .btn { background: #000000; border: 2px solid #ffffff; color: #ffffff; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s; display: flex; align-items: center; gap: 8px; text-transform: uppercase; }
        .btn:hover { background: #ffffff; color: #000000; }
        .action-buttons { display: flex; gap: 20px; margin-bottom: 40px; flex-wrap: wrap; }
        .action-btn { background: #000000; color: #ffffff; border: 2px solid #ffffff; padding: 16px 32px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 700; transition: all 0.2s; display: flex; align-items: center; gap: 12px; text-transform: uppercase; }
        .action-btn:hover { background: #ffffff; color: #000000; }
        
        .wallpaper-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; margin-bottom: 40px; }
        .wallpaper-card { background: #000000; border: 2px solid #ffffff; border-radius: 12px; overflow: hidden; transition: all 0.2s; display: flex; flex-direction: column; }
        .wallpaper-card:hover { transform: translateY(-4px); box-shadow: 8px 8px 0 #ffffff; }
        .card-image-wrapper { width: 100%; position: relative; overflow: hidden; border-bottom: 2px solid #ffffff; background: #111; padding-top: 56.25%; }
        .card-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .wallpaper-card:hover .card-image { transform: scale(1.05); }
        .card-content { padding: 20px; flex: 1; display: flex; flex-direction: column; }
        .card-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-transform: uppercase; }
        .card-keywords { font-size: 12px; color: #aaaaaa; margin-bottom: 16px; display: flex; flex-wrap: wrap; gap: 5px; }
        .keyword-badge { background: #222; border: 1px solid #555; padding: 3px 8px; border-radius: 4px; }
        .card-actions { display: flex; flex-direction: column; gap: 10px; margin-top: auto; }
        .card-btn { background: #000000; border: 2px solid #ffffff; color: #ffffff; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; text-transform: uppercase; }
        .card-btn:hover { background: #ffffff; color: #000000; }

        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.95); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px; overflow-y: auto; }
        .modal { background: #000000; border: 2px solid #ffffff; border-radius: 12px; padding: 40px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #ffffff; }
        .modal-title { font-size: 24px; font-weight: 700; color: #ffffff; text-transform: uppercase; }
        .modal-close { background: #000000; border: 2px solid #ffffff; color: #ffffff; cursor: pointer; padding: 0; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; border-radius: 8px; }
        .modal-close:hover { background: #ffffff; color: #000000; }
        .form-group { margin-bottom: 24px; }
        .form-label { display: block; margin-bottom: 10px; font-size: 14px; font-weight: 600; color: #ffffff; text-transform: uppercase; }
        .form-input { width: 100%; padding: 14px 16px; background: #000000; border: 2px solid #ffffff; border-radius: 8px; color: #ffffff; font-size: 15px; font-family: 'Courier New', Courier, monospace; transition: all 0.2s; }
        .form-input:focus { outline: none; background: #111; }
        
        .form-file-upload { border: 2px dashed #ffffff; border-radius: 8px; padding: 30px; text-align: center; cursor: pointer; transition: all 0.2s; background: #000000; position: relative; display: block; }
        .form-file-upload:hover { background: #111111; }
        .form-file-upload input { display: none; }
        .file-upload-content { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .file-upload-icon { width: 60px; height: 60px; border: 2px solid #ffffff; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #000000; }
        
        .image-preview { margin-top: 20px; border-radius: 8px; overflow: hidden; width: 100%; border: 2px solid #ffffff; position: relative; }
        .image-preview img { width: 100%; height: auto; display: block; }
        
        .keyword-input-wrapper { display: flex; gap: 10px; margin-bottom: 12px; }
        .keyword-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
        .keyword-tag { background: #000000; border: 2px solid #ffffff; color: #ffffff; padding: 8px 16px; border-radius: 8px; font-size: 13px; display: flex; align-items: center; gap: 8px; font-weight: 600; text-transform: uppercase; }
        .keyword-tag button { background: none; border: none; color: #ffffff; cursor: pointer; padding: 0; font-size: 18px; line-height: 1; transition: opacity 0.2s; }
        .keyword-tag button:hover { opacity: 0.6; }

        .modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 30px; }
        .modal-btn { padding: 12px 28px; border-radius: 8px; border: 2px solid #ffffff; font-weight: 700; cursor: pointer; font-size: 15px; transition: all 0.2s; font-family: 'Courier New', Courier, monospace; text-transform: uppercase; background: #000000; color: #ffffff; }
        .modal-btn:hover { background: #ffffff; color: #000000; }
        .modal-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .loading, .empty-state { text-align: center; padding: 60px; color: #ffffff; font-size: 18px; grid-column: 1 / -1; }
        
        .progress-container { margin-top: 24px; padding: 24px; background: #000000; border-radius: 8px; border: 2px solid #ffffff; }
        .progress-label { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; font-weight: 600; }
        .progress-bar-bg { width: 100%; height: 10px; border: 2px solid #ffffff; border-radius: 8px; overflow: hidden; }
        .progress-bar-fill { height: 100%; background: #ffffff; transition: width 0.3s ease; }
        
        .alert-modal { max-width: 400px; text-align: center; }
        .alert-icon { font-size: 40px; margin-bottom: 20px; }
      `}</style>

      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">
            <ImageIcon size={32} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px' }} />
            Wallpaper Admin
          </h1>
          <button className="btn" onClick={() => window.location.href = './admin'}>
            <ArrowLeft size={16} /> Panelga Qaytish
          </button>
        </div>

        <div className="action-buttons">
          <button className="action-btn" onClick={handleAddWallpaper}>
            <Plus size={20} /> Wallpaper qo'shish
          </button>
        </div>

        <div className="wallpaper-grid">
          {loading ? (
            <div className="loading">
              <Loader size={24} style={{ display: 'inline', animation: 'spin 1s linear infinite' }} /> Yuklanmoqda...
            </div>
          ) : wallpaperList.length === 0 ? (
            <div className="empty-state">Hali wallpaper qo'shilmagan</div>
          ) : (
            wallpaperList.map(item => (
              <div key={item.id} className="wallpaper-card">
                <div className="card-image-wrapper">
                  <img className="card-image" src={item.image_url} alt={item.title} loading="lazy" />
                </div>
                <div className="card-content">
                  <div className="card-title">{item.title}</div>
                  <div className="card-keywords">
                    {item.keywords && item.keywords.map((kw, idx) => (
                      <span key={idx} className="keyword-badge">#{kw}</span>
                    ))}
                  </div>
                  <div className="card-actions">
                    <button className="card-btn" onClick={() => handleEditWallpaper(item)}>
                      <Edit size={16} /> Tahrirlash
                    </button>
                    <button className="card-btn delete" onClick={() => handleDeleteWallpaper(item.id, item.title)}>
                      <Trash2 size={16} /> O'chirish
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {modal.show && (
        <WallpaperModal 
          modal={modal} 
          hideModal={hideModal} 
          showModal={showModal}
          loadWallpapers={loadWallpapers}
          uploadProgress={uploadProgress}
          setUploadProgress={setUploadProgress}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
      )}
    </>
  );
}

function WallpaperModal({ modal, hideModal, showModal, loadWallpapers, uploadProgress, setUploadProgress, isUploading, setIsUploading }) {
  const [formData, setFormData] = useState({
    title: '',
    keywords:[],
    imageFile: null,
    imagePreview: null,
  });
  const [keywordInput, setKeywordInput] = useState('');

  useEffect(() => {
    if (modal.type === 'form' && modal.data) {
      setFormData({
        title: modal.data.title || '',
        keywords: modal.data.keywords ||[],
        imageFile: null,
        imagePreview: modal.data.image_url || null,
      });
    }
  }, [modal.type, modal.data]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        showModal('error', 'Rasm hajmi 20MB dan oshmasligi kerak!');
        return;
      }
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim().toLowerCase())) {
      setFormData({
        ...formData,
        keywords:[...formData.keywords, keywordInput.trim().toLowerCase()]
      });
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword) => {
    setFormData({ ...formData, keywords: formData.keywords.filter(k => k !== keyword) });
  };

  // ✅ 2. Rasmni o'zimizning API ga jo'natamiz
  const uploadImageToBackend = async (file) => {
    // Faylni Base64 formatiga o'tkazuvchi funksiya
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    const base64Image = await toBase64(file);

    const response = await fetch('/api/wall-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        image: base64Image, 
        name: file.name, 
        type: file.type 
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Serverga yuklashda xatolik yuz berdi!');
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async () => {
    if (!formData.title) return showModal('error', 'Qisqa nom (Title) kiritish majburiy!');
    if (formData.keywords.length === 0) return showModal('error', 'Kamida 1 ta kalit so\'z (Keyword) kiriting!');
    if (!modal.data && !formData.imageFile) return showModal('error', 'Iltimos rasm yuklang!');

    setIsUploading(true);
    setUploadProgress(0);

    try {
      setUploadProgress(10);
      let imageUrl = formData.imagePreview;

      // Agar rasm tanlangan bo'lsa, api ga jo'natamiz
      if (formData.imageFile) {
        setUploadProgress(40);
        imageUrl = await uploadImageToBackend(formData.imageFile);
      }
      
      setUploadProgress(80);

      const wallpaperData = {
        title: formData.title,
        keywords: formData.keywords,
        image_url: imageUrl,
      };

      let error;
      if (modal.data) {
        const { error: updateError } = await supabase.from('wallpaper').update(wallpaperData).eq('id', modal.data.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase.from('wallpaper').insert(wallpaperData);
        error = insertError;
      }

      if (error) throw error;

      setUploadProgress(100);

      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        hideModal();
        showModal('success', modal.data ? 'Wallpaper yangilandi!' : 'Wallpaper qo\'shildi!');
        loadWallpapers();
      }, 500);

    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      showModal('error', 'Xato: ' + error.message);
    }
  };

  if (modal.type === 'form') {
    return (
      <div className="modal-overlay" onClick={hideModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{modal.title}</h2>
            <button className="modal-close" onClick={hideModal}><X size={20} /></button>
          </div>

          <div className="form-group">
            <label className="form-label"><Upload size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> Rasm yuklash</label>
            <label className="form-file-upload">
              <input type="file" accept="image/*" onChange={handleImageChange} disabled={isUploading} />
              <div className="file-upload-content">
                <div className="file-upload-icon"><Upload size={28} /></div>
                <div>{formData.imageFile ? formData.imageFile.name : 'Rasm tanlash uchun bosing'}</div>
              </div>
            </label>
            {formData.imagePreview && (
              <div className="image-preview"><img src={formData.imagePreview} alt="Preview" /></div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Qisqa nom (Title) *</label>
            <input className="form-input" type="text" placeholder="Masalan: Naruto 4K, Cyberpunk City..." value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} disabled={isUploading} />
          </div>

          <div className="form-group">
            <label className="form-label"><Tag size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> Kalit so'zlar (Keywords) *</label>
            <div className="keyword-input-wrapper">
              <input className="form-input" type="text" placeholder="Qidiruv uchun so'z yozing (masalan: naruto, anime, 4k)" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())} style={{ flex: 1 }} disabled={isUploading} />
              <button className="btn" onClick={addKeyword} type="button" disabled={isUploading}><Plus size={16} /></button>
            </div>
            {formData.keywords.length > 0 && (
              <div className="keyword-tags">
                {formData.keywords.map((kw, idx) => (
                  <span key={idx} className="keyword-tag">#{kw} <button onClick={() => removeKeyword(kw)} type="button" disabled={isUploading}><X size={14} /></button></span>
                ))}
              </div>
            )}
          </div>

          {isUploading && (
            <div className="progress-container">
              <div className="progress-label"><span>Yuklanmoqda...</span><span>{uploadProgress}%</span></div>
              <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}></div></div>
            </div>
          )}

          <div className="modal-actions">
            <button className="modal-btn" onClick={hideModal} type="button" disabled={isUploading}>Bekor qilish</button>
            <button className="modal-btn" onClick={handleSubmit} type="button" disabled={isUploading}>{isUploading ? 'Kuting...' : 'Saqlash'}</button>
          </div>
        </div>
      </div>
    );
  }

  if (modal.type === 'success' || modal.type === 'error') {
    return (
      <div className="modal-overlay" onClick={hideModal}>
        <div className="modal alert-modal" onClick={(e) => e.stopPropagation()}>
          <div className="alert-icon">{modal.type === 'success' ? '✓' : '✕'}</div>
          <div style={{ fontSize: '18px', marginBottom: '20px' }}>{modal.message}</div>
          <div className="modal-actions" style={{ justifyContent: 'center' }}>
            {modal.onConfirm ? (
              <><button className="modal-btn" onClick={hideModal}>Yo'q</button><button className="modal-btn" style={{ background: '#ffffff', color: '#000000' }} onClick={() => { modal.onConfirm(); hideModal(); }}>Ha</button></>
            ) : (<button className="modal-btn" onClick={hideModal}>OK</button>)}
          </div>
        </div>
      </div>
    );
  }

  return null;
}