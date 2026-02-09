// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Cursor trail effect
    let cursorDots = [];
    const maxDots = 15;
    
    for (let i = 0; i < maxDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);
        cursorDots.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    let dotPositions = Array(maxDots).fill().map(() => ({ x: 0, y: 0 }));
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateDots() {
        dotPositions[0].x = mouseX;
        dotPositions[0].y = mouseY;
        
        for (let i = 0; i < maxDots; i++) {
            if (i > 0) {
                dotPositions[i].x += (dotPositions[i - 1].x - dotPositions[i].x) * 0.3;
                dotPositions[i].y += (dotPositions[i - 1].y - dotPositions[i].y) * 0.3;
            }
            
            cursorDots[i].style.left = dotPositions[i].x + 'px';
            cursorDots[i].style.top = dotPositions[i].y + 'px';
            cursorDots[i].style.opacity = 1 - (i / maxDots);
            cursorDots[i].style.transform = `scale(${1 - (i / maxDots) * 0.5})`;
        }
        
        requestAnimationFrame(animateDots);
    }
    
    animateDots();
    
    // Header animation
    gsap.from('header', {
        duration: 1.5,
        y: -100,
        opacity: 0,
        ease: 'bounce.out'
    });
    
    gsap.from('header h1:first-child', {
        duration: 1,
        scale: 0,
        rotation: 360,
        delay: 0.5,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('header h1:last-of-type', {
        duration: 1,
        scale: 0,
        rotation: -360,
        delay: 0.7,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('header p', {
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 1,
        ease: 'power3.out'
    });
    
    // Split text animation for headers
    const splitText = (element) => {
        const text = element.textContent;
        element.textContent = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            element.appendChild(span);
            
            gsap.from(span, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                duration: 0.5,
                opacity: 0,
                y: 50,
                rotation: Math.random() * 20 - 10,
                delay: index * 0.05,
                ease: 'back.out(1.7)'
            });
        });
    };
    
    // Animate section headings
    document.querySelectorAll('section h2').forEach(h2 => {
        splitText(h2);
    });
    
    // Section animations with ScrollTrigger
    gsap.utils.toArray('section').forEach((section, index) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                end: 'top 20%',
                toggleActions: 'play none none reverse',
                scrub: 1
            },
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Floating animation
        gsap.to(section, {
            y: -15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.2
        });
    });
    
    // List items animation
    gsap.utils.toArray('ul li').forEach((li, index) => {
        gsap.from(li, {
            scrollTrigger: {
                trigger: li,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
        
        // Hover animation
        li.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        li.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Paragraph animations
    gsap.utils.toArray('section p').forEach(p => {
        gsap.from(p, {
            scrollTrigger: {
                trigger: p,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Create floating particles
    function createParticles() {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = Math.random() * 5 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(255, 255, 255, 0.5)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '5';
            
            document.body.appendChild(particle);
            
            gsap.set(particle, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            });
            
            gsap.to(particle, {
                y: '-=100',
                x: '+=' + (Math.random() * 100 - 50),
                duration: Math.random() * 3 + 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 2
            });
            
            gsap.to(particle, {
                opacity: Math.random() * 0.5 + 0.3,
                duration: Math.random() * 2 + 1,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }
    
    createParticles();
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: target,
                    ease: 'power3.inOut'
                });
            }
        });
    });
    
    // Parallax effect on scroll
    gsap.to('body::before', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        },
        y: 100,
        ease: 'none'
    });
    
    // Contact section special effect
    const contactSection = document.querySelector('section:last-child');
    if (contactSection) {
        gsap.from(contactSection, {
            scrollTrigger: {
                trigger: contactSection,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
        });
    }
    
    // Add sparkle effect on skill items hover
    document.querySelectorAll('ul li').forEach(li => {
        li.addEventListener('click', function() {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = '10px';
            sparkle.style.height = '10px';
            sparkle.style.background = '#ffd93d';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            
            const rect = this.getBoundingClientRect();
            sparkle.style.left = rect.left + rect.width / 2 + 'px';
            sparkle.style.top = rect.top + rect.height / 2 + 'px';
            
            document.body.appendChild(sparkle);
            
            gsap.to(sparkle, {
                scale: 3,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                onComplete: () => sparkle.remove()
            });
        });
    });
    
    // Refresh ScrollTrigger on window resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
    
    console.log('🚀 Portfolio loaded with GSAP magic!');
});
