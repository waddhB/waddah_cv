// PENCIL LOADER - JavaScript معزول
(function() {
    'use strict';
    
    // المتغيرات الداخلية
    var PENCIL_LOADER_ELEMENT = null;
    var PENCIL_TEXT_ELEMENT = null;
    var PENCIL_MESSAGE_INTERVAL = null;
    var PENCIL_IS_INITIALIZED = false;
    
    // رسائل التحميل
    var PENCIL_MESSAGES = [
        "جاري تحميل الموقع...",
        "جاري إعداد المحتوى...",
        "جاري تحميل الصور...",
        "جاري تهيئة البيانات...",
        "شكراً لانتظارك!"
    ];
    
    // دالة التهيئة
    function PENCIL_INIT_LOADER() {
        if (PENCIL_IS_INITIALIZED) return;
        
        PENCIL_LOADER_ELEMENT = document.getElementById('PENCIL_LOADER_MAIN');
        PENCIL_TEXT_ELEMENT = document.getElementById('PENCIL_LOADER_TEXT');
        
        if (!PENCIL_LOADER_ELEMENT) {
            console.warn('PENCIL LOADER: لم يتم العثور على عنصر شاشة التحميل');
            return;
        }
        
        PENCIL_IS_INITIALIZED = true;
        
        // بدء تغيير الرسائل
        PENCIL_START_MESSAGES();
        
        // إخفاء تلقائي بعد تحميل الصفحة
        window.addEventListener('load', function() {
            setTimeout(PENCIL_HIDE_LOADER, 800);
        });
        
        // خيار: إخفاء بعد 10 ثواني كحد أقصى (فالسة أمان)
        setTimeout(function() {
            if (PENCIL_IS_INITIALIZED && 
                !PENCIL_LOADER_ELEMENT.classList.contains('PENCIL_LOADER_HIDDEN')) {
                PENCIL_HIDE_LOADER();
            }
        }, 10000);
    }
    
    // بدء تغيير الرسائل
    function PENCIL_START_MESSAGES() {
        if (!PENCIL_IS_INITIALIZED || !PENCIL_TEXT_ELEMENT) return;
        
        var PENCIL_MESSAGE_INDEX = 0;
        
        // تنظيف أي فاصل سابق
        if (PENCIL_MESSAGE_INTERVAL) {
            clearInterval(PENCIL_MESSAGE_INTERVAL);
        }
        
        // تعيين الرسالة الأولى
        PENCIL_TEXT_ELEMENT.textContent = PENCIL_MESSAGES[PENCIL_MESSAGE_INDEX];
        
        // بدء الفاصل الزمني لتغيير الرسائل
        PENCIL_MESSAGE_INTERVAL = setInterval(function() {
            PENCIL_MESSAGE_INDEX = (PENCIL_MESSAGE_INDEX + 1) % PENCIL_MESSAGES.length;
            if (PENCIL_TEXT_ELEMENT) {
                PENCIL_TEXT_ELEMENT.textContent = PENCIL_MESSAGES[PENCIL_MESSAGE_INDEX];
            }
        }, 1200);
    }
    
    // إظهار شاشة التحميل
    function PENCIL_SHOW_LOADER() {
        if (!PENCIL_IS_INITIALIZED) PENCIL_INIT_LOADER();
        
        if (PENCIL_LOADER_ELEMENT) {
            PENCIL_LOADER_ELEMENT.classList.remove('PENCIL_LOADER_HIDDEN');
            PENCIL_START_MESSAGES();
        }
    }
    
    // إخفاء شاشة التحميل
    function PENCIL_HIDE_LOADER() {
        if (!PENCIL_IS_INITIALIZED) return;
        
        if (PENCIL_LOADER_ELEMENT) {
            PENCIL_LOADER_ELEMENT.classList.add('PENCIL_LOADER_HIDDEN');
            
            // إيقاف تغيير الرسائل
            if (PENCIL_MESSAGE_INTERVAL) {
                clearInterval(PENCIL_MESSAGE_INTERVAL);
                PENCIL_MESSAGE_INTERVAL = null;
            }
        }
    }
    
    // تهيئة تلقائية عند تحميل DOM
    document.addEventListener('DOMContentLoaded', PENCIL_INIT_LOADER);
    
    // جعل الدوال متاحة عالمياً
    window.PENCIL_LOADER = {
        show: PENCIL_SHOW_LOADER,
        hide: PENCIL_HIDE_LOADER,
        init: PENCIL_INIT_LOADER,
        setMessages: function(messages) {
            if (Array.isArray(messages) && messages.length > 0) {
                PENCIL_MESSAGES = messages;
                if (PENCIL_IS_INITIALIZED) {
                    PENCIL_START_MESSAGES();
                }
            }
        }
    };
    
})();

document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);
        gsap.from('.navbar', {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: 'power3.out'
    });
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
        gsap.from('.floating-element', {
        duration: 1,
        scale: 0,
        opacity: 0,
        stagger: 0.3,
        delay: 1.5,
        ease: 'back.out(1.7)'
    });
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
    const langArBtn = document.getElementById('lang-ar');
    const langEnBtn = document.getElementById('lang-en');
    const body = document.body;
    let currentLang = 'ar';
    function switchLanguage(lang) {
        currentLang = lang;
        if (lang === 'ar') {
            body.setAttribute('dir', 'rtl');
            body.style.textAlign = 'right';
            document.documentElement.lang = 'ar';
        } else {
            body.setAttribute('dir', 'ltr');
            body.style.textAlign = 'left';
            document.documentElement.lang = 'en';
        }
        document.querySelectorAll('[data-en]').forEach(element => {
            if (lang === 'en') {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = element.getAttribute('data-en');
                } else {
                    if (!element.hasAttribute('data-ar')) {
                        element.setAttribute('data-ar', element.textContent);
                    }
                    element.textContent = element.getAttribute('data-en');
                }
            } else {
                if (element.hasAttribute('data-ar')) {
                    element.textContent = element.getAttribute('data-ar');
                }
            }
        });
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
        if (lang === 'en') {
            document.title = "CV | Waddah Bassah - Mechatronics Engineer";
        } else {
            document.title = "السيرة الذاتية | وضاح بصه - مهندس ميكاترونكس";
        }
        const marqueeTrack = document.querySelector('.marquee-track');
        if (marqueeTrack) {
            if (lang === 'ar') {
                marqueeTrack.style.animation = 'marquee-rtl 30s linear infinite';
            } else {
                marqueeTrack.style.animation = 'marquee-ltr 30s linear infinite';
            }
        }
    }
    document.querySelectorAll('[data-en]').forEach(element => {
        if (!element.hasAttribute('data-ar')) {
            element.setAttribute('data-ar', element.textContent);
        }
    });
    document.querySelectorAll('.nav-link[data-en]').forEach(link => {
        if (!link.hasAttribute('data-ar')) {
            link.setAttribute('data-ar', link.textContent);
        }
    });
    langArBtn.addEventListener('click', () => switchLanguage('ar'));
    langEnBtn.addEventListener('click', () => switchLanguage('en'));
    switchLanguage('ar');
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
    window.addEventListener('load', function() {
        gsap.to('body', {
            duration: 0.5,
            opacity: 1,
            ease: 'power2.out'
        });
    });
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
    function copyToClipboard(text) {
        const cleanText = cleanCopyText(text);
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
            return Promise.resolve(fallbackCopy(cleanText));
        }
    }
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 99999); 
        let success = false;
        try {
            success = document.execCommand('copy');
            console.log('تم النسخ باستخدام execCommand: ' + text);
        } catch (err) {
            console.error('فشل النسخ باستخدام execCommand: ', err);
        }
        document.body.removeChild(textarea);
        return success;
    }
    
    function cleanCopyText(text) {
        return text
            .replace('تم النسخ!', '')
            .replace('Copied!', '')
            .replace('📋', '')
            .replace('+967-', '+967') // إزالة الشرطة من رقم الهاتف
            .replace(/\s+/g, ' ') // استبدال المسافات المتعددة بمسافة واحدة
            .trim();
    }
    
    function showCopyNotification(element, text) {
        const notification = element.querySelector('.copy-notification');
        if (!notification) return;
        notification.textContent = currentLang === 'ar' ? 'تم النسخ!' : 'Copied!';
        notification.classList.add('show');
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
        gsap.to(element, {
            duration: 0.1,
            x: 3,
            yoyo: true,
            repeat: 3,
            ease: 'power2.inOut'
        });
        gsap.to(element, {
            duration: 0.2,
            backgroundColor: 'rgba(52, 152, 219, 0.3)',
            borderColor: 'var(--secondary-color)',
            ease: 'power2.out'
        });
        const originalContent = element.innerHTML;
        element.innerHTML = element.innerHTML.replace('📋', '✓');
        setTimeout(() => {
            notification.classList.remove('show');
            gsap.to(element, {
                duration: 0.5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'transparent',
                ease: 'power2.out'
            });
            setTimeout(() => {
                element.innerHTML = originalContent.replace('✓', '📋');
            }, 500);
        }, 1500);
        
        playCopySound();
    }
    function playCopySound() {
        try {
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
            console.log('Web Audio API غير مدعوم في هذا المتصفح');
        }
    }
    
    function initializeCopyElements() {
        document.querySelectorAll('.copyable').forEach(element => {
            element.style.cursor = 'pointer';
            
            if (element.hasAttribute('data-copy-initialized')) {
                return;
            }
            
            element.setAttribute('data-copy-initialized', 'true');
            
            element.addEventListener('click', async function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const textToCopy = this.getAttribute('data-copy') || this.textContent.trim();
                
                try {
                    const success = await copyToClipboard(textToCopy);
                    
                    if (success) {
                        showCopyNotification(this, textToCopy);
                        
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'copy_contact', {
                                'event_category': 'engagement',
                                'event_label': textToCopy
                            });
                        }
                        
                        console.log('تم نسخ: ' + cleanCopyText(textToCopy));
                    } else {
                        openContactApp(textToCopy);
                    }
                } catch (error) {
                    console.error('خطأ في النسخ:', error);
                    showErrorNotification(this);
                }
            });
            
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
            
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    function openContactApp(text) {
        if (text.includes('@')) {
            window.location.href = `mailto:${cleanCopyText(text)}`;
        } else if (text.includes('+')) {
            window.location.href = `tel:${cleanCopyText(text)}`;
        } else {
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
            
            setTimeout(() => {
                document.body.removeChild(copyMessage);
            }, 3000);
        }
    }
    
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
    
    function enhanceAccessibility() {
        document.querySelectorAll('.copyable').forEach(element => {
            element.setAttribute('role', 'button');
            element.setAttribute('tabindex', '0');
            
            const text = element.getAttribute('data-copy') || element.textContent.trim();
            const cleanText = cleanCopyText(text);
            
            element.setAttribute('aria-label', 
                currentLang === 'ar' 
                    ? `نسخ ${cleanText}` 
                    : `Copy ${cleanText}`
            );
            
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
    
    initializeCopyElements();
    enhanceAccessibility();
    
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
    
    const originalSwitchLanguage = switchLanguage;
    switchLanguage = function(lang) {
        originalSwitchLanguage(lang);
        updateCopyElementsOnLanguageChange();
    };
    
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

