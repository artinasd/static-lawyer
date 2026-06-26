export const initializeMockDB = () => {
    // We populate localStorage with your exact CMS structure so your UI components load exactly as they used to.
    const defaultSettings = {
        lawyer_name: "دکتر ابراهیم چالاکی",
        header_bio: "با بیش از ۱۵ سال تجربه در زمینه‌های مختلف حقوقی، به شما کمک می‌کنیم تا به بهترین نتیجه ممکن در پرونده‌های حقوقی خود دست یابید. تلاش ما بر ارائه مشاوره‌های جامع و به‌روز، همراه با ارائه راهکارهای متناسب است.",
        lawyer_bio: "من دکتر ابراهیم چالاکی، وکیل پایه یک دادگستری با بیش از ۱۵ سال تجربه در زمینه‌های مختلف حقوقی هستم. تخصص من در دعاوی مدنی، کیفری، خانواده و قراردادهای تجاری است.\n\nهدف من ارائه خدمات حقوقی با بالاترین استانداردهای حرفه‌ای و اخلاقی است. من به هر پرونده با دقت و تعهد کامل رسیدگی می‌کنم و همواره منافع موکلین خود را در اولویت قرار می‌دهم.",
        lawyer_image: "",
        services_json: JSON.stringify([
            { icon: 'Balance', title: 'دعاوی ملکی', desc: 'الزام به تنظیم سند، خلع ید، تصرف عدوانی، فسخ مبایعه نامه و اختلافات ثبتی.' },
            { icon: 'Gavel', title: 'دعاوی کیفری', desc: 'کلاهبرداری، خیانت در امانت، سرقت، ضرب و جرح، جرایم رایانه ای و سایبری.' },
            { icon: 'FamilyRestroom', title: 'دعاوی خانواده', desc: 'طلاق، مطالبه مهریه، نفقه، حضانت فرزندان و استرداد جهیزیه.' },
            { icon: 'Assignment', title: 'قراردادها', desc: 'تنظیم تخصصی انواع قراردادهای تجاری، پیمانکاری، مشارکت در ساخت.' }
        ]),
        testimonials_json: JSON.stringify([
            { text: "پرونده ملکی بسیار پیچیده‌ای داشتم که با درایت دکتر چالاکی در کمترین زمان ممکن حل شد.", name: "رضا محمدی", position: "موکل دعاوی ملکی", avatar: "male" },
            { text: "صداقت و پیگیری مستمر ایشان در پرونده‌های کیفری واقعا ستودنی است.", name: "مریم احمدی", position: "موکل", avatar: "female" }
        ])
    };

    if (!localStorage.getItem('settings')) localStorage.setItem('settings', JSON.stringify(defaultSettings));
    if (!localStorage.getItem('posts')) localStorage.setItem('posts', JSON.stringify([]));
    if (!localStorage.getItem('comments')) localStorage.setItem('comments', JSON.stringify([]));
};