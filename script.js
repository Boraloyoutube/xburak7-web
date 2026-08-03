document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBİL MENÜ ELEMANLARI VE KONTROLÜ ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-links a');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Menü linkine tıklandığında menüyü kapat
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- 2. SAYFA KAYDIRILDIĞINDA NAVBAR GÖLGESİ VE AKTİF LİNK ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.7)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Kaydırmaya bağlı aktif link güncelleme
        let currentSection = '';
        const sections = document.querySelectorAll('section, header');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // --- 3. CANLI İSTATİSTİK SAYAÇ ANİMASYONU ---
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200; // Sayma hızı çarpanı

            const updateCount = () => {
                const count = +counter.innerText.replace('+', '');
                const inc = Math.ceil(target / speed);

                if (count < target) {
                    counter.innerText = (count + inc).toLocaleString() + '+';
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target.toLocaleString() + '+';
                }
            };

            updateCount();
        });
    };

    // Sayaçların ekrana geldiğinde çalışması
    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-container');
        if (statsSection) {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight;

            if (sectionPos < screenPos && !hasAnimated) {
                animateCounters();
                hasAnimated = true;
            }
        }
    });

    // --- 4. VİDEO FİLTRELEME SİSTEMİ ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktif buton stilini değiştir
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            videoCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 5. SSS AKORDİYON (FAQ ACCORDION) ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Diğer açık soruları kapat
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Seçilen soruyu aç/kapat
            item.classList.toggle('active');
        });
    });

    // --- 6. TOAST BİLDİRİM FONKSİYONU ---
    window.showToast = function(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.innerText = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    };
});