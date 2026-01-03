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
    
    // ==============================================
    // وظيفة النسخ التلقائي عند النقر
    // ==============================================
    
    // دالة نسخ النص إلى الحافظة
    function copyToClipboard(text) {
        // إنشاء عنصر textarea مؤقت
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        
        // تحديد النص
        textarea.select();
        textarea.setSelectionRange(0, 99999); // للجوال
        
        // نسخ النص
        let success = false;
        try {
            success = document.execCommand('copy');
            console.log('تم النسخ: ' + text);
        } catch (err) {
            console.error('فشل النسخ: ', err);
            
            // محاولة باستخدام Clipboard API الجديد
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    success = true;
                }).catch(err => {
                    console.error('فشل النسخ باستخدام Clipboard API: ', err);
                });
            }
        }
        
        // إزالة العنصر المؤقت
        document.body.removeChild(textarea);
        
        return success;
    }
    
    // دالة لإظهار إشعار النسخ
    function showCopyNotification(element, text) {
        // إيجاد عنصر الإشعار
        const notification = element.querySelector('.copy-notification');
        if (!notification) return;
        
        // إظهار الإشعار
        notification.classList.add('show');
        
        // إضافة تأثير GSAP للإشعار
        gsap.fromTo(notification, 
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
        
        // إضافة تأثير اهتزاز للعنصر
        gsap.to(element, {
            duration: 0.1,
            x: 5,
            yoyo: true,
            repeat: 2,
            ease: 'power2.inOut'
        });
        
        // تغيير لون العنصر مؤقتاً
        element.style.backgroundColor = 'rgba(52, 152, 219, 0.3)';
        element.style.borderColor = 'var(--secondary-color)';
        
        // إخفاء الإشعار بعد 2 ثانية
        setTimeout(() => {
            notification.classList.remove('show');
            gsap.to(element, {
                duration: 0.5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'transparent',
                ease: 'power2.out'
            });
        }, 2000);
        
        // إضافة تأثير صوتي بسيط
        if (typeof Audio !== 'undefined') {
            try {
                const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');
                audio.volume = 0.1;
                audio.play();
            } catch (e) {
                // تجاهل خطأ الصوت
            }
        }
    }
    
    // إضافة حدث النقر لعناصر النسخ
    document.querySelectorAll('.copyable').forEach(element => {
        // إضافة مؤشر عند التمرير
        element.style.cursor = 'pointer';
        
        // حدث النقر للنسخ
        element.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // الحصول على النص المراد نسخه
            const textToCopy = this.getAttribute('data-copy') || this.textContent.trim();
            
            // تنظيف النص من أي رموز إضافية
            const cleanText = textToCopy
                .replace('تم النسخ!', '')
                .replace('Copied!', '')
                .replace('📋', '')
                .trim();
            
            // نسخ النص
            const success = copyToClipboard(cleanText);
            
            if (success) {
                // إظهار إشعار النجاح
                showCopyNotification(this, cleanText);
                
                // تسجيل الحدث في Google Analytics إذا كان متوفراً
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'copy_contact', {
                        'event_category': 'engagement',
                        'event_label': cleanText
                    });
                }
            } else {
                // محاولة بديلة لعرض رسالة للمستخدم
                alert(currentLang === 'ar' ? 
                    'فشل النسخ. يمكنك نسخ النص يدوياً:\n' + cleanText : 
                    'Copy failed. You can copy manually:\n' + cleanText);
            }
        });
        
        // تأثير عند التمرير فوق العنصر
        element.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.02,
                ease: 'power2.out'
            });
        });
        
        element.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
    
    // إضافة إمكانية نسخ أي نص في قسم التواصل
    document.querySelectorAll('#contact p:not(.copyable)').forEach(element => {
        // تخطي العناصر التي تحتوي بالفعل على copyable
        if (!element.classList.contains('copyable') && 
            !element.querySelector('.copyable') &&
            (element.textContent.includes('@') || 
             element.textContent.match(/\d{10,}/) ||
             element.textContent.includes('+967'))) {
            
            // جعل النص قابلاً للنسخ
            element.classList.add('copyable');
            element.style.cursor = 'pointer';
            
            // إضافة رمز النسخ
            const text = element.textContent.trim();
            element.setAttribute('data-copy', text);
            
            // إضافة إشعار النسخ إذا لم يكن موجوداً
            if (!element.querySelector('.copy-notification')) {
                const notification = document.createElement('span');
                notification.className = 'copy-notification';
                notification.textContent = currentLang === 'ar' ? 'تم النسخ!' : 'Copied!';
                notification.setAttribute('data-en', 'Copied!');
                notification.setAttribute('data-ar', 'تم النسخ!');
                element.appendChild(notification);
            }
        }
    });
    
    // دعم اللمس للأجهزة المحمولة
    let touchStartTime = 0;
    document.querySelectorAll('.copyable').forEach(element => {
        element.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
            e.preventDefault();
        }, { passive: false });
        
        element.addEventListener('touchend', function(e) {
            const touchDuration = Date.now() - touchStartTime;
            if (touchDuration < 500) { // نقر سريع، ليس استمراراً
                this.click();
            }
            e.preventDefault();
        }, { passive: false });
    });
});
