import lawyerImg from './assets/lawyerHand.png';
import lawyerHand from './assets/lawyerHand.png';
import person1 from './assets/person1.jpg';
import person2 from './assets/person2.jpg';
import person3 from './assets/person3.jpg';
import person7 from './assets/person7.jpg';
import wwww from './assets/wwww.png';
import lawyerHands from './assets/LawyerHands.jpg';

export const initializeMockData = () => {
    // Versioning key: Change 'v2' to 'v3' etc., if you ever want to force-reset visitor's cache on Github Pages
    const SEED_VERSION = 'isSeeded_v2';

    if (!localStorage.getItem(SEED_VERSION)) {
        localStorage.clear(); // Clear old structures to avoid conflicts

        localStorage.setItem('settings', JSON.stringify({
            lawyer_name: "دکتر ابراهیم چالاکی",
            lawyer_bio: "وکیل پایه یک دادگستری عضو کانون وکلای دادگستری مرکز، دارای بیش از 10 سال سابقه کار\n" +
                "درحرفۀ وکالت و بیش از 15 سال سابقه مشاوره حقوقی در زمینه حل و فصل پرونده های حقوقی\n" +
                "شرکت ها می باشم. شغل و حرفه مورد علاقه ام از دوران دبیرستان، حرفه شریف وکالت بوده است و با\n" +
                "قبولی در آزمون ورودی کانون وکلای دادگستری و گذراندن دوره کارآموزی در محضر اساتید معزز و\n" +
                "با تجربه در آزمون اختبار موفق به اخذ پروانه وکالت پایه یک در حوزه شهر تهران شده ام.",
            header_bio: "با تکیه بر دانش حقوقی، تجربه‌ی عملی و نگرشی مسئولانه، در کنار شما هستم تا با زبانی ساده و قابل فهم، مفاهیم پیچیده‌ی حقوقی را روشن کنم و از حقوق شما در محاکم قضایی دفاع نمایم.",
            lawyer_image: lawyerImg,
            author_image: lawyerImg,
            author_name: "دکتر ابراهیم چالاکی",
            services_json: JSON.stringify([
                { title: "دعاوی خانواده", desc: "طلاق، مهریه، نفقه، حضانت و انحصار وراثت", icon: "FamilyRestroom" },
                { title: "دعاوی ملکی", desc: "الزام به تنظیم سند، خلع ید، تصرف عدوانی", icon: "HomeWork" },
                { title: "دعاوی کیفری", desc: "کلاهبرداری، خیانت در امانت، سرقت، جعل", icon: "Gavel" },
                { title: "قراردادها", desc: "تنظیم و بررسی قراردادهای تجاری و ملکی", icon: "Assignment" },
                { title: "دعاوی تجاری", desc: "ورشکستگی، اسناد تجاری (چک و سفته)", icon: "BusinessCenter" },
                { title: "مشاوره حقوقی", desc: "ارائه مشاوره تخصصی پیش از هرگونه اقدام قانونی", icon: "Balance" }
            ]),
            testimonials_json: JSON.stringify([
                { name: "علی رضایی", position: "موکل دعاوی ملکی", text: "بسیار حرفه‌ای و کاربلد. پرونده ملکی پیچیده من را در کوتاه‌ترین زمان ممکن به نتیجه رساندند.", image: person3 },
                { name: "محمد ناصری", position: "موکل دعاوی خانواده", text: "صبر، حوصله و دانش حقوقی بالای ایشان باعث شد در سخت‌ترین شرایط زندگیم بهترین تصمیم را بگیرم.", image: person7 },
                { name: "مهندس نادری", position: "مدیرعامل شرکت", text: "تنظیم قراردادهای تجاری شرکت ما تماماً بر عهده تیم ایشان است. از دقت و تخصصشان سپاسگزاریم.", image: person2 }
            ])
        }));

        localStorage.setItem('posts', JSON.stringify([
            { id: 1, title: "مراحل قانونی انحصار وراثت چیست؟", excerpt: "در این مقاله به بررسی گام به گام مراحل انحصار وراثت و مدارک لازم برای آن می‌پردازیم.", content: "انحصار وراثت فرآیندی است که طی آن ورثه متوفی و میزان سهم‌الارث هر یک به صورت قانونی مشخص می‌شود.\n\n۱. تهیه گواهی فوت\n۲. استشهادیه محضری\n۳. مراجعه به شورای حل اختلاف\n۴. پرداخت مالیات بر ارث", created_at: new Date(Date.now() - 86400000 * 2).toISOString(), author: "دکتر ابراهیم چالاکی", image: person1 },
            { id: 2, title: "تفاوت چک کیفری و حقوقی", excerpt: "چک به عنوان یکی از مهم‌ترین اسناد تجاری، دارای ضمانت‌اجراهای متفاوتی است. در چه شرایطی چک کیفری می‌شود؟", content: "بسیاری از افراد تفاوت بین چک حقوقی و کیفری را نمی‌دانند. چک کیفری دارای مجازات حبس است در حالی که چک حقوقی تنها از طریق توقیف اموال قابل پیگیری است. شرایط کیفری شدن چک شامل عدم وعده‌دار بودن، عدم تضمین و بلامحل بودن است.", created_at: new Date(Date.now() - 86400000 * 5).toISOString(), author: "دکتر ابراهیم چالاکی", image: person1 },
            { id: 3, title: "شرایط فسخ قراردادهای ملکی", excerpt: "فسخ قرارداد یکی از چالش‌برانگیزترین مباحث حقوقی است. آشنایی با خیارات قانونی برای فسخ قرارداد.", content: "فسخ قرارداد به معنای پایان دادن یک‌طرفه به قرارداد است. در قراردادهای ملکی، خیاراتی مانند خیار غبن (ضرر فاحش)، خیار عیب و خیار تاخیر ثمن از مهم‌ترین مواردی هستند که به طرفین حق فسخ می‌دهند.", created_at: new Date(Date.now() - 86400000 * 10).toISOString(), author: "دکتر ابراهیم چالاکی", image: person1 }
        ]));

        localStorage.setItem('comments', JSON.stringify([]));
        localStorage.setItem('messages', JSON.stringify([]));
        localStorage.setItem(SEED_VERSION, 'true');
    }
};