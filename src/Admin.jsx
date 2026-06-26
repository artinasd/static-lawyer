// src/Admin.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';

// Icons
import BalanceIcon from '@mui/icons-material/Balance';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SecurityIcon from '@mui/icons-material/Security';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const AVAILABLE_ICONS = { Balance: BalanceIcon, Gavel: GavelIcon, AccountBalance: AccountBalanceIcon, MenuBook: MenuBookIcon, FamilyRestroom: FamilyRestroomIcon, BusinessCenter: BusinessCenterIcon, Handshake: HandshakeIcon, Assignment: AssignmentIcon, Security: SecurityIcon, HomeWork: HomeWorkIcon };

// --- CUSTOM UI COMPONENTS ---

function InputTag({ label, type = "text", placeholder, value, onChange, name }) {
    return (
        <div className="flex flex-col gap-2 w-full mb-4">
            {label && <label className="text-right font-bold text-gray-700">{label}</label>}
            <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} className="border border-gray-300 rounded-md p-3 text-right focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm" dir="rtl" />
        </div>
    );
}

function TextArea({ label, placeholder, value, onChange, name, rows = 5 }) {
    return (
        <div className="flex flex-col gap-2 w-full mb-4">
            {label && <label className="text-right font-bold text-gray-700">{label}</label>}
            <textarea name={name} placeholder={placeholder} value={value} onChange={onChange} rows={rows} className="border border-gray-300 rounded-md p-3 text-right focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm resize-y" dir="rtl" />
        </div>
    );
}

function ImageInput(props) {
    const inputRef = useRef(null);
    const [base64Image, setBase64Image] = useState(null);

    // CRITICAL FIX: Image Compression to prevent LocalStorage QuotaExceededError (5MB Limit)
    function compressImage(file, maxWidth = 800, maxHeight = 800) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Compress to 70% quality JPEG to ensure it fits in mock DB
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
                img.onerror = error => reject(error);
            };
            reader.onerror = error => reject(error);
        });
    }

    async function handleChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const compressedB64 = await compressImage(file);
            setBase64Image(compressedB64);
            if (props.onChange) props.onChange(compressedB64);
        } catch (error) {
            alert("خطا در پردازش تصویر. لطفا دوباره تلاش کنید.");
            console.error(error);
        }
    }

    return (
        <div className='rtl flex flex-row items-start gap-4'>
            <div className='w-full md:w-[50%]'>
                <h3 className='font-medium mb-2'>{props.label}</h3>
                <input ref={inputRef} onChange={handleChange} className='hidden' type='file' accept="image/*" />
                <button disabled={base64Image} className={`border rounded py-2 px-6 ${base64Image ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`} onClick={(e) => { e.preventDefault(); inputRef.current.click(); }}>
                    بارگذاری تصویر جدید
                </button>
            </div>
            { (base64Image || props.image) && <img className='rounded-md w-full md:w-[50%] object-cover h-32 shadow-sm border border-gray-200' src={base64Image || props.image} alt="Preview" /> }
        </div>
    )
}

// --- ADMIN PAGES ---

function AdminLogin() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // Mock static login
        if (user === 'admin' && pass === 'admin') {
            localStorage.setItem("token", "static-token-123");
            localStorage.setItem("isAdmin", "true");
            navigate("/admin", { replace: true });
        } else {
            alert("نام کاربری یا رمز عبور اشتباه است! (راهنما: admin / admin)");
        }
    };

    return (
        <div className='bg-gray-50 w-screen h-screen flex rtl'>
            <div className='w-[90%] md:w-[45%] bg-white shadow-lg border border-gray-100 rounded-2xl mx-auto my-auto h-fit p-10'>
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#4038C9] mb-2">ورود به سیستم مدیریت</h2>
                    <p className="text-gray-500 text-sm">برای دسترسی به پنل ادمین، نام کاربری و رمز عبور را وارد کنید.</p>
                </div>
                <InputTag placeholder='admin' label='نام کاربری (admin)' onChange={(e) => setUser(e.target.value)} />
                <InputTag placeholder='admin' label='رمز عبور (admin)' type="password" onChange={(e) => setPass(e.target.value)} />
                <button onClick={handleLogin} className='w-full text-white bg-indigo-600 hover:bg-indigo-700 py-3 px-4 rounded-xl font-bold mt-6 transition-colors shadow-md cursor-pointer'>ورود به پنل</button>
            </div>
        </div>
    )
}

function AdminPanel() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        navigate('/admin/login', { replace: true });
    };

    return (
        <div className='p-6 md:p-10 rtl min-h-[60vh] bg-gray-50'>
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                    <h1 className='text-3xl font-bold text-gray-800'>پنل مدیریت <span className="text-[#D4AF37] text-xl font-normal">(نسخه دمو)</span></h1>
                    <button onClick={handleLogout} className="text-red-500 font-bold hover:bg-red-50 px-5 py-2.5 rounded-lg border border-red-100 transition-colors cursor-pointer">خروج از سیستم</button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    <button onClick={() => navigate('/admin/new-post')} className='bg-blue-600 hover:bg-blue-700 text-white font-bold p-8 rounded-2xl transition-all hover:-translate-y-1 shadow-md text-xl cursor-pointer flex flex-col items-center gap-3'>
                        <MenuBookIcon fontSize="large" /> ثبت مقاله جدید
                    </button>
                    <button onClick={() => navigate('/admin/all-posts')} className='bg-green-600 hover:bg-green-700 text-white font-bold p-8 rounded-2xl transition-all hover:-translate-y-1 shadow-md text-xl cursor-pointer flex flex-col items-center gap-3'>
                        <AssignmentIcon fontSize="large" /> مدیریت مقالات
                    </button>
                    <button onClick={() => navigate('/admin/comments')} className='bg-purple-600 hover:bg-purple-700 text-white font-bold p-8 rounded-2xl transition-all hover:-translate-y-1 shadow-md text-xl cursor-pointer flex flex-col items-center gap-3'>
                        <HandshakeIcon fontSize="large" /> بررسی پرسش‌ها
                    </button>
                    <button onClick={() => navigate('/admin/messages')} className='bg-amber-600 hover:bg-amber-700 text-white font-bold p-8 rounded-2xl transition-all hover:-translate-y-1 shadow-md text-xl cursor-pointer flex flex-col items-center gap-3'>
                        <EmailOutlinedIcon fontSize="large" /> پیام‌های دریافتی
                    </button>
                    <button onClick={() => navigate('/admin/settings')} className='bg-gray-800 hover:bg-gray-900 text-white font-bold p-8 rounded-2xl transition-all hover:-translate-y-1 shadow-md text-xl cursor-pointer flex flex-col items-center gap-3 lg:col-span-2'>
                        <SecurityIcon fontSize="large" /> تنظیمات کلان وب‌سایت
                    </button>
                </div>
            </div>
        </div>
    );
}

function NewPost() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ title: '', excerpt: '', content: '', author: '', image: '' });
    const [loading, setLoading] = useState(false);

    const handleAddPost = () => {
        if (!formData.title.trim() || !formData.content.trim()) return alert("لطفا عنوان و متن مقاله را وارد کنید.");
        setLoading(true);
        setTimeout(() => {
            try {
                const posts = JSON.parse(localStorage.getItem('posts')) || [];
                const newPost = { ...formData, id: Date.now(), created_at: new Date().toISOString() };
                localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
                alert("مقاله با موفقیت در دیتابیس دمو ذخیره شد!");
                setFormData({ title: '', excerpt: '', content: '', author: '', image: '' });
            } catch (e) {
                alert("خطا در ذخیره‌سازی! (احتمالاً محدودیت حجم حافظه محلی).");
            } finally {
                setLoading(false);
            }
        }, 500);
    };

    return (
        <div className='bg-gray-50 min-h-screen p-6 md:p-20 rtl'>
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mx-auto w-full max-w-3xl flex flex-col gap-4'>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-100 pb-4 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">ثبت مقاله جدید</h2>
                    <button onClick={() => navigate('/admin')} className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors text-sm border border-gray-200 cursor-pointer">بازگشت به پنل</button>
                </div>
                <InputTag label='عنوان مقاله *' name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <InputTag label='نام نویسنده' name="author" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
                <TextArea label='خلاصه مقاله (Excerpt)' name="excerpt" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} />
                <TextArea label='متن مقاله *' name="content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} />
                <ImageInput label='تصویر شاخص (فشرده‌سازی خودکار)' onChange={(base64) => setFormData({...formData, image: base64})} />
                <button onClick={handleAddPost} disabled={loading} className={`text-white p-4 rounded-xl mt-8 w-full font-bold transition-colors shadow-md ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'}`}>
                    {loading ? 'در حال ثبت...' : 'ثبت مقاله'}
                </button>
            </div>
        </div>
    );
}

function AllPosts() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editFormData, setEditFormData] = useState({ title: '', excerpt: '', content: '', author: '', image: '' });

    const fetchPosts = () => setPosts(JSON.parse(localStorage.getItem('posts')) || []);
    useEffect(() => { fetchPosts(); }, []);

    const handleDelete = (id, title) => {
        if (!window.confirm(`آیا از حذف مقاله "${title}" اطمینان دارید؟`)) return;
        const updated = posts.filter(p => p.id !== id);
        localStorage.setItem('posts', JSON.stringify(updated));
        fetchPosts();
    };

    const handleEditClick = (post) => {
        setEditingPostId(post.id);
        setEditFormData({ title: post.title || '', excerpt: post.excerpt || '', content: post.content || '', author: post.author || '', image: post.image || '' });
    };

    const handleUpdateSubmit = () => {
        try {
            const updated = posts.map(p => p.id === editingPostId ? { ...p, ...editFormData } : p);
            localStorage.setItem('posts', JSON.stringify(updated));
            setEditingPostId(null);
            fetchPosts();
        } catch (e) {
            alert("خطا در بروزرسانی! حجم تصویر بسیار زیاد است.");
        }
    };

    return (
        <div className='p-6 md:p-10 rtl min-h-screen bg-gray-50 overflow-x-hidden'>
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-200 pb-4 gap-4">
                    <h2 className='text-3xl font-bold text-gray-800'>لیست تمام مقالات</h2>
                    <button onClick={() => navigate('/admin')} className="bg-white text-gray-700 px-5 py-2.5 rounded-lg font-bold hover:bg-gray-50 border border-gray-300 shadow-sm cursor-pointer">بازگشت به پنل</button>
                </div>
                <div className="grid gap-6">
                    {posts.length > 0 ? posts.map(post => (
                        <div key={post.id} className='border border-gray-200 p-6 rounded-2xl shadow-sm bg-white transition-all hover:shadow-md max-w-full'>
                            {editingPostId === post.id ? (
                                <div className="flex flex-col gap-4">
                                    <h3 className="font-bold text-xl text-[#4038C9] mb-4 border-b pb-2">ویرایش مقاله</h3>
                                    <InputTag label='عنوان مقاله *' value={editFormData.title} onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} />
                                    <InputTag label='نام نویسنده' value={editFormData.author} onChange={(e) => setEditFormData({...editFormData, author: e.target.value})} />
                                    <TextArea label='خلاصه مقاله' value={editFormData.excerpt} onChange={(e) => setEditFormData({...editFormData, excerpt: e.target.value})} />
                                    <TextArea label='متن مقاله *' value={editFormData.content} onChange={(e) => setEditFormData({...editFormData, content: e.target.value})} />
                                    <ImageInput label='بروزرسانی تصویر شاخص' image={editFormData.image} onChange={(base64) => setEditFormData({...editFormData, image: base64})} />
                                    <div className="flex gap-4 mt-6">
                                        <button onClick={handleUpdateSubmit} className="flex-1 text-white p-3 rounded-xl font-bold bg-green-600 hover:bg-green-700 shadow-sm cursor-pointer">ذخیره تغییرات</button>
                                        <button onClick={() => setEditingPostId(null)} className='flex-1 bg-gray-100 text-gray-700 p-3 rounded-xl font-bold hover:bg-gray-200 border border-gray-300 cursor-pointer'>لغو</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row gap-6 w-full">
                                    <div className="w-full md:w-56 h-40 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200 shadow-inner">
                                        {post.image ? <img src={post.image} alt={post.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">بدون تصویر</div>}
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between min-w-0 py-1">
                                        <div>
                                            <h3 className='font-bold text-xl text-gray-900 mb-2 truncate'>{post.title}</h3>
                                            <p className='text-gray-600 text-sm mb-2'>نویسنده: {post.author || 'ثبت نشده'}</p>
                                            <p className='text-gray-500 text-xs' dir="ltr">{new Date(post.created_at).toLocaleDateString('fa-IR')}</p>
                                        </div>
                                        <div className="flex gap-3 mt-4 justify-end border-t border-gray-100 pt-4">
                                            <button onClick={() => handleEditClick(post)} className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 px-6 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer">ویرایش</button>
                                            <button onClick={() => handleDelete(post.id, post.title)} className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 px-6 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer">حذف مقاله</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )) : <div className="text-center py-24 bg-white rounded-2xl border border-gray-200 shadow-sm"><p className="text-gray-500 text-lg font-bold">پستی برای نمایش وجود ندارد.</p></div>}
                </div>
            </div>
        </div>
    );
}

function AdminComments() {
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);

    const fetchComments = () => setComments(JSON.parse(localStorage.getItem('comments')) || []);
    useEffect(() => { fetchComments(); }, []);

    const handleUpdateComment = (id, newStatus, currentReply) => {
        const updated = comments.map(c => c.id === id ? { ...c, status: newStatus, reply: currentReply } : c);
        localStorage.setItem('comments', JSON.stringify(updated));
        alert("وضعیت پرسش با موفقیت بروزرسانی شد.");
        fetchComments();
    };

    const handleReplyChange = (id, text) => setComments(comments.map(c => c.id === id ? { ...c, reply: text } : c));

    return (
        <div className='p-6 md:p-10 rtl bg-gray-50 min-h-screen'>
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-200 pb-4 gap-4">
                    <h1 className='text-3xl font-bold text-gray-800'>مدیریت پرسش‌های حقوقی</h1>
                    <button onClick={() => navigate('/admin')} className="bg-white text-gray-700 px-5 py-2.5 rounded-lg font-bold hover:bg-gray-50 border border-gray-300 shadow-sm cursor-pointer">بازگشت به پنل</button>
                </div>
                {comments.length === 0 ? <p className="text-gray-500 bg-white py-24 rounded-2xl border text-center text-lg font-bold shadow-sm">نظری برای بررسی وجود ندارد.</p> : (
                    <div className="flex flex-col gap-6">
                        {comments.map((comment) => (
                            <div key={comment.id} className={`bg-white p-6 rounded-2xl shadow-sm border flex flex-col gap-4 ${comment.status === 'pending' ? 'border-amber-300 border-r-4' : 'border-gray-200'}`}>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 gap-3">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">فرستنده: {comment.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">از مقاله: <span className="font-semibold text-gray-700">{comment.post_title}</span></p>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${comment.status === 'approved' ? 'bg-green-100 text-green-700 border border-green-200' : comment.status === 'declined' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                                        {comment.status === 'approved' ? 'تایید و منتشر شده' : comment.status === 'declined' ? 'رد شده (مخفی)' : 'در انتظار تایید'}
                                    </span>
                                </div>
                                <p className="text-gray-800 text-base md:text-lg whitespace-pre-wrap leading-relaxed">{comment.content}</p>
                                <div className="mt-4 bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
                                    <label className="block font-bold text-sm text-indigo-900 mb-3">پاسخ شما (به عنوان وکیل):</label>
                                    <textarea rows="3" value={comment.reply || ''} onChange={(e) => handleReplyChange(comment.id, e.target.value)} className="w-full p-4 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm leading-loose shadow-inner bg-white" placeholder="پاسخ تخصصی خود را اینجا بنویسید..." />
                                </div>
                                <div className="flex gap-3 justify-end mt-2">
                                    {comment.status !== 'approved' && <button onClick={() => handleUpdateComment(comment.id, 'approved', comment.reply)} className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-green-700 shadow-sm cursor-pointer transition-colors">تایید و انتشار</button>}
                                    {comment.status !== 'declined' && <button onClick={() => handleUpdateComment(comment.id, 'declined', comment.reply)} className="bg-red-50 text-red-600 border border-red-200 px-6 py-2.5 rounded-lg font-bold hover:bg-red-100 transition-colors cursor-pointer">رد کردن</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function AdminMessages() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages(JSON.parse(localStorage.getItem('messages')) || []);
    }, []);

    const toggleRead = (id, currentStatus) => {
        const updated = messages.map(m => m.id === id ? { ...m, is_read: !currentStatus } : m);
        setMessages(updated);
        localStorage.setItem('messages', JSON.stringify(updated));
    };

    const handleDelete = (id) => {
        if(!window.confirm("آیا از حذف این پیام اطمینان دارید؟")) return;
        const updated = messages.filter(m => m.id !== id);
        setMessages(updated);
        localStorage.setItem('messages', JSON.stringify(updated));
    };

    return (
        <div className="p-6 md:p-10 rtl min-h-[60vh] bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-200 pb-4 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">پیام‌های دریافتی (فرم تماس)</h1>
                    <button onClick={() => navigate('/admin')} className="bg-white text-gray-700 px-5 py-2.5 rounded-lg font-bold border border-gray-300 shadow-sm cursor-pointer hover:bg-gray-50">بازگشت به پنل</button>
                </div>
                {messages.length === 0 ? <div className="bg-white py-24 rounded-2xl shadow-sm text-center text-gray-500 font-bold text-lg border border-gray-200">صندوق پیام‌های شما خالی است.</div> : (
                    <div className="grid gap-6">
                        {messages.map(msg => (
                            <div key={msg.id} className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm border transition-all ${msg.is_read ? 'border-gray-200 opacity-80' : 'border-[#4038C9] border-r-4 shadow-md'}`}>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{msg.subject || 'بدون موضوع'}</h3>
                                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 font-medium">
                                            <span>ارسال کننده: <span className="text-gray-800">{msg.name}</span></span>
                                            <span>|</span>
                                            <span>شماره تماس: <span className="text-gray-800" dir="ltr">{msg.phone || 'ندارد'}</span></span>
                                            <span>|</span>
                                            <span>ایمیل: <span className="text-gray-800 font-sans">{msg.email}</span></span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <button onClick={() => toggleRead(msg.id, msg.is_read)} className={`flex-1 md:flex-none px-4 py-2 text-sm font-bold rounded-lg transition-colors cursor-pointer ${msg.is_read ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'}`}>
                                            {msg.is_read ? 'علامت به عنوان نخوانده' : 'علامت خوانده شده'}
                                        </button>
                                        <button onClick={() => handleDelete(msg.id)} className="px-4 py-2 text-sm font-bold bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">حذف</button>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-5 rounded-xl text-gray-800 whitespace-pre-wrap leading-relaxed border border-gray-100 shadow-inner">{msg.content}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function AdminSettings() {
    const navigate = useNavigate();
    const [lawyerProfile, setLawyerProfile] = useState({ name: '', headerBio: '', bio: '', image: '' });
    const [services, setServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [newService, setNewService] = useState({ title: '', desc: '', icon: 'Balance' });
    const [newTestimonial, setNewTestimonial] = useState({ name: '', text: '', position: 'موکل', image: '' });

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('settings')) || {};
        setLawyerProfile({ name: data.lawyer_name || '', headerBio: data.header_bio || '', bio: data.lawyer_bio || '', image: data.lawyer_image || '' });

        try {
            setServices(Array.isArray(data.services_json) ? data.services_json : JSON.parse(data.services_json || '[]'));
            setTestimonials(Array.isArray(data.testimonials_json) ? data.testimonials_json : JSON.parse(data.testimonials_json || '[]'));
        } catch (e) {
            console.error("Parse error on load settings", e);
        }
    }, []);

    const handleSaveAll = () => {
        try {
            const currentSettings = JSON.parse(localStorage.getItem('settings')) || {};
            const payload = {
                ...currentSettings,
                lawyer_name: lawyerProfile.name,
                author_name: lawyerProfile.name,
                header_bio: lawyerProfile.headerBio,
                lawyer_bio: lawyerProfile.bio,
                lawyer_image: lawyerProfile.image,
                author_image: lawyerProfile.image,
                services_json: JSON.stringify(services),
                testimonials_json: JSON.stringify(testimonials)
            };
            localStorage.setItem('settings', JSON.stringify(payload));
            alert("تنظیمات با موفقیت در دیتابیس دمو ذخیره شد.");
        } catch (e) {
            alert("خطا در ذخیره‌سازی! حجم تصاویر بسیار بالاست. لطفا تصاویر را کوچکتر کنید.");
        }
    };

    const addService = () => {
        if (!newService.title.trim() || !newService.desc.trim()) return alert("عنوان و توضیحات الزامی است.");
        setServices([...services, newService]);
        setNewService({ title: '', desc: '', icon: 'Balance' });
    };
    const removeService = (index) => setServices(services.filter((_, i) => i !== index));

    const addTestimonial = () => {
        if (!newTestimonial.name.trim() || !newTestimonial.text.trim()) return alert("نام و متن نظر الزامی است.");
        setTestimonials([...testimonials, newTestimonial]);
        setNewTestimonial({ name: '', text: '', position: 'موکل', image: '' });
    };
    const removeTestimonial = (index) => setTestimonials(testimonials.filter((_, i) => i !== index));

    return (
        <div className='p-6 md:p-10 rtl bg-gray-50 min-h-screen'>
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-200 pb-6 gap-4">
                    <h1 className='text-3xl font-bold text-gray-800'>تنظیمات کلان وب‌سایت</h1>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <button onClick={handleSaveAll} className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg font-bold text-white shadow-md bg-green-600 hover:bg-green-700 transition-colors cursor-pointer">ذخیره تنظیمات</button>
                        <button onClick={() => navigate('/admin')} className="flex-1 sm:flex-none bg-white text-gray-700 px-5 py-2.5 rounded-lg font-bold hover:bg-gray-50 border border-gray-300 shadow-sm transition-colors cursor-pointer">بازگشت</button>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Lawyer Profile */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-[#4038C9] mb-6 border-b border-gray-100 pb-4">پروفایل اصلی شخص / موسسه</h2>
                        <InputTag label='نام وکیل / تیم حقوقی' value={lawyerProfile.name} onChange={(e) => setLawyerProfile({...lawyerProfile, name: e.target.value})} />
                        <TextArea label='متن معرفی کوتاه (نمایش در هدر اصلی)' rows="3" value={lawyerProfile.headerBio} onChange={(e) => setLawyerProfile({...lawyerProfile, headerBio: e.target.value})} />
                        <TextArea label='متن کامل معرفی (بخش درباره من)' rows="6" value={lawyerProfile.bio} onChange={(e) => setLawyerProfile({...lawyerProfile, bio: e.target.value})} />
                        <div className="mt-4 border-t border-gray-100 pt-6">
                            <ImageInput label='تصویر پروفایل اصلی (فشرده‌سازی خودکار)' image={lawyerProfile.image} onChange={(base64) => setLawyerProfile({...lawyerProfile, image: base64})} />
                        </div>
                    </div>

                    {/* Services */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-[#4038C9] mb-6 border-b border-gray-100 pb-4">مدیریت حوزه‌های تخصصی (خدمات)</h2>
                        <div className="grid gap-4 mb-8">
                            {services.map((srv, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-5 rounded-xl border border-gray-200 gap-4">
                                    <div className="flex items-start sm:items-center gap-4 w-full">
                                        <div className="text-[#4038C9] bg-white p-2 rounded-lg shadow-sm hidden sm:block"><BalanceIcon /></div>
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-gray-900 mb-1">{srv.title}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2">{srv.desc}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => removeService(idx)} className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-bold border border-red-100 transition-colors cursor-pointer flex-shrink-0 w-full sm:w-auto">حذف این خدمت</button>
                                </div>
                            ))}
                            {services.length === 0 && <p className="text-gray-400 text-sm py-4 text-center">هنوز خدمتی ثبت نشده است.</p>}
                        </div>

                        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 flex flex-col gap-4">
                            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><span className="text-xl">+</span> افزودن خدمت جدید</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" placeholder="عنوان خدمت (مثال: دعاوی ملکی)" value={newService.title} onChange={(e) => setNewService({...newService, title: e.target.value})} className="p-3.5 rounded-lg border border-blue-200 w-full focus:ring-2 focus:ring-blue-400 outline-none" />
                                <select value={newService.icon} onChange={(e) => setNewService({...newService, icon: e.target.value})} className="p-3.5 rounded-lg border border-blue-200 w-full focus:ring-2 focus:ring-blue-400 outline-none bg-white">
                                    {Object.keys(AVAILABLE_ICONS).map(key => <option key={key} value={key}>{key}</option>)}
                                </select>
                            </div>
                            <textarea placeholder="توضیحات کوتاه این خدمت..." value={newService.desc} onChange={(e) => setNewService({...newService, desc: e.target.value})} className="p-3.5 rounded-lg border border-blue-200 w-full resize-y focus:ring-2 focus:ring-blue-400 outline-none" rows="2" />
                            <div className="flex justify-end">
                                <button onClick={addService} className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-lg font-bold shadow-sm transition-colors cursor-pointer">ذخیره موقت خدمت</button>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-[#4038C9] mb-6 border-b border-gray-100 pb-4">مدیریت نظرات موکلین موفق</h2>
                        <div className="grid gap-4 mb-8">
                            {testimonials.map((t, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-5 rounded-xl border border-gray-200 gap-4">
                                    <div className="flex items-center gap-4 w-full">
                                        {t.image && t.image.length > 50 ? (
                                            <img src={t.image} alt="" className="w-12 h-12 rounded-full object-cover shadow-sm hidden sm:block" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 hidden sm:flex">{t.name.charAt(0)}</div>
                                        )}
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-gray-900">{t.name} <span className="text-xs font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full mr-2">{t.position}</span></h3>
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">"{t.text}"</p>
                                        </div>
                                    </div>
                                    <button onClick={() => removeTestimonial(idx)} className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-bold border border-red-100 transition-colors cursor-pointer flex-shrink-0 w-full sm:w-auto">حذف نظر</button>
                                </div>
                            ))}
                            {testimonials.length === 0 && <p className="text-gray-400 text-sm py-4 text-center">نظری برای نمایش وجود ندارد.</p>}
                        </div>

                        <div className="bg-green-50/50 p-6 rounded-xl border border-green-100 flex flex-col gap-4">
                            <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2"><span className="text-xl">+</span> ثبت نظر موکل جدید</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="نام و نام خانوادگی موکل" value={newTestimonial.name} onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})} className="p-3.5 rounded-lg border border-green-200 w-full focus:ring-2 focus:ring-green-400 outline-none" />
                                <input type="text" placeholder="عنوان موکل (مثال: موکل پرونده کیفری)" value={newTestimonial.position} onChange={(e) => setNewTestimonial({...newTestimonial, position: e.target.value})} className="p-3.5 rounded-lg border border-green-200 w-full focus:ring-2 focus:ring-green-400 outline-none" />
                            </div>
                            <textarea placeholder="متن کامل نظر موکل..." value={newTestimonial.text} onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})} className="p-3.5 rounded-lg border border-green-200 w-full resize-y focus:ring-2 focus:ring-green-400 outline-none" rows="3" />

                            <div className="border border-green-200 bg-white p-4 rounded-lg">
                                <ImageInput label='آواتار موکل (اختیاری)' image={newTestimonial.image} onChange={(base64) => setNewTestimonial({...newTestimonial, image: base64})} />
                            </div>

                            <div className="flex justify-end mt-2">
                                <button onClick={addTestimonial} className="bg-green-600 hover:bg-green-700 text-white py-2.5 px-6 rounded-lg font-bold shadow-sm transition-colors cursor-pointer">افزودن به لیست نظرات</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- MAIN ROUTING SYSTEM ---

export default function AdminSystem() {
    const token = localStorage.getItem("token");
    const location = useLocation();

    // Secure React-Router AuthGuard replacing the hash checks
    if (!token && location.pathname !== '/admin/login') {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <Routes>
            <Route path="/" element={<AdminPanel />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/new-post" element={<NewPost />} />
            <Route path="/all-posts" element={<AllPosts />} />
            <Route path="/comments" element={<AdminComments />} />
            <Route path="/messages" element={<AdminMessages />} />
            <Route path="/settings" element={<AdminSettings />} />
        </Routes>
    );
}