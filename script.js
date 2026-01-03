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
        // تنظيف النص أولاً
        const cleanText = cleanCopyText(text);
        
        // محاولة استخدام Clipboard API الجديد أولاً
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(cleanText)
                .then(() => {
                    console.log('تم النسخ باستخدام Clipboard API: ' + cleanText);
                    return true;
                })
                .catch(err => {
                    console.error('فشل النسخ باستخدام Clipboard API: ', err);
                    return fallbackCopy(cleanText);
                });
        } else {
            // استخدام الطريقة القديمة كبديل
            return Promise.resolve(fallbackCopy(cleanText));
        }
    }
    
    // دالة النسخ البديلة للتوافق مع المتصفحات القديمة
    function fallbackCopy(text) {
        // إنشاء عنصر textarea مؤقت
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';
        document.body.appendChild(textarea);
        
        // تحديد النص
        textarea.select();
        textarea.setSelectionRange(0, 99999); // للجوال
        
        // نسخ النص
        let success = false;
        try {
            success = document.execCommand('copy');
            console.log('تم النسخ باستخدام execCommand: ' + text);
        } catch (err) {
            console.error('فشل النسخ باستخدام execCommand: ', err);
        }
        
        // إزالة العنصر المؤقت
        document.body.removeChild(textarea);
        
        return success;
    }
    
    // دالة لتنظيف النص قبل النسخ
    function cleanCopyText(text) {
        return text
            .replace('تم النسخ!', '')
            .replace('Copied!', '')
            .replace('📋', '')
            .replace('+967-', '+967') // إزالة الشرطة من رقم الهاتف
            .replace(/\s+/g, ' ') // استبدال المسافات المتعددة بمسافة واحدة
            .trim();
    }
    
    // دالة لإظهار إشعار النسخ
    function showCopyNotification(element, text) {
        // إيجاد عنصر الإشعار
        const notification = element.querySelector('.copy-notification');
        if (!notification) return;
        
        // تحديث نص الإشعار بناءً على اللغة الحالية
        notification.textContent = currentLang === 'ar' ? 'تم النسخ!' : 'Copied!';
        
        // إظهار الإشعار
        notification.classList.add('show');
        
        // إضافة تأثير GSAP للإشعار
        gsap.fromTo(notification, 
            { 
                opacity: 0, 
                y: 10,
                scale: 0.8 
            },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.3, 
                ease: 'back.out(1.2)' 
            }
        );
        
        // إضافة تأثير اهتزاز للعنصر
        gsap.to(element, {
            duration: 0.1,
            x: 3,
            yoyo: true,
            repeat: 3,
            ease: 'power2.inOut'
        });
        
        // تغيير لون العنصر مؤقتاً
        gsap.to(element, {
            duration: 0.2,
            backgroundColor: 'rgba(52, 152, 219, 0.3)',
            borderColor: 'var(--secondary-color)',
            ease: 'power2.out'
        });
        
        // تغيير رمز النسخ مؤقتاً
        const originalContent = element.innerHTML;
        element.innerHTML = element.innerHTML.replace('📋', '✓');
        
        // إخفاء الإشعار بعد 1.5 ثانية
        setTimeout(() => {
            notification.classList.remove('show');
            gsap.to(element, {
                duration: 0.5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'transparent',
                ease: 'power2.out'
            });
            
            // استعادة رمز النسخ الأصلي بعد تأخير
            setTimeout(() => {
                element.innerHTML = originalContent.replace('✓', '📋');
            }, 500);
        }, 1500);
        
        // إضافة تأثير صوتي بسيط
        playCopySound();
    }
    
    // دالة لتشغيل صوت النسخ
    function playCopySound() {
        try {
            // إنشاء صوت بسيط باستخدام Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // تجاهل خطأ الصوت إذا لم يكن مدعوماً
            console.log('Web Audio API غير مدعوم في هذا المتصفح');
        }
    }
    
    // تهيئة عناصر النسخ عند التحميل
    function initializeCopyElements() {
        // إضافة حدث النقر لعناصر النسخ
        document.querySelectorAll('.copyable').forEach(element => {
            // إضافة مؤشر عند التمرير
            element.style.cursor = 'pointer';
            
            // منع إضافة أحداث متعددة
            if (element.hasAttribute('data-copy-initialized')) {
                return;
            }
            
            element.setAttribute('data-copy-initialized', 'true');
            
            // حدث النقر للنسخ
            element.addEventListener('click', async function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // الحصول على النص المراد نسخه
                const textToCopy = this.getAttribute('data-copy') || this.textContent.trim();
                
                try {
                    // نسخ النص
                    const success = await copyToClipboard(textToCopy);
                    
                    if (success) {
                        // إظهار إشعار النجاح
                        showCopyNotification(this, textToCopy);
                        
                        // تسجيل الحدث في Google Analytics إذا كان متوفراً
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'copy_contact', {
                                'event_category': 'engagement',
                                'event_label': textToCopy
                            });
                        }
                        
                        // تسجيل الحدث في console للتصحيح
                        console.log('تم نسخ: ' + cleanCopyText(textToCopy));
                    } else {
                        // فتح تطبيق التواصل المناسب
                        openContactApp(textToCopy);
                    }
                } catch (error) {
                    console.error('خطأ في النسخ:', error);
                    showErrorNotification(this);
                }
            });
            
            // تأثير عند التمرير فوق العنصر
            element.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    duration: 0.2,
                    scale: 1.02,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    ease: 'power2.out'
                });
            });
            
            element.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    duration: 0.2,
                    scale: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    ease: 'power2.out'
                });
            });
            
            // دعم لوحة المفاتيح
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    // دالة لفتح تطبيق التواصل المناسب عند فشل النسخ
    function openContactApp(text) {
        if (text.includes('@')) {
            // بريد إلكتروني
            window.location.href = `mailto:${cleanCopyText(text)}`;
        } else if (text.includes('+')) {
            // رقم هاتف
            window.location.href = `tel:${cleanCopyText(text)}`;
        } else {
            // عرض رسالة للمستخدم
            const message = currentLang === 'ar' 
                ? `فشل النسخ. يمكنك نسخ النص يدوياً:\n${cleanCopyText(text)}`
                : `Copy failed. You can copy manually:\n${cleanCopyText(text)}`;
            
            const copyMessage = document.createElement('div');
            copyMessage.className = 'copy-error-message';
            copyMessage.textContent = message;
            copyMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 9999;
                max-width: 90%;
                text-align: center;
            `;
            
            document.body.appendChild(copyMessage);
            
            // إزالة الرسالة بعد 3 ثوان
            setTimeout(() => {
                document.body.removeChild(copyMessage);
            }, 3000);
        }
    }
    
    // دالة لإظهار رسالة خطأ
    function showErrorNotification(element) {
        const errorMsg = document.createElement('div');
        errorMsg.textContent = currentLang === 'ar' ? 'خطأ في النسخ' : 'Copy Error';
        errorMsg.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: #e74c3c;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 0.8rem;
            white-space: nowrap;
            z-index: 100;
        `;
        
        element.appendChild(errorMsg);
        
        gsap.fromTo(errorMsg,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3 }
        );
        
        setTimeout(() => {
            gsap.to(errorMsg, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                onComplete: () => errorMsg.remove()
            });
        }, 2000);
    }
    
    // تحسين إمكانية الوصول
    function enhanceAccessibility() {
        document.querySelectorAll('.copyable').forEach(element => {
            // إضافة role و aria-label
            element.setAttribute('role', 'button');
            element.setAttribute('tabindex', '0');
            
            const text = element.getAttribute('data-copy') || element.textContent.trim();
            const cleanText = cleanCopyText(text);
            
            element.setAttribute('aria-label', 
                currentLang === 'ar' 
                    ? `نسخ ${cleanText}` 
                    : `Copy ${cleanText}`
            );
            
            // تحديث aria-label عند تغيير اللغة
            const observer = new MutationObserver(() => {
                element.setAttribute('aria-label', 
                    currentLang === 'ar' 
                        ? `نسخ ${cleanText}` 
                        : `Copy ${cleanText}`
                );
            });
            
            observer.observe(element, { 
                childList: true, 
                characterData: true, 
                subtree: true 
            });
        });
    }
    
    // تهيئة عناصر النسخ عند التحميل
    initializeCopyElements();
    enhanceAccessibility();
    
    // تحديث عناصر النسخ عند تغيير اللغة
    function updateCopyElementsOnLanguageChange() {
        document.querySelectorAll('.copy-notification').forEach(notification => {
            notification.textContent = currentLang === 'ar' ? 'تم النسخ!' : 'Copied!';
        });
        
        document.querySelectorAll('.copyable').forEach(element => {
            const text = element.getAttribute('data-copy') || element.textContent.trim();
            const cleanText = cleanCopyText(text);
            
            element.setAttribute('aria-label', 
                currentLang === 'ar' 
                    ? `نسخ ${cleanText}` 
                    : `Copy ${cleanText}`
            );
        });
    }
    
    // إضافة مستمع لتغيير اللغة
    const originalSwitchLanguage = switchLanguage;
    switchLanguage = function(lang) {
        originalSwitchLanguage(lang);
        updateCopyElementsOnLanguageChange();
    };
    
    // إعادة تهيئة عند إضافة عناصر جديدة ديناميكياً
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                initializeCopyElements();
                enhanceAccessibility();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
