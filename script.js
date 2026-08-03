document.addEventListener('DOMContentLoaded', () = {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-links a');

     Mobil Menü Açma  Kapama
    hamburger.addEventListener('click', () = {
        navLinks.classList.toggle('active');
        
         İkonu değiştir (Hamburger - Çarpı)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

     Menüdeki bir linke tıklandığında menüyü kapat
    links.forEach(link = {
        link.addEventListener('click', () = {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

     Sayfa kaydırıldığında Navbar Gölgesi Ekleme
    window.addEventListener('scroll', () = {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY  50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});