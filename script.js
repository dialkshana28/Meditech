// ============================================
// MEDITECH - Complete JavaScript (CLEAN & FIXED)
// ============================================
document.addEventListener('DOMContentLoaded', function() {

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) preloader.classList.add('hidden');
        }, 800);
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    const scrollTop = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }
        if (scrollTop) {
            if (window.scrollY > 500) scrollTop.classList.add('active');
            else scrollTop.classList.remove('active');
        }
    });

    if (scrollTop) {
        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    function toggleMenu() {
        if (hamburger) hamburger.classList.toggle('active');
        if (navMenu) navMenu.classList.toggle('active');
        if (mobileOverlay) mobileOverlay.classList.toggle('active');
        if (navMenu) {
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        }
    }

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMenu);
    if (navMenu) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) toggleMenu();
            });
        });
    }

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // ===== CHATBOT =====
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    if (chatbotToggle) chatbotToggle.addEventListener('click', () => {
        if (chatbotWindow) chatbotWindow.classList.toggle('active');
    });
    if (chatbotClose) chatbotClose.addEventListener('click', () => {
        if (chatbotWindow) chatbotWindow.classList.remove('active');
    });

    const botResponses = {
        'price': '💰 Prices range from Rs. 53,300 to Rs. 416,000. Check Products page for discounts!',
        'delivery': '🚚 FREE island-wide delivery within 3-5 business days.',
        'warranty': '🛡️ Up to 5-year warranty on all medical beds and chairs.',
        'hospital bed': '🛏️ Electric beds from Rs. 113,750. Best seller: 5-Function at Rs. 213,750 (25% OFF!)',
        'wheelchair': '♿ Electric: Rs. 149,990 | Manual: Rs. 53,300. Both highly rated!',
        'contact': '📞 +94 76 942 3681 | 📧 info@meditech.lk | 📍 325, Singhapura, Hokandara',
        'hello': '👋 Welcome to MediTech! Ask about products, prices, delivery, or warranty.',
        'hi': '👋 Hi! How can I help you today?',
        'thanks': '😊 You\'re welcome! Contact us anytime.',
        'hours': '🕐 Mon-Sat: 9AM-7PM. Closed Sundays.',
        'rental': '🔄 Yes! We offer rental options for hospital beds. WhatsApp us at 076-881-5222 for details.'
    };

    function getBotResponse(msg) {
        msg = msg.toLowerCase();
        for (let key in botResponses) {
            if (msg.includes(key)) return botResponses[key];
        }
        return '🤔 Contact us at 076-881-5222 for assistance, or ask about: price, delivery, warranty, beds, wheelchairs, rental.';
    }

    function addMessage(text, type) {
        if (!chatMessages) return;
        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        if (!chatInput) return;
        const message = chatInput.value.trim();
        if (!message) return;
        addMessage(message, 'user');
        chatInput.value = '';
        setTimeout(() => addMessage(getBotResponse(message), 'bot'), 800);
    }

    if (chatSend) chatSend.addEventListener('click', sendMessage);
    if (chatInput) chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

    // ===== PRODUCT VIEW DETAILS TOGGLE =====
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');
            if (!card) return;
            const details = card.querySelector('.product-details');
            const icon = this.querySelector('i');
            const textSpan = this.querySelector('span');

            if (details && details.classList.contains('active')) {
                details.classList.remove('active');
                details.style.maxHeight = '0';
                if (icon) icon.style.transform = 'rotate(0deg)';
                if (textSpan) textSpan.textContent = 'View Details';
                this.classList.remove('active');
            } else if (details) {
                document.querySelectorAll('.product-details.active').forEach(openDetails => {
                    openDetails.classList.remove('active');
                    openDetails.style.maxHeight = '0';
                    const otherBtn = openDetails.parentElement.querySelector('.view-details-btn');
                    if (otherBtn) {
                        const otherIcon = otherBtn.querySelector('i');
                        const otherText = otherBtn.querySelector('span');
                        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                        if (otherText) otherText.textContent = 'View Details';
                        otherBtn.classList.remove('active');
                    }
                });

                details.classList.add('active');
                details.style.maxHeight = details.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(180deg)';
                if (textSpan) textSpan.textContent = 'Hide Details';
                this.classList.add('active');

                setTimeout(() => {
                    details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    });

    // ===== WHATSAPP ASK BUTTON =====
    function openWhatsApp(productName, type = 'ask') {
        const phone = '94768815222';
        let message = '';
        if (type === 'share') {
            message = `🔗 *Check out this product from MediTech:* \n\n*${productName}*\n\n🏥 MediTech Medical Furniture\n📍 325, Singhapura, Hokandara\n📞 076-942-3681\n💬 WhatsApp: 076-881-5222`;
        } else {
            message = `👋 Hi MediTech! I'm interested in:\n\n*${productName}*\n\nCould you please share more details, pricing, and availability? Thank you!`;
        }
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    function askAboutProduct(productName) {
        openWhatsApp(productName, 'ask');
    }
    window.askAboutProduct = askAboutProduct;

    // ===== SHARE MODAL FUNCTIONS =====
    let currentProductName = '';

    function openShareModal(productName) {
        currentProductName = productName;
        const modal = document.getElementById('shareModal');
        const urlElement = document.getElementById('shareProductUrl');
        if (!modal) return;
        const productUrl = window.location.href.split('#')[0];
        if (urlElement) urlElement.textContent = productUrl;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    window.openShareModal = openShareModal;

    function closeShareModal() {
        const modal = document.getElementById('shareModal');
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    window.closeShareModal = closeShareModal;

    function shareToFacebook() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Check out ${currentProductName} at MediTech - Premium Medical Equipment!`);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
        closeShareModal();
    }
    window.shareToFacebook = shareToFacebook;

    function shareToWhatsApp() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`🏥 Check out *${currentProductName}* at MediTech!\n\nPremium quality medical equipment.\n\n🔗 ${window.location.href}\n\n📞 Contact: 076-881-5222`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
        closeShareModal();
    }
    window.shareToWhatsApp = shareToWhatsApp;

    function copyToClipboard() {
        const url = window.location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                alert('✅ Link copied to clipboard!');
                closeShareModal();
            }).catch(() => fallbackCopy(url));
        } else {
            fallbackCopy(url);
        }
    }

    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            alert('✅ Link copied to clipboard!');
        } catch(err) {
            alert('❌ Could not copy link');
        }
        document.body.removeChild(textArea);
        closeShareModal();
    }
    window.copyToClipboard = copyToClipboard;

    const shareModal = document.getElementById('shareModal');
    if (shareModal) {
        shareModal.addEventListener('click', function(e) {
            if (e.target === this) closeShareModal();
        });
    }

    // ===== CATEGORY FILTER FUNCTIONALITY =====
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            const products = document.querySelectorAll('.product-card');
            const sections = document.querySelectorAll('.category-section');

            if (filter === 'all') {
                products.forEach(product => { product.classList.remove('filtered'); product.style.display = ''; });
                sections.forEach(section => { section.style.display = ''; });
            } else {
                products.forEach(product => {
                    const category = product.getAttribute('data-category');
                    if (category === filter) { product.classList.remove('filtered'); product.style.display = ''; }
                    else { product.classList.add('filtered'); product.style.display = 'none'; }
                });
                sections.forEach(section => {
                    const sectionCategory = section.getAttribute('data-category');
                    section.style.display = (sectionCategory === filter) ? '' : 'none';
                });
            }
            const productsSection = document.querySelector('.products-section');
            if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ===== ADD TO CART → WHATSAPP ORDER =====
    document.querySelectorAll('.product-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');
            if (!card) return;
            const name = card.querySelector('.product-name')?.textContent || 'Product';
            const original = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Ordering...';
            this.style.background = 'var(--success)';
            setTimeout(() => {
                const msg = `🛒 *NEW ORDER REQUEST*\n\n*Product:* ${name}\n\nPlease contact me to confirm pricing, delivery, and payment options. Thank you!`;
                window.open(`https://wa.me/94768815222?text=${encodeURIComponent(msg)}`, '_blank');
                setTimeout(() => {
                    this.innerHTML = original;
                    this.style.background = '';
                }, 500);
            }, 800);
        });
    });

    // ===== COUNTER ANIMATION =====
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            if (!target) return;
            let current = 0;
            const step = target / 125;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target.toLocaleString() + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString() + '+';
                }
            }, 16);
        });
    }

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        heroObserver.observe(heroSection);
    }

    // ===== FORM SUBMISSIONS =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('✅ Thank you! We\'ll contact you within 24 hours.');
            contactForm.reset();
        });
    }

    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('✅ Thank you for your feedback!');
            feedbackForm.reset();
        });
    }

    // ===== PRODUCT WISHLIST =====
    document.querySelectorAll('.product-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon && icon.classList.contains('fa-heart')) {
                icon.style.color = (icon.style.color === 'red') ? '' : 'red';
                this.style.background = (icon.style.color === 'red') ? 'rgba(231,76,60,0.1)' : '';
            }
        });
    });

    // ============================================
    // ☁️ CLOUD PRICE SYNC (Works on ALL pages safely)
    // ============================================
    const CLOUD_CONFIG = {
        READ_KEY: '$2a$10$BTcNAK7zgrXjnj0AIOoZnepXR0qgDUdrCH1KpSAqT/SJTYWHKvqga', // 🔑 Replace with JSONbin Read Key
  BIN_ID: '6a032124c0954111d810f38b'         // 📦 Replace with your JSONbin Bin ID
    };

    async function syncPricesFromCloud() {
        // Only run if product cards actually exist on this page
        const cards = document.querySelectorAll('.product-card');
        if (cards.length === 0) return;

        try {
            // ?t=${Date.now()} prevents browser caching so updates appear instantly
            const res = await fetch(`https://api.jsonbin.io/v3/b/${CLOUD_CONFIG.BIN_ID}/latest?t=${Date.now()}`, {
                headers: { 'X-Master-Key': CLOUD_CONFIG.READ_KEY }
            });
            if (!res.ok) throw new Error('Cloud fetch failed');

            const { record } = await res.json();
            const prices = record.products;

            cards.forEach((card, index) => {
                if (prices[index]) {
                    const oldEl = card.querySelector('.price-old');
                    const newEl = card.querySelector('.price-new');
                    const discEl = card.querySelector('.discount-tag');

                    if (oldEl) oldEl.textContent = `Rs. ${prices[index].old.toLocaleString()}`;
                    if (newEl) newEl.textContent = `Rs. ${prices[index].new.toLocaleString()}`;
                    if (discEl) discEl.textContent = `-${prices[index].discount}%`;
                }
            });
            console.log('✅ Prices synced from cloud');
        } catch (err) {
            console.warn('⚠️ Cloud sync skipped:', err.message);
        }
    }

    // Run sync safely after DOM is ready
    syncPricesFromCloud();
});
