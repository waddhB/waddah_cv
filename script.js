// تهيئة GSAP للرسوم المتحركة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة GSAP مع ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // الرسوم المتحركة للشريط العلوي
    gsap.from('.navbar', {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: 'power3.out'
    });
    
    // الرسوم المتحركة للمحتوى الرئيسي
    gsap.from('.hero-title', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        delay: 0.7,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-description', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        delay: 0.9,
        ease: 'power3.out'
    });
    
    gsap.from('.profile-image', {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        delay: 1,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.image-frame', {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        delay: 1.2,
        ease: 'back.out(1.7)'
    });
    
    // الرسوم المتحركة للعناصر العائمة
    gsap.from('.floating-element', {
        duration: 1,
        scale: 0,
        opacity: 0,
        stagger: 0.3,
        delay: 1.5,
        ease: 'back.out(1.7)'
    });
    
    // الرسوم المتحركة للعناصر عند التمرير
    gsap.utils.toArray('.profile-card, .education-item, .skill-category, .achievement-card, .hobby-card').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    });
    
    // الرسوم المتحركة لأشرطة المهارات
    gsap.utils.toArray('.skill-level').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar.parentElement.parentElement,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1.5,
            width: width,
            ease: 'power3.out'
        });
    });
    
    // إدارة تغيير اللغة
    const langArBtn = document.getElementById('lang-ar');
    const langEnBtn = document.getElementById('lang-en');
    const body = document.body;
    
    // تعيين اللغة الافتراضية (العربية)
    let currentLang = 'ar';
    
    // دالة لتغيير اللغة
    function switchLanguage(lang) {
        currentLang = lang;
        
        // تغيير اتجاه الصفحة
        if (lang === 'ar') {
            body.setAttribute('dir', 'rtl');
            body.style.textAlign = 'right';
            document.documentElement.lang = 'ar';
        } else {
            body.setAttribute('dir', 'ltr');
            body.style.textAlign = 'left';
            document.documentElement.lang = 'en';
        }
        
        // تحديث النصوص
        document.querySelectorAll('[data-en]').forEach(element => {
            if (lang === 'en') {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = element.getAttribute('data-en');
                } else {
                    // حفظ النص العربي الأصلي إذا لم يتم حفظه مسبقاً
                    if (!element.hasAttribute('data-ar')) {
                        element.setAttribute('data-ar', element.textContent);
                    }
                    element.textContent = element.getAttribute('data-en');
                }
            } else {
                // استعادة النص العربي من سمة data-ar
                if (element.hasAttribute('data-ar')) {
                    element.textContent = element.getAttribute('data-ar');
                }
            }
        });
        
        // تحديث أزرار اللغة
        if (lang === 'ar') {
            langArBtn.classList.add('active');
            langEnBtn.classList.remove('active');
            langArBtn.textContent = 'عربي';
            langEnBtn.textContent = 'English';
        } else {
            langEnBtn.classList.add('active');
            langArBtn.classList.remove('active');
            langArBtn.textContent = 'Arabic';
            langEnBtn.textContent = 'English';
        }
        
        // تحديث عنوان الصفحة
        if (lang === 'en') {
            document.title = "CV | Waddah Bassah - Mechatronics Engineer";
        } else {
            document.title = "السيرة الذاتية | وضاح بصه - مهندس ميكاترونكس";
        }
        
        // إعادة توجيه اتجاه شريط المهارات المتحرك
        const marqueeTrack = document.querySelector('.marquee-track');
        if (marqueeTrack) {
            if (lang === 'ar') {
                marqueeTrack.style.animation = 'marquee-rtl 30s linear infinite';
            } else {
                marqueeTrack.style.animation = 'marquee-ltr 30s linear infinite';
            }
        }
    }
    
    // حفظ النصوص العربية الأصلية في سمة data-ar
    document.querySelectorAll('[data-en]').forEach(element => {
        if (!element.hasAttribute('data-ar')) {
            element.setAttribute('data-ar', element.textContent);
        }
    });
    
    // إضافة سمة data-ar خاصة لروابط التنقل
    document.querySelectorAll('.nav-link[data-en]').forEach(link => {
        if (!link.hasAttribute('data-ar')) {
            link.setAttribute('data-ar', link.textContent);
        }
    });
    
    // إضافة أحداث النقر على أزرار اللغة
    langArBtn.addEventListener('click', () => switchLanguage('ar'));
    langEnBtn.addEventListener('click', () => switchLanguage('en'));
    
    // تهيئة اللغة عند التحميل
    switchLanguage('ar');
    
    // تأثيرات إضافية للصور
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.5,
                scale: 1.05,
                ease: 'power2.out'
            });
        });
        
        img.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.5,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
    
    // تأثير عند تحميل الصفحة
    window.addEventListener('load', function() {
        gsap.to('body', {
            duration: 0.5,
            opacity: 1,
            ease: 'power2.out'
        });
    });
    
    // تأثيرات للبطاقات
    const cards = document.querySelectorAll('.profile-card, .education-item, .achievement-card, .hobby-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -10,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                boxShadow: 'var(--shadow)',
                ease: 'power2.out'
            });
        });
    });
});