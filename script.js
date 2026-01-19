document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.dot');
    const backgroundPattern = document.querySelector('.background-pattern');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const licensePlate = document.querySelector('.license-plate');

    // Hero section slide functionality
    function changeSlide(dot) {
        // Remove active class from all dots
        dots.forEach(d => d.classList.remove('active'));
        
        // Add active class to clicked dot
        dot.classList.add('active');
        
        // Get data from dot
        const imageUrl = dot.getAttribute('data-image');
        const title = dot.getAttribute('data-title');
        const subtitle = dot.getAttribute('data-subtitle');
        const plate = dot.getAttribute('data-plate');
        
        // Add transitioning class for fade effect
        backgroundPattern.classList.add('transitioning');
        
        // Update after fade out
        setTimeout(() => {
            // Update background image
            backgroundPattern.style.backgroundImage = `url('${imageUrl}')`;
            
            // Update text content
            heroTitle.textContent = title;
            heroSubtitle.textContent = subtitle;
            licensePlate.textContent = plate;
            
            // Remove transitioning class for fade in
            backgroundPattern.classList.remove('transitioning');
        }, 400);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            changeSlide(this);
        });
    });

    // Product showcase carousel with lazy-loaded video on hover
    const carouselCards = document.querySelectorAll('.carousel-card');

    carouselCards.forEach(card => {
        const video = card.querySelector('.card-video');
        const videoSrc = card.getAttribute('data-video');
        let videoLoaded = false;
        
        if (!video || !videoSrc) return;

        card.addEventListener('mouseenter', () => {
            // Load video hanya saat pertama kali hover
            if (!videoLoaded && video.children.length === 0) {
                const source = document.createElement('source');
                source.src = videoSrc;
                source.type = 'video/mp4';
                video.appendChild(source);
                video.load();
                videoLoaded = true;
            }

            // Tampilkan video dan mainkan
            video.style.display = 'block';
            video.currentTime = 0;
            
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Video berhasil dimainkan
                    })
                    .catch(error => {
                        console.warn('Video play error:', error);
                    });
            }
        });

        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
            video.style.display = 'none';
        });
    });


    // Auto-slide functionality (optional: uncomment to enable)
    // let currentDotIndex = 0;
    // setInterval(() => {
    //     currentDotIndex = (currentDotIndex + 1) % dots.length;
    //     changeSlide(dots[currentDotIndex]);
    // }, 5000);
});

