// src/Admin.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

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

    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    function handleChange(e) {
        const file = e.target.files[0];
        async function handleImageUpload() {
            try {
                const b64 = await toBase64(file)
                setBase64Image(b64)
                if (props.onChange) props.onChange(b64);
            } catch (error) { alert(error) }
        }
        handleImageUpload()
    }

    return (
        <div className='rtl flex flex-row items-start gap-4'>
            <div className='w-full md:w-[50%]'>
                <h3 className='font-medium mb-2'>{props.label}</h3>
                <input ref={inputRef} onChange={handleChange} className='hidden' type='file' />
                <button disabled={base64Image} className={`border rounded py-2 px-6 ${base64Image ? 'border-gray-300 text-gray-300 cursor-not-allowed' : ''}`} onClick={(e) => { e.preventDefault(); inputRef.current.click(); }}>
                    بارگذاری تصویر جدید
                </button>
            </div>
            { (base64Image || props.image) && <img className='rounded-md w-full md:w-[50%] object-cover h-32' src={base64Image || props.image} alt="Preview" /> }
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
            navigate("/admin");
        } else {
            alert("نام کاربری یا رمز عبور اشتباه است! (راهنما: admin / admin)");
        }
    };

    return (
        <div className='bg-gray-50 w-screen h-screen flex rtl'>
            <div className='w-[45%] bg-white shadow-md rounded-lg mx-auto my-auto h-fit p-6'>
                <InputTag placeholder='نام کاربری (admin)' label='نام کاربری' onChange={(e) => setUser(e.target.value)} />
                <InputTag placeholder='رمز عبور (admin)' label='رمز عبور' type="password" onChange={(e) => setPass(e.target.value)} />
                <button onClick={handleLogin} className='text-white bg-indigo-600 py-2 px-4 rounded-md mt-4'>ورود</button>
            </div>
        </div>
    )
}

function AdminPanel() {
    const navigate = useNavigate();
    return (
        <div className='p-10 rtl min-h-[60vh] bg-gray-50'>
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <h1 className='text-3xl font-bold text-gray-800'>پنل مدیریت</h1>
                    <button onClick={() => { localStorage.removeItem('token'); navigate('/admin/login'); }} className="text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded">خروج</button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
                    <button onClick={() => navigate('/admin/new-post')} className='bg-blue-600 hover:bg-blue-700 text-white font-bold p-6 rounded-xl transition-colors shadow-sm text-lg'>ثبت پست جدید</button>
                    <button onClick={() => navigate('/admin/all-posts')} className='bg-green-600 hover:bg-green-700 text-white font-bold p-6 rounded-xl transition-colors shadow-sm text-lg'>مشاهده همه پست‌ها</button>
                    <button onClick={() => navigate('/admin/comments')} className='bg-purple-600 hover:bg-purple-700 text-white font-bold p-6 rounded-xl transition-colors shadow-sm text-lg'>مدیریت پرسش‌ها</button>
                    <button onClick={() => navigate('/admin/messages')} className='bg-amber-600 hover:bg-amber-700 text-white font-bold p-6 rounded-xl transition-colors shadow-sm text-lg'>پیام‌های تماس</button>
                    <button onClick={() => navigate('/admin/settings')} className='bg-gray-800 hover:bg-gray-900 text-white font-bold p-6 rounded-xl transition-colors shadow-sm text-lg'>تنظیمات سایت</button>
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
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const newPost = { ...formData, id: Date.now(), created_at: new Date().toISOString() };
            localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
            alert("مقاله با موفقیت در دیتابیس ذخیره شد!");
            setFormData({ title: '', excerpt: '', content: '', author: '', image: '' });
            setLoading(false);
        }, 500);
    };

    return (
        <div className='bg-gray-50 min-h-screen p-20 rtl'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-8 mx-auto w-full md:w-[60%] flex flex-col gap-4'>
                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">ثبت مقاله جدید</h2>
                    <button onClick={() => navigate('/admin')} className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors text-sm border border-gray-200">بازگشت به پنل</button>
                </div>
                <InputTag label='عنوان مقاله *' name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                <InputTag label='نام نویسنده' name="author" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} />
                <TextArea label='خلاصه مقاله (Excerpt)' name="excerpt" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} />
                <TextArea label='متن مقاله *' name="content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} />
                <ImageInput label='تصویر شاخص' onChange={(base64) => setFormData({...formData, image: base64})} />
                <button onClick={handleAddPost} disabled={loading} className={`text-white p-4 rounded-lg mt-6 w-full font-bold transition-colors ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                    {loading ? 'در حال ثبت...' : 'ثبت در دیتابیس'}
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
        const updated = posts.map(p => p.id === editingPostId ? { ...p, ...editFormData } : p);
        localStorage.setItem('posts', JSON.stringify(updated));
        setEditingPostId(null);
        fetchPosts();
    };

    return (
        <div className='p-10 rtl min-h-screen bg-gray-50 overflow-x-hidden'>
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                    <h2 className='text-3xl font-bold text-gray-800'>لیست تمام پست‌ها</h2>
                    <button onClick={() => navigate('/admin')} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-bold hover:bg-gray-300 border border-gray-300">بازگشت به پنل</button>
                </div>
                <div className="grid gap-6">
                    {posts.length > 0 ? posts.map(post => (
                        <div key={post.id} className='border border-gray-200 p-6 rounded-xl shadow-sm bg-white transition-all hover:shadow-md max-w-full'>
                            {editingPostId === post.id ? (
                                <div className="flex flex-col gap-4">
                                    <h3 className="font-bold text-xl text-[#4038C9] mb-4 border-b pb-2">ویرایش مقاله</h3>
                                    <InputTag label='عنوان مقاله *' value={editFormData.title} onChange={(e) => setEditFormData({...editFormData, title: e.target.value})} />
                                    <InputTag label='نام نویسنده' value={editFormData.author} onChange={(e) => setEditFormData({...editFormData, author: e.target.value})} />
                                    <TextArea label='خلاصه مقاله (Excerpt)' value={editFormData.excerpt} onChange={(e) => setEditFormData({...editFormData, excerpt: e.target.value})} />
                                    <TextArea label='متن مقاله *' value={editFormData.content} onChange={(e) => setEditFormData({...editFormData, content: e.target.value})} />
                                    <ImageInput label='بروزرسانی تصویر شاخص' image={editFormData.image} onChange={(base64) => setEditFormData({...editFormData, image: base64})} />
                                    <div className="flex gap-4 mt-4">
                                        <button onClick={handleUpdateSubmit} className="flex-1 text-white p-3 rounded-lg font-bold bg-green-600 hover:bg-green-700">ذخیره تغییرات</button>
                                        <button onClick={() => setEditingPostId(null)} className='flex-1 bg-gray-200 text-gray-700 p-3 rounded-lg font-bold hover:bg-gray-300'>لغو</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row gap-6 w-full">
                                    <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                        {post.image ? <img src={post.image} alt={post.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">بدون تصویر</div>}
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between min-w-0">
                                        <div>
                                            <h3 className='font-bold text-xl text-gray-900 mb-2 truncate'>{post.title}</h3>
                                            <p className='text-gray-600 text-sm mb-2'>نویسنده: {post.author || 'ثبت نشده'}</p>
                                        </div>
                                        <div className="flex gap-3 mt-4 justify-end border-t pt-4">
                                            <button onClick={() => handleEditClick(post)} className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 px-6 py-2 rounded-lg font-bold text-sm">ویرایش</button>
                                            <button onClick={() => handleDelete(post.id, post.title)} className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 px-6 py-2 rounded-lg font-bold text-sm">حذف مقاله</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )) : <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm"><p className="text-gray-500 text-lg font-bold">پستی برای نمایش وجود ندارد.</p></div>}
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
        alert("وضعیت نظر با موفقیت بروزرسانی شد.");
        fetchComments();
    };

    const handleReplyChange = (id, text) => setComments(comments.map(c => c.id === id ? { ...c, reply: text } : c));

    return (
        <div className='p-10 rtl bg-gray-50 min-h-screen'>
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                    <h1 className='text-3xl font-bold text-gray-800'>مدیریت پرسش‌ها و نظرات</h1>
                    <button onClick={() => navigate('/admin')} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-bold hover:bg-gray-300 border border-gray-300">بازگشت به پنل</button>
                </div>
                {comments.length === 0 ? <p className="text-gray-500 bg-white p-8 rounded-xl border text-center font-bold shadow-sm">نظری برای بررسی وجود ندارد.</p> : (
                    <div className="flex flex-col gap-6">
                        {comments.map((comment) => (
                            <div key={comment.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4">
                                <div className="flex justify-between items-start border-b pb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">فرستنده: {comment.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">مقاله: {comment.post_title}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${comment.status === 'approved' ? 'bg-green-100 text-green-700' : comment.status === 'declined' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {comment.status === 'approved' ? 'تایید شده' : comment.status === 'declined' ? 'رد شده' : 'در انتظار تایید'}
                                    </span>
                                </div>
                                <p className="text-gray-800 text-lg whitespace-pre-wrap">{comment.content}</p>
                                <div className="mt-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <label className="block font-bold text-sm text-gray-700 mb-2">پاسخ شما (به عنوان وکیل):</label>
                                    <textarea rows="3" value={comment.reply || ''} onChange={(e) => handleReplyChange(comment.id, e.target.value)} className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-500 outline-none" placeholder="پاسخ حقوقی خود را اینجا بنویسید..." />
                                </div>
                                <div className="flex gap-3 justify-end mt-2">
                                    {comment.status !== 'approved' && <button onClick={() => handleUpdateComment(comment.id, 'approved', comment.reply)} className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700">تایید و انتشار</button>}
                                    {comment.status !== 'declined' && <button onClick={() => handleUpdateComment(comment.id, 'declined', comment.reply)} className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700">رد کردن (عدم نمایش)</button>}
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

    // Fallback static messages if none exist (since local ContactForm won't truly submit)
    useEffect(() => { setMessages(JSON.parse(localStorage.getItem('messages')) || [{id: 1, name: 'علی', email: 'test@test.com', subject: 'تست سیستم', content: 'این یک پیام آزمایشی برای حالت استاتیک است.', created_at: new Date().toISOString(), is_read: false}]); }, []);

    const toggleRead = (id, currentStatus) => setMessages(messages.map(m => m.id === id ? { ...m, is_read: !currentStatus } : m));
    const handleDelete = (id) => setMessages(messages.filter(m => m.id !== id));

    return (
        <div className="p-10 rtl min-h-[60vh] bg-gray-50">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">پیام‌های دریافتی</h1>
                    <button onClick={() => navigate('/admin')} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-bold border border-gray-300">بازگشت به پنل</button>
                </div>
                {messages.length === 0 ? <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">پیامی یافت نشد.</div> : (
                    <div className="grid gap-6">
                        {messages.map(msg => (
                            <div key={msg.id} className={`bg-white p-6 rounded-xl shadow-sm border transition-colors ${msg.is_read ? 'border-gray-200' : 'border-blue-400 border-r-4'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-1">{msg.subject || 'بدون موضوع'}</h3>
                                        <p className="text-sm text-gray-500">ارسال شده توسط: {msg.name} | {new Date(msg.created_at).toLocaleDateString('fa-IR')}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => toggleRead(msg.id, msg.is_read)} className="px-3 py-1 text-sm rounded bg-gray-100 text-gray-600 hover:bg-gray-200">تغییر وضعیت خوانده شده</button>
                                        <button onClick={() => handleDelete(msg.id)} className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded">حذف</button>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg mb-4 text-gray-700 whitespace-pre-wrap leading-relaxed">{msg.content}</div>
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
    const [newTestimonial, setNewTestimonial] = useState({ name: '', text: '', avatar: 'male', image: '' });

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('settings')) || {};
        setLawyerProfile({ name: data.lawyer_name || '', headerBio: data.header_bio || '', bio: data.lawyer_bio || '', image: data.lawyer_image || '' });
        setServices(JSON.parse(data.services_json || '[]'));
        setTestimonials(JSON.parse(data.testimonials_json || '[]'));
    }, []);

    const handleSaveAll = () => {
        const currentSettings = JSON.parse(localStorage.getItem('settings')) || {};
        const payload = { ...currentSettings, lawyer_name: lawyerProfile.name, header_bio: lawyerProfile.headerBio, lawyer_bio: lawyerProfile.bio, lawyer_image: lawyerProfile.image, services_json: JSON.stringify(services), testimonials_json: JSON.stringify(testimonials) };
        localStorage.setItem('settings', JSON.stringify(payload));
        alert("تنظیمات با موفقیت در مرورگر ذخیره شد.");
    };

    const addService = () => {
        if (!newService.title.trim() || !newService.desc.trim()) return;
        setServices([...services, newService]);
        setNewService({ title: '', desc: '', icon: 'Balance' });
    };
    const removeService = (index) => setServices(services.filter((_, i) => i !== index));

    const addTestimonial = () => {
        if (!newTestimonial.name.trim() || !newTestimonial.text.trim()) return;
        setTestimonials([...testimonials, newTestimonial]);
        setNewTestimonial({ name: '', text: '', avatar: 'male', image: '' });
    };
    const removeTestimonial = (index) => setTestimonials(testimonials.filter((_, i) => i !== index));

    return (
        <div className='p-10 rtl bg-gray-50 min-h-screen'>
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                    <h1 className='text-3xl font-bold text-gray-800'>تنظیمات کلان وب‌سایت</h1>
                    <div className="flex gap-3">
                        <button onClick={handleSaveAll} className="px-6 py-2 rounded-lg font-bold text-white shadow-sm bg-green-600 hover:bg-green-700">ذخیره کل تنظیمات</button>
                        <button onClick={() => navigate('/admin')} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-bold hover:bg-gray-300 border border-gray-300">بازگشت</button>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {/* Lawyer Profile */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-[#4038C9] mb-6 border-b pb-2">پروفایل اصلی</h2>
                        <InputTag label='نام وکیل / تیم حقوقی' value={lawyerProfile.name} onChange={(e) => setLawyerProfile({...lawyerProfile, name: e.target.value})} />
                        <TextArea label='متن معرفی کوتاه هدر' value={lawyerProfile.headerBio} onChange={(e) => setLawyerProfile({...lawyerProfile, headerBio: e.target.value})} />
                        <TextArea label='متن کامل معرفی (درباره من)' value={lawyerProfile.bio} onChange={(e) => setLawyerProfile({...lawyerProfile, bio: e.target.value})} />
                    </div>

                    {/* Services */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-[#4038C9] mb-6 border-b pb-2">خدمات حقوقی</h2>
                        <div className="grid gap-3 mb-6">
                            {services.map((srv, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <div className="text-[#4038C9]"><BalanceIcon /></div>
                                        <div><h3 className="font-bold text-gray-800">{srv.title}</h3></div>
                                    </div>
                                    <button onClick={() => removeService(idx)} className="text-red-500 font-bold px-3">حذف</button>
                                </div>
                            ))}
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 flex flex-col gap-3">
                            <h4 className="font-bold text-blue-800 mb-2">افزودن خدمت جدید</h4>
                            <input type="text" placeholder="عنوان خدمت" value={newService.title} onChange={(e) => setNewService({...newService, title: e.target.value})} className="p-3 rounded border w-full" />
                            <textarea placeholder="توضیحات خدمت..." value={newService.desc} onChange={(e) => setNewService({...newService, desc: e.target.value})} className="p-3 rounded border w-full" rows="2" />
                            <button onClick={addService} className="bg-blue-600 text-white py-2 px-4 rounded font-bold w-fit mt-4">اضافه کردن</button>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-[#4038C9] mb-6 border-b pb-2">نظرات موکلین</h2>
                        <div className="grid gap-3 mb-6">
                            {testimonials.map((t, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div><h3 className="font-bold text-gray-800">{t.name}</h3><p className="text-sm">"{t.text}"</p></div>
                                    <button onClick={() => removeTestimonial(idx)} className="text-red-500 font-bold px-3">حذف</button>
                                </div>
                            ))}
                        </div>
                        <div className="bg-green-50 p-6 rounded-lg border border-green-100 flex flex-col gap-3">
                            <h4 className="font-bold text-green-800 mb-2">افزودن نظر جدید</h4>
                            <input type="text" placeholder="نام موکل" value={newTestimonial.name} onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})} className="p-3 rounded border w-2/3" />
                            <textarea placeholder="متن نظر..." value={newTestimonial.text} onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})} className="p-3 rounded border w-full" rows="2" />
                            <button onClick={addTestimonial} className="bg-green-600 text-white py-2 px-4 rounded font-bold w-fit mt-2">اضافه کردن</button>
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

    // Static AuthGuard integrated here
    if (!token && window.location.hash.indexOf('/admin/login') === -1) {
        return <AdminLogin />;
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