document.addEventListener('DOMContentLoaded', () => {
    // Slider functionality
    const slides = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let autoSlideInterval;
    
    function updateSlides() {
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideItems.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
        updateSlides();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    slides.addEventListener('mouseenter', stopAutoSlide);
    slides.addEventListener('mouseleave', startAutoSlide);
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
    });
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
    });

    // Initialize slider
    updateSlides();
    startAutoSlide();

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal animations
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    document.querySelectorAll('.card, .content, .header, .sub-header').forEach(element => {
        element.classList.add('reveal');
    });
});

