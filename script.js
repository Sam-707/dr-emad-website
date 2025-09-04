// Revolutionary Quantum JavaScript Framework for Dr. Emad Rashad
// Pushing the boundaries of web experiences

class QuantumExperience {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.particles = [];
        this.scrollProgress = 0;
        this.isMouseMoving = false;
        this.lastMouseMove = 0;
        
        this.init();
    }

    init() {
        this.setupQuantumCursor();
        this.initializePreloader();
        this.setupParticleSystem();
        this.initializeCounters();
        this.setupScrollAnimations();
        this.initializeNavigation();
        this.setupQuantumButtons();
        this.initializeAIRecommendations();
        this.setupCosmicCanvas();
        this.initializeHolographicElements();
        this.setupMagneticEffects();
        this.initializeTiltEffects();
        this.setupQuantumInteractions();
        this.initializeWaveAnimations();
    }

    // Revolutionary Custom Cursor
    setupQuantumCursor() {
        // Create cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'cursor-follower';
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        // Mouse tracking
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            this.cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
            
            this.isMouseMoving = true;
            this.lastMouseMove = Date.now();
            
            // Clear timeout for mouse idle
            clearTimeout(this.mouseIdleTimeout);
            this.mouseIdleTimeout = setTimeout(() => {
                this.isMouseMoving = false;
            }, 100);
        });

        // Smooth follower animation
        const animateFollower = () => {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;
            
            followerX += dx * 0.1;
            followerY += dy * 0.1;
            
            this.cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .course-card, .testimonial-star, .thought-bubble');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform += ' scale(1.5)';
                this.cursorFollower.style.transform += ' scale(1.2)';
                this.cursorFollower.style.borderColor = 'rgba(102, 126, 234, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = this.cursor.style.transform.replace(' scale(1.5)', '');
                this.cursorFollower.style.transform = this.cursorFollower.style.transform.replace(' scale(1.2)', '');
                this.cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            });
        });
    }

    // Quantum Preloader
    initializePreloader() {
        const preloader = document.getElementById('preloader');
        
        // Simulate loading experience
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                this.startQuantumAnimations();
            }, 500);
        }, 2000);
    }

    // WebGL Particle System
    setupParticleSystem() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Create particle geometry
        const particleCount = 300;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;
            
            colors[i] = Math.random();
            colors[i + 1] = Math.random();
            colors[i + 2] = Math.random();
            
            velocities[i] = (Math.random() - 0.5) * 0.02;
            velocities[i + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i + 2] = (Math.random() - 0.5) * 0.02;
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Particle material
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);

        camera.position.z = 5;

        // Animation loop
        const animateParticles = () => {
            const positions = particleSystem.geometry.attributes.position.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];
                
                // Boundary wrapping
                if (positions[i] > 10) positions[i] = -10;
                if (positions[i] < -10) positions[i] = 10;
                if (positions[i + 1] > 10) positions[i + 1] = -10;
                if (positions[i + 1] < -10) positions[i + 1] = 10;
                if (positions[i + 2] > 10) positions[i + 2] = -10;
                if (positions[i + 2] < -10) positions[i + 2] = 10;
            }
            
            particleSystem.geometry.attributes.position.needsUpdate = true;
            particleSystem.rotation.y += 0.001;
            
            renderer.render(scene, camera);
            requestAnimationFrame(animateParticles);
        };
        
        animateParticles();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // Quantum Number Counters
    initializeCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.dataset.stat || counter.textContent.replace(/[^\d]/g, ''));
            let current = 0;
            const increment = target / 100;
            const duration = 2000;
            const stepTime = duration / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (target >= 1000) {
                    counter.textContent = (current / 1000).toFixed(1) + 'k';
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, stepTime);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    // Revolutionary Scroll Animations
    setupScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Hero parallax
        gsap.to('.hero-content', {
            y: 100,
            opacity: 0.8,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        // Floating orbs parallax
        gsap.to('.orb-1', {
            y: 200,
            x: 100,
            rotate: 360,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 2
            }
        });

        gsap.to('.orb-2', {
            y: -150,
            x: -80,
            rotate: -180,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            }
        });

        // Section reveal animations
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            gsap.fromTo(section, 
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Course cards stagger animation
        const courseCards = document.querySelectorAll('.course-dimension, .course-sphere');
        gsap.fromTo(courseCards,
            { y: 80, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.courses-multiverse',
                    start: 'top 70%'
                }
            }
        );
    }

    // Floating Navigation
    initializeNavigation() {
        const nav = document.getElementById('navbar');
        const navItems = document.querySelectorAll('.nav-item');
        
        // Smooth nav reveal
        gsap.fromTo(nav,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 2.5 }
        );

        // Active section tracking
        const sections = document.querySelectorAll('section');
        
        const updateActiveNav = () => {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navItems.forEach(item => item.classList.remove('active'));
                    const targetItem = document.querySelector(`.nav-item[href="#${section.id}"]`);
                    if (targetItem) targetItem.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveNav);

        // Smooth scrolling
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    gsap.to(window, { duration: 1, scrollTo: target, ease: "power2.inOut" });
                }
            });
        });
    }

    // Quantum Button Effects
    setupQuantumButtons() {
        const quantumButtons = document.querySelectorAll('.btn-quantum, .enroll-btn, .contact-btn');
        
        quantumButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                // Create particle explosion effect
                this.createButtonParticles(button);
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            button.addEventListener('click', () => {
                // Quantum ripple effect
                this.createQuantumRipple(button);
            });
        });
    }

    // AI Recommendation System
    initializeAIRecommendations() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const courseCards = document.querySelectorAll('.course-dimension, .course-sphere');
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const category = button.dataset.category;
                
                // Animate AI recommendation
                this.animateAIRecommendation(category);
                
                // Filter and animate courses
                this.filterCourses(category, courseCards);
            });
        });
    }

    // Cosmic Canvas Background
    setupCosmicCanvas() {
        const cosmicCanvas = document.getElementById('cosmic-canvas');
        if (!cosmicCanvas) return;

        const ctx = cosmicCanvas.getContext('2d');
        cosmicCanvas.width = window.innerWidth;
        cosmicCanvas.height = window.innerHeight;

        const stars = [];
        const starCount = 200;

        // Create stars
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * cosmicCanvas.width,
                y: Math.random() * cosmicCanvas.height,
                radius: Math.random() * 2,
                opacity: Math.random(),
                speed: Math.random() * 0.5,
                direction: Math.random() * Math.PI * 2
            });
        }

        const animateStars = () => {
            ctx.clearRect(0, 0, cosmicCanvas.width, cosmicCanvas.height);
            
            stars.forEach(star => {
                star.x += Math.cos(star.direction) * star.speed;
                star.y += Math.sin(star.direction) * star.speed;
                
                // Wrap around screen
                if (star.x > cosmicCanvas.width) star.x = 0;
                if (star.x < 0) star.x = cosmicCanvas.width;
                if (star.y > cosmicCanvas.height) star.y = 0;
                if (star.y < 0) star.y = cosmicCanvas.height;
                
                // Twinkle effect
                star.opacity += (Math.random() - 0.5) * 0.02;
                star.opacity = Math.max(0, Math.min(1, star.opacity));
                
                // Draw star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animateStars);
        };
        
        animateStars();

        // Handle resize
        window.addEventListener('resize', () => {
            cosmicCanvas.width = window.innerWidth;
            cosmicCanvas.height = window.innerHeight;
        });
    }

    // Holographic Text Effects
    initializeHolographicElements() {
        const holographicElements = document.querySelectorAll('.holographic-title, .logo.holographic, .ai-title');
        
        holographicElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.textShadow = '0 0 20px rgba(102, 126, 234, 0.8), 0 0 40px rgba(243, 148, 251, 0.6)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.textShadow = '';
            });
        });
    }

    // Magnetic Effects
    setupMagneticEffects() {
        const magneticElements = document.querySelectorAll('.btn-quantum, .course-sphere, .testimonial-star');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const moveX = x * force * 0.3;
                    const moveY = y * force * 0.3;
                    
                    gsap.to(element, {
                        x: moveX,
                        y: moveY,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });
    }

    // 3D Tilt Effects
    initializeTiltEffects() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        if (window.VanillaTilt) {
            VanillaTilt.init(tiltElements, {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.2
            });
        }
    }

    // Quantum Interactions
    setupQuantumInteractions() {
        // Thought bubbles interaction
        const thoughtBubbles = document.querySelectorAll('.thought-bubble');
        thoughtBubbles.forEach(bubble => {
            bubble.addEventListener('click', () => {
                const thought = bubble.dataset.thought;
                this.showQuantumTooltip(bubble, thought);
            });
        });

        // Course preview interactions
        const previewButtons = document.querySelectorAll('.preview-btn');
        previewButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.showCoursePreview(button);
            });
        });

        // Testimonial star interactions
        const testimonialStars = document.querySelectorAll('.testimonial-star');
        testimonialStars.forEach(star => {
            star.addEventListener('click', () => {
                this.showTestimonialDetail(star);
            });
        });
    }

    // Wave Animation System
    initializeWaveAnimations() {
        const waveElements = document.querySelectorAll('.consciousness-waves, .avatar-rings');
        
        waveElements.forEach(element => {
            const waves = element.querySelectorAll('.ring, .consciousness-waves::before, .consciousness-waves::after');
            
            gsap.to(waves, {
                scale: 1.2,
                opacity: 0,
                duration: 2,
                repeat: -1,
                stagger: 0.3,
                ease: "power2.out"
            });
        });
    }

    // Helper Methods
    createButtonParticles(button) {
        const rect = button.getBoundingClientRect();
        const particleCount = 10;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'rgba(102, 126, 234, 0.8)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10000';
            
            particle.style.left = rect.left + rect.width / 2 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';
            
            document.body.appendChild(particle);
            
            gsap.to(particle, {
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                opacity: 0,
                scale: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: () => {
                    document.body.removeChild(particle);
                }
            });
        }
    }

    createQuantumRipple(button) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        
        button.appendChild(ripple);
        
        gsap.to(ripple, {
            width: '300px',
            height: '300px',
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                button.removeChild(ripple);
            }
        });
    }

    animateAIRecommendation(category) {
        const aiAvatar = document.querySelector('.ai-avatar');
        const aiMessage = document.querySelector('.ai-description');
        
        // Pulse AI avatar
        gsap.to(aiAvatar, {
            scale: 1.1,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
        
        // Update AI message based on category
        const messages = {
            transformation: 'تحليل شخصيتك... أرى أنك مستعد للتحول الجذري',
            relationships: 'أشعر بطاقة إيجابية... علاقاتك ستتحسن بشكل مذهل',
            healing: 'طاقة الشفاء تحيط بك... رحلة التعافي ستكون رائعة',
            success: 'أرى إمكانيات لامحدودة... النجاح ينتظرك'
        };
        
        // Typing effect for AI message
        this.typeWriterEffect(aiMessage, messages[category] || messages.transformation);
    }

    filterCourses(category, courseCards) {
        courseCards.forEach((card, index) => {
            const cardCategory = card.dataset.category;
            const shouldShow = category === 'all' || cardCategory === category || !cardCategory;
            
            if (shouldShow) {
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "power3.out"
                });
            } else {
                gsap.to(card, {
                    opacity: 0.3,
                    scale: 0.9,
                    y: 20,
                    duration: 0.4,
                    ease: "power2.in"
                });
            }
        });
    }

    typeWriterEffect(element, text) {
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
            }
        }, 50);
    }

    showQuantumTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'quantum-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 20px;
            font-size: 14px;
            backdrop-filter: blur(10px);
            z-index: 10000;
            pointer-events: none;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        gsap.fromTo(tooltip,
            { opacity: 0, y: 10, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
        );
        
        setTimeout(() => {
            gsap.to(tooltip, {
                opacity: 0,
                y: -10,
                scale: 0.8,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    document.body.removeChild(tooltip);
                }
            });
        }, 3000);
    }

    showCoursePreview(button) {
        // Create immersive preview overlay
        const overlay = document.createElement('div');
        overlay.className = 'preview-overlay-modal';
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(20px);
        `;
        
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 32px;
            padding: 48px;
            max-width: 600px;
            text-align: center;
            backdrop-filter: blur(20px);
        `;
        
        modal.innerHTML = `
            <h3 style="color: white; font-size: 32px; margin-bottom: 20px; background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">معاينة ثلاثية الأبعاد</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 18px; margin-bottom: 30px;">تجربة تعليمية تفاعلية بتقنية الواقع الافتراضي</p>
            <div style="display: flex; gap: 20px; justify-content: center;">
                <button class="btn-quantum primary" onclick="this.closest('.preview-overlay-modal').remove()">ابدأ التجربة</button>
                <button class="btn-quantum secondary" onclick="this.closest('.preview-overlay-modal').remove()">إغلاق</button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        gsap.fromTo(overlay,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.out" }
        );
        
        gsap.fromTo(modal,
            { scale: 0.8, y: 50 },
            { scale: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
    }

    showTestimonialDetail(star) {
        const testimonial = star.dataset.testimonial;
        const testimonials = {
            sarah: {
                name: 'سارة محمد',
                text: 'تغيرت حياتي المهنية بالكامل بعد كورس د. عماد. من موظفة عادية إلى قائدة فريق ناجحة!',
                rating: '⭐⭐⭐⭐⭐'
            },
            ahmed: {
                name: 'أحمد علي',
                text: 'شُفيت من الاكتئاب الذي عانيت منه لسنوات. أساليب د. عماد مذهلة وفعالة جداً!',
                rating: '⭐⭐⭐⭐⭐'
            },
            mona: {
                name: 'منى حسن',
                text: 'أنقذ د. عماد زواجي من الانهيار. تعلمت كيف أتواصل مع زوجي بطريقة صحيحة.',
                rating: '⭐⭐⭐⭐⭐'
            }
        };
        
        const data = testimonials[testimonial];
        if (!data) return;
        
        // Create testimonial modal similar to course preview
        const overlay = document.createElement('div');
        overlay.className = 'testimonial-modal';
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(20px);
        `;
        
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 32px;
            padding: 48px;
            max-width: 500px;
            text-align: center;
            backdrop-filter: blur(20px);
        `;
        
        modal.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 20px;">${data.rating}</div>
            <h3 style="color: white; font-size: 24px; margin-bottom: 16px;">${data.name}</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 16px; line-height: 1.6; margin-bottom: 30px;">"${data.text}"</p>
            <button class="btn-quantum primary" onclick="this.closest('.testimonial-modal').remove()">إغلاق</button>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        gsap.fromTo(overlay,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.out" }
        );
        
        gsap.fromTo(modal,
            { scale: 0.8, y: 50 },
            { scale: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
    }

    startQuantumAnimations() {
        // Animate hero elements sequentially
        const timeline = gsap.timeline();
        
        timeline
            .from('.quantum-badge', { y: 50, opacity: 0, duration: 1, ease: "power3.out" })
            .from('.hero-title.dimensional', { y: 80, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.5")
            .from('.hero-subtitle.hologram-text', { y: 60, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
            .from('.stats-dashboard', { y: 100, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.5")
            .from('.hero-actions .btn-quantum', { y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }, "-=0.3")
            .from('.scroll-portal', { scale: 0, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.2");
    }
}

// Initialize the quantum experience
function initializeQuantumExperience() {
    new QuantumExperience();
}

// Legacy support for existing functionality
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced scroll smoothing
    if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    // Performance optimization
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        // Disable complex animations for users who prefer reduced motion
        document.body.classList.add('reduced-motion');
    }
    
    // Initialize quantum experience after DOM is ready
    initializeQuantumExperience();
    
    // Add loading performance tracking
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`🚀 Quantum website loaded in ${loadTime}ms`);
        
        // Track with analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'name': 'quantum_load',
                'value': loadTime
            });
        }
    });
});

// Export for global access
window.QuantumExperience = QuantumExperience;