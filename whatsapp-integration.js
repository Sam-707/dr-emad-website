// WhatsApp Business Integration
class WhatsAppIntegration {
    constructor(phoneNumber, businessName = 'Dr. Emad Rashad') {
        this.phoneNumber = phoneNumber;
        this.businessName = businessName;
        this.baseURL = 'https://wa.me/';
    }

    // Generate WhatsApp link with pre-filled message
    generateLink(message, phone = this.phoneNumber) {
        const encodedMessage = encodeURIComponent(message);
        return `${this.baseURL}${phone}?text=${encodedMessage}`;
    }

    // Pre-defined message templates
    getMessageTemplates() {
        return {
            consultation: `السلام عليكم د. عماد
أود حجز استشارة نفسية معك.
اسمي: [الاسم]
نوع الاستشارة المطلوبة: [النوع]
الوقت المفضل: [الوقت]
شكراً لك`,

            inquiry: `السلام عليكم د. عماد
لدي استفسار حول خدماتك في الصحة النفسية.
كيف يمكنني الحصول على مساعدة في: [المشكلة]
شكراً لك`,

            emergency: `السلام عليكم د. عماد
أحتاج استشارة عاجلة
الحالة: [وصف مختصر]
هل يمكنك مساعدتي؟`,

            followup: `السلام عليكم د. عماد
أود متابعة حالتي بعد الجلسة السابقة
اسمي: [الاسم]
تاريخ آخر جلسة: [التاريخ]`,

            general: `السلام عليكم د. عماد
أتواصل معك من خلال موقعك الإلكتروني
أود معرفة المزيد عن خدماتك`
        };
    }

    // Initialize WhatsApp buttons
    initializeButtons() {
        const templates = this.getMessageTemplates();
        
        // Update all WhatsApp links with proper phone number
        document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            const linkType = link.dataset.type || 'general';
            const message = templates[linkType] || templates.general;
            link.href = this.generateLink(message);
        });

        // Add click tracking
        this.addClickTracking();
        
        // Add floating button behavior
        this.setupFloatingButton();
    }

    // Add analytics tracking for WhatsApp clicks
    addClickTracking() {
        document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            link.addEventListener('click', (e) => {
                // Track with Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'whatsapp_click', {
                        'event_category': 'Contact',
                        'event_label': link.dataset.type || 'general',
                        'value': 1
                    });
                }
                
                // Track with Hotjar
                if (typeof hj !== 'undefined') {
                    hj('event', 'whatsapp_contact');
                }
                
                // Custom tracking
                this.trackWhatsAppClick(link.dataset.type || 'general');
            });
        });
    }

    // Custom tracking function
    trackWhatsAppClick(type) {
        const data = {
            event: 'whatsapp_contact',
            type: type,
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            businessName: this.businessName
        };
        
        // Send to your analytics endpoint
        if (typeof fetch !== 'undefined') {
            fetch('/api/track-whatsapp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).catch(err => console.log('Analytics tracking failed:', err));
        }
        
        console.log('WhatsApp click tracked:', data);
    }

    // Setup floating WhatsApp button behavior
    setupFloatingButton() {
        const floatingBtn = document.querySelector('.whatsapp-float');
        if (!floatingBtn) return;

        // Add message template to floating button
        const message = this.getMessageTemplates().general;
        floatingBtn.href = this.generateLink(message);
        floatingBtn.dataset.type = 'floating';

        // Add pulsing animation
        this.addPulseAnimation(floatingBtn);
        
        // Show/hide based on scroll
        this.setupScrollBehavior(floatingBtn);
    }

    // Add pulsing animation to floating button
    addPulseAnimation(button) {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes whatsapp-pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .whatsapp-float.pulse {
                animation: whatsapp-pulse 2s infinite;
            }
        `;
        document.head.appendChild(style);
        
        // Add pulse class every 10 seconds
        setInterval(() => {
            button.classList.add('pulse');
            setTimeout(() => button.classList.remove('pulse'), 2000);
        }, 10000);
    }

    // Setup scroll-based visibility for floating button
    setupScrollBehavior(button) {
        let isVisible = false;
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            if (scrollPosition > windowHeight * 0.3 && !isVisible) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
                isVisible = true;
            } else if (scrollPosition <= windowHeight * 0.3 && isVisible) {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
                isVisible = false;
            }
        });
    }

    // Generate smart message based on user interaction
    generateSmartMessage(userContext = {}) {
        const templates = this.getMessageTemplates();
        let message = templates.general;
        
        // Customize message based on context
        if (userContext.service) {
            message = `السلام عليكم د. عماد
أود حجز استشارة في: ${userContext.service}
اسمي: ${userContext.name || '[الاسم]'}
رقم الهاتف: ${userContext.phone || '[رقم الهاتف]'}
الوقت المفضل: ${userContext.time || '[الوقت المفضل]'}
شكراً لك`;
        }
        
        return message;
    }

    // Create WhatsApp chat widget
    createChatWidget() {
        const widget = document.createElement('div');
        widget.className = 'whatsapp-widget';
        widget.innerHTML = `
            <div class="whatsapp-header">
                <img src="/images/dr-emad-avatar.jpg" alt="د. عماد راشد" class="avatar">
                <div class="info">
                    <h4>د. عماد راشد</h4>
                    <span class="status">متاح الآن</span>
                </div>
                <button class="close-widget">&times;</button>
            </div>
            <div class="whatsapp-body">
                <div class="message-preview">
                    <p>مرحباً! كيف يمكنني مساعدتك اليوم؟</p>
                    <p>اختر نوع الاستشارة المناسب:</p>
                </div>
                <div class="quick-buttons">
                    <button data-type="consultation">حجز استشارة</button>
                    <button data-type="inquiry">استفسار عام</button>
                    <button data-type="emergency">استشارة عاجلة</button>
                </div>
            </div>
        `;
        
        // Add CSS for widget
        const widgetStyle = document.createElement('style');
        widgetStyle.textContent = `
            .whatsapp-widget {
                position: fixed;
                bottom: 100px;
                left: 30px;
                width: 300px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                z-index: 1000;
                display: none;
            }
            
            .whatsapp-header {
                background: #25D366;
                color: white;
                padding: 15px;
                border-radius: 15px 15px 0 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .whatsapp-header .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 2px solid white;
            }
            
            .whatsapp-header .status {
                font-size: 12px;
                opacity: 0.9;
            }
            
            .close-widget {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                margin-left: auto;
                cursor: pointer;
            }
            
            .whatsapp-body {
                padding: 20px;
            }
            
            .message-preview p {
                margin-bottom: 10px;
                color: #555;
                font-size: 14px;
                line-height: 1.4;
            }
            
            .quick-buttons {
                margin-top: 15px;
            }
            
            .quick-buttons button {
                display: block;
                width: 100%;
                margin-bottom: 8px;
                padding: 10px;
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                cursor: pointer;
                font-family: 'Cairo', sans-serif;
                transition: background 0.3s;
            }
            
            .quick-buttons button:hover {
                background: #e9ecef;
            }
        `;
        
        document.head.appendChild(widgetStyle);
        document.body.appendChild(widget);
        
        // Setup widget interactions
        this.setupWidgetInteractions(widget);
        
        return widget;
    }

    // Setup widget interaction handlers
    setupWidgetInteractions(widget) {
        const templates = this.getMessageTemplates();
        
        // Quick button clicks
        widget.querySelectorAll('.quick-buttons button').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                const message = templates[type] || templates.general;
                const whatsappURL = this.generateLink(message);
                
                window.open(whatsappURL, '_blank');
                widget.style.display = 'none';
                
                // Track click
                this.trackWhatsAppClick(`widget_${type}`);
            });
        });
        
        // Close button
        widget.querySelector('.close-widget').addEventListener('click', () => {
            widget.style.display = 'none';
        });
        
        // Show widget on floating button click
        document.querySelector('.whatsapp-float')?.addEventListener('click', (e) => {
            e.preventDefault();
            widget.style.display = widget.style.display === 'block' ? 'none' : 'block';
        });
    }
}

// Initialize WhatsApp Integration
document.addEventListener('DOMContentLoaded', function() {
    // Replace with Dr. Emad's actual WhatsApp number
    const drEmadWhatsApp = new WhatsAppIntegration('966XXXXXXXXX', 'د. عماد راشد');
    
    // Initialize all WhatsApp functionality
    drEmadWhatsApp.initializeButtons();
    
    // Create chat widget (optional)
    // drEmadWhatsApp.createChatWidget();
    
    // Make available globally for form integrations
    window.whatsappIntegration = drEmadWhatsApp;
});

// Form integration helper
function openWhatsAppWithFormData(formData) {
    if (window.whatsappIntegration) {
        const context = {
            name: formData.get('name') || formData.get('الاسم'),
            phone: formData.get('phone') || formData.get('الهاتف'),
            service: formData.get('service') || formData.get('الخدمة'),
            time: formData.get('time') || formData.get('الوقت')
        };
        
        const message = window.whatsappIntegration.generateSmartMessage(context);
        const whatsappURL = window.whatsappIntegration.generateLink(message);
        
        window.open(whatsappURL, '_blank');
    }
}