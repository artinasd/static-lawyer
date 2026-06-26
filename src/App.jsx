import React, { useState } from 'react';
import { createHashRouter, RouterProvider, Outlet, Navigate, Link } from "react-router-dom";
import Homepage from "./Home.jsx";
import { BlogLanding, BlogPost } from "./Blog.jsx"; // We will create this next
import AdminSystem from "./Admin.jsx"; // We will create this next

// Material UI Icons for your EXACT Footer
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

// --- YOUR EXACT NAVIGATION BAR ---
function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-[#D4AF37]">موسسه حقوقی دکتر ابراهیم چالاکی</Link>
                    </div>
                    <div className="hidden md:flex space-x-8 space-x-reverse items-center">
                        <Link to="/" onClick={scrollToTop} className="text-gray-700 hover:text-[#D4AF37] font-medium transition-colors">صفحه اصلی</Link>
                        <a href="/#about" className="text-gray-700 hover:text-[#D4AF37] font-medium transition-colors">درباره من</a>
                        <a href="/#services" className="text-gray-700 hover:text-[#D4AF37] font-medium transition-colors">خدمات</a>
                        <a href="/#contact" className="text-gray-700 hover:text-[#D4AF37] font-medium transition-colors pl-8">تماس با ما</a>
                        <Link to="/blog" className="text-gray-700 hover:text-[#D4AF37] font-medium transition-colors">مقالات حقوقی</Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-gray-700 hover:text-[#D4AF37] focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white border-t shadow-inner">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                        <Link to="/" onClick={() => { setIsOpen(false); scrollToTop(); }} className="text-gray-700 hover:text-[#D4AF37] block px-3 py-2 rounded-md font-medium text-right">صفحه اصلی</Link>
                        <a href="/#about" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#D4AF37] block px-3 py-2 rounded-md font-medium text-right">درباره من</a>
                        <a href="/#services" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#D4AF37] block px-3 py-2 rounded-md font-medium text-right">خدمات</a>
                        <a href="/#contact" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#D4AF37] block px-3 py-2 rounded-md font-medium text-right">تماس با ما</a>
                        <Link to="/blog" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#D4AF37] block px-3 py-2 rounded-md font-medium text-right">مقالات حقوقی</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

// --- YOUR EXACT FOOTER ---
function Footer() {
    return (
        <footer className='bg-[#111026] text-gray-300 pt-16 pb-8 border-t-4 border-[#FFCA0C] rtl'>
            <div className='max-w-7xl mx-auto px-6 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-12'>
                    <div className="flex flex-col">
                        <h2 className='text-white text-2xl font-bold mb-4 flex items-center gap-2'>
                            <div className="w-2 h-8 bg-[#FFCA0C] rounded-full"></div>
                            دکتر ابراهیم چالاکی
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-sm text-justify">
                            ارائه خدمات تخصصی وکالت و مشاوره حقوقی با تکیه بر سال‌ها تجربه موفق در محاکم دادگستری. تعهد، صداقت و پیگیری مستمر، اصول اساسی کار ماست.
                        </p>
                    </div>
                    <div className="flex flex-col md:pr-10">
                        <h3 className="text-white text-lg font-bold mb-4">دسترسی سریع</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="https://eadl.ir/" className="hover:text-[#FFCA0C] transition-colors">وبسایت قوه قضائیه</a></li>
                            <li><a href="https://icbar.ir/" className="hover:text-[#FFCA0C] transition-colors">کانون وکلای دادگستری مرکز</a></li>
                            <li><a href="https://adliran.ir/Home/Index" className="hover:text-[#FFCA0C] transition-colors">سامانه عدل ایران</a></li>
                            <li><Link to="/admin" className="hover:text-[#FFCA0C] transition-colors">ورود به پنل مدیریت</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-white text-lg font-bold mb-4">ارتباط با ما</h3>
                        <p className="text-gray-400 text-sm mb-6">برای اطلاع از آخرین قوانین و مقالات، ما را در شبکه‌های اجتماعی دنبال کنید.</p>
                        <div className='flex flex-row items-center gap-4'>
                            <button className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFCA0C] hover:-translate-y-1 transition-all duration-300 group'><LocalPhoneOutlinedIcon className="text-gray-400 group-hover:text-gray-900" fontSize="small" /></button>
                            <button className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFCA0C] hover:-translate-y-1 transition-all duration-300 group'><EmailOutlinedIcon className="text-gray-400 group-hover:text-gray-900" fontSize="small" /></button>
                            <button className='w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFCA0C] hover:-translate-y-1 transition-all duration-300 group'><LanguageOutlinedIcon className="text-gray-400 group-hover:text-gray-900" fontSize="small" /></button>
                        </div>
                    </div>
                </div>
                <div className='pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4'>
                    <p className='text-gray-500 text-sm'>تمامی حقوق مادی و معنوی این وب‌سایت محفوظ می‌باشد. © {new Date().getFullYear()}</p>
                    <p className='text-gray-500 text-xs'>طراحی و توسعه با <span className="text-red-500">♥</span></p>
                </div>
            </div>
        </footer>
    );
}

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavigationBar />
            <main className="flex-grow"><Outlet /></main>
            <Footer />
        </div>
    );
};

// Simplified AuthGuard for Static Setup
const AuthGuard = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/admin" replace />;
    return children;
};

export default function App() {
    // Using HashRouter so GitHub Pages doesn't 404 on refresh
    const router = createHashRouter([
        {
            path: '/',
            element: <RootLayout />,
            children: [
                { path: '/', element: <Homepage /> },
                { path: '/blog', element: <BlogLanding /> },
                { path: '/blog/:postId', element: <BlogPost /> },
                { path: '/admin/*', element: <AdminSystem /> }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}