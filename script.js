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

// --- 7. RETRO GİZLİ TERMINAL KODU ---
document.addEventListener('DOMContentLoaded', () => {
    const terminalModal = document.getElementById('terminalModal');
    const terminalToggleBtn = document.getElementById('terminalToggleBtn');
    const terminalCloseBtn = document.getElementById('terminalCloseBtn');
    const terminalInput = document.getElementById('terminalInput');
    const terminalBody = document.getElementById('terminalBody');
    const termPrompt = document.getElementById('termPrompt');

    // Gizli Şifren (Bunu dilediğin gibi değiştirebilirsin!)
    const SECRET_PASSWORD = "burak";
    let isAdminLoggedIn = false;

    // Terminal Aç/Kapat
    const openTerminal = () => {
        terminalModal.classList.add('open');
        terminalInput.focus();
    };

    const closeTerminal = () => {
        terminalModal.classList.remove('open');
    };

    terminalToggleBtn.addEventListener('click', openTerminal);
    terminalCloseBtn.addEventListener('click', closeTerminal);

    // Dışarıya veya ESC tuşuna basılınca kapatma
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && terminalModal.classList.contains('open')) {
            closeTerminal();
        }
    });

    // Satır Ekleme Yardımcısı
    const printLine = (text, type = '') => {
        const p = document.createElement('p');
        p.className = `term-line ${type}`;
        p.innerHTML = text;
        terminalBody.appendChild(p);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    };

    // Komut Çalıştırma Mantığı
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawInput = terminalInput.value.trim();
            const inputLower = rawInput.toLowerCase();
            const args = rawInput.split(' ');
            const command = args[0].toLowerCase();
            const param = args[1];

            if (rawInput === '') return;

            // Yazılan komutu ekrana bastır
            const currentPrompt = isAdminLoggedIn ? 'admin@xburak7:~$ ' : 'guest@xburak7:~$ ';
            printLine(currentPrompt + rawInput, 'term-cmd');
            terminalInput.value = '';

            // KOMUT KONTROLLERİ
            switch (command) {
                case 'help':
                    printLine("--- ERİŞİLEBİLİR KOMUTLAR ---", "term-sys");
                    printLine("<span class='term-secret'>help</span> - Komut listesini gösterir.");
                    printLine("<span class='term-secret'>videos</span> - Videolar bölümüne kaydırır.");
                    printLine("<span class='term-secret'>setup</span> - Ekipmanlar bölümüne kaydırır.");
                    printLine("<span class='term-secret'>clear</span> - Ekranı temizler.");
                    printLine("<span class='term-secret'>exit</span> - Terminali kapatır.");
                    
                    if (!isAdminLoggedIn) {
                        printLine("<span class='term-warn'>login &lt;şifre&gt;</span> - Geliştirici moduna giriş yapar.", "term-warn");
                    } else {
                        printLine("<span class='term-secret'>secret</span> - Özel geliştirici notları ve gizli bilgiler.", "term-secret");
                        printLine("<span class='term-secret'>stats</span> - Kanal detaylı analitiği.", "term-secret");
                        printLine("<span class='term-secret'>logout</span> - Admin oturumunu kapatır.");
                    }
                    break;

                case 'login':
                    if (isAdminLoggedIn) {
                        printLine("Zaten Admin modundasınız!", "term-warn");
                    } else if (param === SECRET_PASSWORD) {
                        isAdminLoggedIn = true;
                        termPrompt.innerText = "admin@xburak7:~$";
                        termPrompt.style.color = "#ff2a5f";
                        printLine(" [Erişim Onaylandı] Hoş geldin Burak! Admin modu aktif.", "term-secret");
                        printLine("Yeni açılan komutlar için 'help' yazabilirsin.", "term-sys");
                    } else {
                        printLine(" [Erişim Engellendi] Yanlış şifre!", "term-err");
                    }
                    break;

                case 'logout':
                    if (isAdminLoggedIn) {
                        isAdminLoggedIn = false;
                        termPrompt.innerText = "guest@xburak7:~$";
                        termPrompt.style.color = "#00ff66";
                        printLine("Admin oturumu kapatıldı.", "term-sys");
                    } else {
                        printLine("Zaten misafir modundasınız.", "term-warn");
                    }
                    break;

                case 'secret':
                    if (isAdminLoggedIn) {
                        printLine("--- GİZLİ GELİŞTİRİCİ NOTLARI ---", "term-secret");
                        printLine("• BurakOS projesi v2.0 altyapısı hazırlanıyor.");
                        printLine("• YouTube Video Factory Python betikleri sorunsuz çalışıyor.");
                        printLine("• Gizli Proje Linki: github.com/Boraloyoutube/secret-vault");
                    } else {
                        printLine("Bu komut için 'login' yapmalısınız!", "term-err");
                    }
                    break;

                case 'stats':
                    if (isAdminLoggedIn) {
                        printLine("--- KANAL ANALİTİK DETAYLARI ---", "term-secret");
                        printLine("• Abone Hedefi: %44 Tamamlandı");
                        printLine("• Aylık Toplam İzlenme: ~2.5M+");
                        printLine("• En Çok İzlenen İçerik Türü: Shorts");
                    } else {
                        printLine("Bu komut için 'login' yapmalısınız!", "term-err");
                    }
                    break;

                case 'videos':
                    closeTerminal();
                    document.getElementById('videos').scrollIntoView();
                    break;

                case 'setup':
                    closeTerminal();
                    document.getElementById('setup').scrollIntoView();
                    break;

                case 'clear':
                    terminalBody.innerHTML = '';
                    break;

                case 'exit':
                case 'quit':
                    closeTerminal();
                    break;

                default:
                    printLine(`Bilinmeyen komut: '${command}'. Komutlar için 'help' yazın.`, "term-err");
                    break;
            }
        }
    });
});
