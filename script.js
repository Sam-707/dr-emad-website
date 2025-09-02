// Website Interactivity and Analytics
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Email form submission
    const emailForm = document.getElementById('emailForm');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Track email signup conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                    'value': 1.0,
                    'currency': 'SAR'
                });
            }
            
            // Simulate email capture
            alert('شكراً لك! سيتم إرسال الدليل المجاني إلى بريدك الإلكتروني خلال دقائق.');
            this.reset();
            
            // You would integrate with your email service here
            // Example: Mailchimp, ConvertKit, etc.
            console.log('Email captured:', email);
        });
    }

    // Booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            // Track booking conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-CONVERSION_ID/BOOKING_LABEL',
                    'value': 300.0,
                    'currency': 'SAR'
                });
            }
            
            // Simulate booking submission
            alert('تم إرسال طلب الحجز بنجاح! سيتم التواصل معك خلال 24 ساعة لتأكيد الموعد.');
            this.reset();
            
            // You would integrate with your booking system here
            console.log('Booking request submitted:', Object.fromEntries(formData));
        });
    }

    // WhatsApp click tracking
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'WhatsApp',
                    'event_label': 'Contact Button',
                    'value': 1
                });
            }
        });
    });

    // Service card click tracking
    document.querySelectorAll('.btn-service').forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Services',
                    'event_label': serviceName,
                    'value': 1
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in animation to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Mobile menu toggle (if needed)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Performance tracking
    window.addEventListener('load', function() {
        // Track page load time
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'name': 'load',
                'value': loadTime
            });
        }
        console.log('Page load time:', loadTime + 'ms');
    });

    // Hotjar tracking code placeholder
    // This would be replaced with actual Hotjar code
    if (typeof hj !== 'undefined') {
        hj('event', 'page_view');
    }
});

// Google Analytics 4 Configuration
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// Replace GA_MEASUREMENT_ID with actual Google Analytics ID
gtag('config', 'GA_MEASUREMENT_ID', {
    page_title: 'Dr Emad Rashad - Mental Health Consultant',
    page_location: window.location.href,
    content_group1: 'Mental Health',
    content_group2: 'Arabic Content',
    custom_map: {
        'dimension1': 'user_type',
        'dimension2': 'traffic_source'
    }
});

// Enhanced ecommerce tracking for services
function trackServiceView(serviceName, servicePrice) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view_item', {
            'currency': 'SAR',
            'value': servicePrice,
            'items': [{
                'item_id': serviceName.toLowerCase().replace(/\s+/g, '_'),
                'item_name': serviceName,
                'category': 'Mental Health Services',
                'price': servicePrice
            }]
        });
    }
}

// Form validation helpers
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Phone number formatting for Saudi numbers
function formatSaudiPhone(phoneNumber) {
    // Remove all non-digits
    const digits = phoneNumber.replace(/\D/g, '');
    
    // Format as +966-XX-XXX-XXXX
    if (digits.length >= 9 && digits.startsWith('966')) {
        return `+${digits.substring(0,3)}-${digits.substring(3,5)}-${digits.substring(5,8)}-${digits.substring(8)}`;
    } else if (digits.length >= 9 && digits.startsWith('05')) {
        return `+966-${digits.substring(1,3)}-${digits.substring(3,6)}-${digits.substring(6)}`;
    }
    
    return phoneNumber;
}

// Arabic text direction helper
function adjustTextDirection() {
    const textInputs = document.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(input => {
        input.addEventListener('input', function() {
            const arabicRegex = /[\u0600-\u06FF]/;
            if (arabicRegex.test(this.value)) {
                this.style.direction = 'rtl';
                this.style.textAlign = 'right';
            } else {
                this.style.direction = 'ltr';
                this.style.textAlign = 'left';
            }
        });
    });
}