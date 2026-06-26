import React, { useState, useEffect } from 'react';

// Assets
import courtStuff from './assets/courtStuff.png';
import emblem from './assets/classic.png';
import lawyerHand from './assets/lawyerHand.png';
import medalIcon from './assets/medal.png';
import caseIcon from './assets/caseIcon.png';
import bookIcon from './assets/bookIcon.png';
import fallbackPic from './assets/person1.jpg';

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
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';

function TwoElementCard(props) {
    return (
        <div className='bg-gray-50 p-4 rounded-lg flex flex-col items-center space-y-3 font-bold hover:scale-[101%] hover:shadow-sm transition'>
            <img className='w-10' src={props.icon} alt={props.text} />
            <h3 className="text-gray-800 text-center">{props.text}</h3>
        </div>
    )
}

function ThreeElementCard(props) {
    return (
        <div className='bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition h-full flex flex-col'>
            <div className='bg-[#DEE7FF] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0'>
                {props.children}
            </div>
            <div className='flex flex-col items-start text-right mt-4 flex-grow'>
                <h3 className='font-bold text-xl mb-2 text-gray-900'>{props.title}</h3>
                <p className='text-gray-600 rtl leading-relaxed'>{props.description}</p>
            </div>
        </div>
    )
}

function FourElementCard(props) {
    return (
        <div className='w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 relative' dir="rtl">
            <div className='flex-shrink-0 relative'>
                <div className="absolute inset-0 rounded-full border-4 border-[#FFCA0C] opacity-30 scale-110 transition-transform duration-500 hover:scale-125"></div>
                <div className='rounded-full w-32 h-32 md:w-44 md:h-44 bg-white shadow-xl relative z-10 p-1.5'>
                    <img className='rounded-full w-full h-full object-cover' src={props.picture} alt={props.name} />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#3C3A86] rounded-full p-2.5 shadow-lg z-20">
                    <FormatQuoteRoundedIcon style={{color: "white", fontSize: 28}} />
                </div>
            </div>
            <div className='flex flex-col items-center md:items-start text-center md:text-right w-full'>
                <p className='text-gray-700 text-lg md:text-2xl leading-loose font-medium mb-8 italic'>"{props.comment}"</p>
                <div>
                    <h2 className='text-2xl font-black text-gray-900 mb-2'>{props.name}</h2>
                    <h3 className='text-[#3C3A86] font-bold text-lg'>{props.position}</h3>
                </div>
            </div>
        </div>
    );
}

const ContactInfoData = [
    <div className='flex flex-row items-center gap-4 w-full'>
        <div className='rounded-full w-12 h-12 flex-shrink-0 bg-white/10 flex items-center justify-center'><LocationOnOutlinedIcon style={{color: '#FFCA0C'}} fontSize="medium" /></div>
        <div className='flex flex-col items-start text-right'><h3 className='text-lg font-bold text-white mb-1'>محل سکونت</h3><p className='text-gray-200 text-sm'>تهران</p></div>
    </div>,
    <div className='flex flex-row items-center gap-4 w-full'>
        <div className='rounded-full w-12 h-12 flex-shrink-0 bg-white/10 flex items-center justify-center'><LocalPhoneOutlinedIcon style={{color: '#FFCA0C'}} fontSize="medium" /></div>
        <div className='flex flex-col items-start text-right'><h3 className='text-lg font-bold text-white mb-1'>شماره تماس</h3><p className='text-gray-200 text-sm' dir="ltr">0912 000 0000</p></div>
    </div>,
    <div className='flex flex-row items-center gap-4 w-full'>
        <div className='rounded-full w-12 h-12 flex-shrink-0 bg-white/10 flex items-center justify-center'><EmailOutlinedIcon style={{color: '#FFCA0C'}} fontSize="medium" /></div>
        <div className='flex flex-col items-start text-right'><h3 className='text-lg font-bold text-white mb-1'>آدرس ایمیل</h3><p className='text-gray-200 text-sm'>info@lawyer-site.ir</p></div>
    </div>,
    <div className='flex flex-row items-center gap-4 w-full'>
        <div className='rounded-full w-12 h-12 flex-shrink-0 bg-white/10 flex items-center justify-center'><AccessTimeOutlinedIcon style={{color: '#FFCA0C'}} fontSize="medium" /></div>
        <div className='flex flex-col items-start text-right'><h3 className='text-lg font-bold text-white mb-1'>ساعات کاری</h3><p className='text-gray-200 text-sm leading-relaxed'>شنبه تا چهارشنبه: ۹ صبح تا ۵ عصر<br/>پنجشنبه: ۹ صبح تا ۱ بعدازظهر</p></div>
    </div>
];

function ContactInfo() {
    return (
        <div className='w-full flex flex-col items-start h-fit' dir="rtl">
            <ul className='w-full space-y-8'>{ContactInfoData.map((item, index) => <li className='w-full flex' key={index}>{item}</li>)}</ul>
        </div>
    )
}

function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', content: '' });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        setTimeout(() => {
            // Write to mock DB so the admin panel gets updated
            const existingMessages = JSON.parse(localStorage.getItem('messages') || '[]');
            existingMessages.push({
                id: Date.now(),
                ...formData,
                created_at: new Date().toISOString(),
                is_read: false
            });
            localStorage.setItem('messages', JSON.stringify(existingMessages));

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', content: '' });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className='bg-white rounded-xl p-8 shadow-md col-span-1'>
            <h2 className='text-2xl font-bold rtl'>فرم تماس</h2><br/>
            {status === 'success' && <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4 rtl font-medium border border-green-200">پیام شما با موفقیت ارسال شد. در اسرع وقت پاسخگو خواهیم بود.</div>}
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="flex flex-col rtl"><label className="font-medium text-gray-700 mb-2">ایمیل</label><input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full placeholder:text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-[#4038C9] transition" placeholder="آدرس ایمیل خود را وارد نمایید" /></div>
                    <div className="flex flex-col rtl"><label className="font-medium text-gray-700 mb-2">نام و نام خانوادگی</label><input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full placeholder:text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-[#4038C9] transition" placeholder="نام و نام خانوادگی" /></div>
                </div><br/>
                <div className="flex flex-col rtl"><label className="font-medium text-gray-700 mb-2">شماره تماس</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full placeholder:text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-[#4038C9] transition" placeholder="شماره تماس خود را وارد نمایید" /></div><br/>
                <div className="flex flex-col rtl"><label className="font-medium text-gray-700 mb-2">موضوع</label><input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full placeholder:text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-[#4038C9] transition" placeholder="موضوع پیام خود را وارد نمایید" /></div><br/>
                <h3 className='font-medium text-gray-700 mb-2 rtl'>پیام</h3>
                <textarea required name="content" value={formData.content} onChange={handleChange} className='resize-y w-full placeholder:text-sm border border-gray-300 rounded-md px-3 py-2 rtl h-28 focus:outline-[#4038C9] transition' placeholder='متن پیام خود را وارد نمایید' /><br/><br/>
                <button type="submit" disabled={loading} className='bg-[#4038C9] w-full text-white p-3 rounded-md font-bold hover:bg-indigo-800 transition disabled:opacity-50 cursor-pointer'>{loading ? 'در حال ارسال...' : 'ارسال پیام'}</button>
            </form>
        </div>
    )
}

function MapView() {
    return (
        <div className='bg-white rounded-xl p-2 shadow-inner w-full h-full overflow-hidden'>
            {/* FIXED HTTPS Map URL so GitHub Pages won't block it */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.967399815456!2d51.40871311525997!3d35.70295198018903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0114b0b8c6a5%3A0x6318357f89b9d36!2sTehran%20Province%2C%20Tehran%2C%20Enghelab%20Sq%2C%20Iran!5e0!3m2!1sen!2s!4v1692200000000!5m2!1sen!2s" className='w-full h-full rounded-lg' style={{border: 0, minHeight: '230px'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    )
}

function Header() {
    const [settings, setSettings] = useState(null);
    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('settings') || '{}');
            setSettings(data);
        } catch (e) { setSettings({}); }
    }, []);

    const lawyerName = settings?.lawyer_name || "تیم متخصص ما";
    const headerDescription = settings?.header_bio || "با بیش از ۱۵ سال تجربه در زمینه‌های مختلف حقوقی...";

    const scrollDown = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <header className='relative w-full min-h-[90vh] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#3C3A86] rtl'>
            <div className='absolute inset-0 z-0'>
                <img className='w-full h-full object-cover opacity-30 mix-blend-overlay' src={courtStuff} alt="Background" />
                <div className='absolute inset-0 bg-gradient-to-b from-[#3C3A86]/80 via-[#3C3A86]/50 to-[#1F1D47]/90'></div>
            </div>
            <div className='relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12 mt-16 md:mt-0'>
                <div className='flex flex-col items-center md:items-start text-center md:text-right w-full md:w-3/5 space-y-6'>
                    <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-lg'>وکالت حرفه‌ای با<br/><span className='text-[#FFCA0C] relative inline-block mt-2'>{lawyerName}<svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FFCA0C]/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg></span></h1>
                    <p className='text-gray-200 text-lg md:text-xl font-light max-w-2xl leading-relaxed opacity-90 line-clamp-3 whitespace-pre-wrap'>{headerDescription}</p>
                    <div className='flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center md:justify-start'>
                        <button onClick={() => scrollDown('contact')} className='inline-block text-center bg-[#FFCA0C] hover:bg-[#E5B50A] text-gray-900 font-bold px-8 py-4 rounded-xl shadow-[0_4px_14px_0_rgba(255,202,12,0.39)] hover:shadow-[0_6px_20px_rgba(255,202,12,0.23)] hover:-translate-y-1 transition-all duration-300 cursor-pointer'>مشاوره رایگان</button>
                        <button onClick={() => scrollDown('services')} className='inline-block text-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium px-8 py-4 rounded-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer'>خدمات حقوقی</button>
                    </div>
                </div>
                <div className='hidden md:flex w-full md:w-2/5 justify-end'>
                    <div className='w-full aspect-square max-w-[400px] border-4 border-white/10 rounded-full flex items-center justify-center p-4 relative backdrop-blur-sm'>
                        <div className='w-full h-full border border-[#FFCA0C]/50 rounded-full animate-[spin_20s_linear_infinite] absolute'></div>
                        <img src={emblem} alt="Court Logo" className="scale-200 w-2/3 object-contain opacity-80 mix-blend-screen drop-shadow-2xl"/>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
                <svg className="relative block w-full h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C-1.81,95.8,7.91,95.6,18.15,95.27c52.2-1.74,103.54-15.65,153.2-31.54C216.77,48.8,269.45,66.6,321.39,56.44Z" fill="#ffffff"></path></svg>
            </div>
        </header>
    );
}

function AboutPage() {
    const [settings, setSettings] = useState(null);
    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('settings') || '{}');
            setSettings(data);
        } catch (e) { setSettings({}); }
    }, []);

    const lawyerName = settings?.lawyer_name || "تیم تخصصی";
    const lawyerBio = settings?.lawyer_bio || "توضیحات تکمیلی به زودی اضافه خواهد شد.";
    const lawyerImage = settings?.lawyer_image || lawyerHand;

    return (
        <section className='bg-white py-24 rtl overflow-hidden'>
            <div className='max-w-7xl mx-auto px-6 lg:px-8'>
                <div className='flex flex-col lg:flex-row items-center gap-16'>
                    <div className="w-full lg:w-1/2 relative">
                        <div className="absolute -top-6 -right-6 w-full h-full border-4 border-[#FFCA0C] rounded-2xl z-0 hidden md:block transition-transform hover:translate-x-2 hover:-translate-y-2 duration-500"></div>
                        <div className="absolute -bottom-6 -left-6 w-3/4 h-3/4 bg-[#3C3A86]/10 rounded-3xl z-0 blur-2xl"></div>
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-[#3C3A86]/20 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500"></div>
                            <img src={lawyerImage} alt={lawyerName} className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 flex flex-col items-start'>
                        <div className="inline-block px-4 py-1.5 rounded-full bg-[#3C3A86]/10 text-[#3C3A86] font-semibold text-sm mb-4 border border-[#3C3A86]/20">آشنایی با ما</div>
                        <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-6'>درباره <span className='text-[#4038C9] relative'>من<span className="absolute bottom-1 left-0 w-full h-2 bg-[#FFCA0C]/40 -z-10 rounded"></span></span></h2>
                        <p className='text-gray-600 text-lg leading-loose mb-8 text-justify whitespace-pre-wrap'>{lawyerBio}</p>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8'>
                            <TwoElementCard icon={bookIcon} text="تخصص چندگانه"/>
                            <TwoElementCard icon={caseIcon} text="۵۰۰+ پرونده موفق"/>
                            <TwoElementCard icon={medalIcon} text="۱۵+ سال تجربه"/>
                        </div>
                        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className='group flex items-center gap-2 bg-[#4038C9] hover:bg-[#2C2699] text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer'>
                            <span>ارتباط مستقیم با من</span>
                            <svg className="w-5 h-5 transform rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

const AVAILABLE_ICONS = { Balance: BalanceIcon, Gavel: GavelIcon, AccountBalance: AccountBalanceIcon, MenuBook: MenuBookIcon, FamilyRestroom: FamilyRestroomIcon, BusinessCenter: BusinessCenterIcon, Handshake: HandshakeIcon, Assignment: AssignmentIcon, Security: SecurityIcon, HomeWork: HomeWorkIcon };

function Services() {
    const [settingsServices, setSettingsServices] = useState([]);

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('settings') || '{}');
            const rawServices = data?.services_json;
            let parsed = [];

            if (typeof rawServices === 'string') {
                parsed = JSON.parse(rawServices);
            } else if (Array.isArray(rawServices)) {
                parsed = rawServices;
            }

            setSettingsServices(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
            console.error("Failed to load services correctly:", e);
        }
    }, []);

    const defaultLegalIcon = (<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>);

    if (!settingsServices || settingsServices.length === 0) return null;

    return (
        <section className='relative bg-[#F9FAFB] w-full py-24 overflow-hidden rtl'>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#3C3A86 2px, transparent 2px)', backgroundSize: '30px 30px'}}></div>
            <div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>
                <div className='text-center max-w-3xl mx-auto mb-16'>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#FFCA0C]/20 text-[#B8860B] font-bold text-sm mb-4 border border-[#FFCA0C]/50">حوزه‌های تخصصی</div>
                    <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-6'>خدمات <span className='text-[#4038C9]'>حقوقی</span></h2>
                    <p className='text-gray-600 text-lg leading-relaxed'>من در زمینه‌های مختلف حقوقی خدمات تخصصی ارائه می‌دهم. با تکیه بر دانش و تجربه سالیان متمادی، به دنبال کشف بهترین راه‌حل برای مشکلات و پرونده‌های حقوقی شما هستم.</p>
                </div>
                <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {settingsServices.map((each, index) => {
                        const SelectedIcon = AVAILABLE_ICONS[each?.icon];
                        return (
                            <li key={index} className="group hover:-translate-y-2 transition-transform duration-300 ease-out h-full">
                                <div className="h-full bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 transition-shadow duration-300 overflow-hidden">
                                    <ThreeElementCard title={each?.title || 'بدون عنوان'} description={each?.desc || each?.description || ''}>
                                        <div className="text-[#4038C9] group-hover:scale-110 transition-transform duration-300">
                                            {SelectedIcon ? <SelectedIcon sx={{ fontSize: 48 }} /> : defaultLegalIcon}
                                        </div>
                                    </ThreeElementCard>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

function Comments() {
    const [menuState, setMenuState] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const [settingsComments, setSettingsComments] = useState([]);

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem('settings') || '{}');
            const rawComments = data?.testimonials_json;
            let parsed = [];

            if (typeof rawComments === 'string') {
                parsed = JSON.parse(rawComments);
            } else if (Array.isArray(rawComments)) {
                parsed = rawComments;
            }

            setSettingsComments(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
            console.error("Failed to parse testimonials correctly:", e);
        }
    }, []);

    // FIX: Passing menuState in dependency array resets the timer when user clicks manually!
    useEffect(() => {
        if (settingsComments.length <= 1) return;
        const timer = setInterval(() => {
            handleSlideChange((prev) => (prev < settingsComments.length - 1 ? prev + 1 : 0));
        }, 5000);
        return () => clearInterval(timer);
    }, [settingsComments.length, menuState]);

    const handleSlideChange = (newIndex) => {
        setIsFading(true);
        setTimeout(() => {
            setMenuState(prev => {
                const nextVal = typeof newIndex === 'function' ? newIndex(prev) : newIndex;
                return nextVal < settingsComments.length ? nextVal : 0;
            });
            setIsFading(false);
        }, 300);
    };

    if (!settingsComments || settingsComments.length === 0) return null;

    const safeMenuState = menuState < settingsComments.length ? menuState : 0;
    const currentComment = settingsComments[safeMenuState] || {};

    const getAvatarPic = (comment) => {
        if (comment?.image && comment.image.length > 100) return comment.image;
        const maleAvatar = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234038C9'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
        const femaleAvatar = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23C9388B'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
        if (comment?.avatar === 'female') return femaleAvatar;
        if (comment?.avatar === 'male') return maleAvatar;
        return fallbackPic;
    };

    return (
        <section className='bg-white w-full py-24 relative overflow-hidden rtl'>
            <div className="absolute top-10 right-10 md:top-20 md:right-32 text-[#F9FAFB] z-0 opacity-80" style={{ fontSize: '20rem', lineHeight: '1', fontFamily: 'serif' }}>”</div>
            <div className='max-w-5xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center'>
                <div className='text-center mb-12'>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#3C3A86]/10 text-[#3C3A86] font-semibold text-sm mb-4">تجربیات موفق</div>
                    <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-6'>نظرات <span className='text-[#4038C9]'>موکلین</span></h2>
                    <p className='text-gray-600 text-lg max-w-2xl mx-auto'>بزرگترین افتخار ما، رضایت و اعتماد موکلینی است که در مسیر احقاق حقوقشان همراه آنها بوده‌ایم.</p>
                </div>
                <div className={`w-full transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                        <FourElementCard comment={currentComment?.text || currentComment?.comment || ''} name={currentComment?.name || 'موکل ناشناس'} position={currentComment?.position || "موکل"} picture={getAvatarPic(currentComment)} />
                    </div>
                </div>
                {settingsComments.length > 1 && (
                    <div className='flex flex-row items-center gap-3 mt-10'>
                        {settingsComments.map((_, index) => (
                            <button key={index} onClick={() => handleSlideChange(index)} aria-label={`View comment ${index + 1}`} className="focus:outline-none p-2 cursor-pointer">
                                <div className={`transition-all duration-300 rounded-full ${safeMenuState === index ? 'w-8 h-2.5 bg-[#FFCA0C] shadow-[0_0_10px_rgba(255,202,12,0.5)]' : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'}`} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function ContactUs() {
    return (
        <section className='bg-[#F9FAFB] w-full py-24 relative rtl'>
            <div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>
                <div className='text-center max-w-3xl mx-auto mb-16'>
                    <h2 className='text-4xl md:text-5xl font-black text-black mb-6'>تماس <span className='text-[#3C3A86] relative'>با من<span className="absolute bottom-1 left-0 w-full h-3 bg-[#FFCA0C]/60 -z-10 rounded"></span></span></h2>
                    <p className='text-gray-800 text-lg leading-relaxed font-medium'>برای دریافت مشاوره حقوقی تخصصی، بررسی پرونده و یا تعیین وقت ملاقات حضوری، از طریق فرم زیر و یا راه‌های ارتباطی با دفتر وکالت در تماس باشید.</p>
                </div>
                <div className='bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 flex flex-col lg:flex-row'>
                    <div className='w-full lg:w-5/12 bg-[#3C3A86] p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden'>
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black mb-8 text-white flex items-center gap-3"><div className="w-2 h-8 bg-[#FFCA0C] rounded-full"></div>اطلاعات تماس</h3>
                            <div className="text-gray-50 space-y-6 font-medium"><ContactInfo /></div>
                        </div>
                        <div className="mt-12 relative z-10 rounded-xl shadow-2xl border border-white/20 w-full flex-grow"><MapView /></div>
                    </div>
                    <div className='w-full lg:w-7/12 p-8 md:p-12 lg:p-16'>
                        <h3 className="text-3xl font-black mb-6 text-black border-b-2 border-gray-100 pb-4">ارسال پیام مستقیم</h3>
                        <p className="text-gray-800 mb-8 text-base font-medium">لطفاً اطلاعات خود را به دقت وارد کنید. همکاران ما در سریع‌ترین زمان ممکن با شما تماس خواهند گرفت.</p>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}

function Homepage() {
    return (
        <div className='relative'>
            <div id="home"><Header /></div>
            <div id="about" className="scroll-mt-20"><AboutPage /></div>
            <div id="services" className="scroll-mt-20"><Services /></div>
            <div id="comments" className="scroll-mt-20"><Comments /></div>
            <div id="contact" className="scroll-mt-20"><ContactUs /></div>
        </div>
    )
}

export default Homepage;