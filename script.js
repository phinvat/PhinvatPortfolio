
    // Telegram Bot Configuration
    const TELEGRAM_BOT_TOKEN = '8570354023:AAFr9np_1ammaPXR0too-WoD-MEgzFv-43g';
    const TELEGRAM_CHAT_ID = '2085547143'; // Your user ID from earlier

    // Generate stars for background
    function createStars() {
        const starsContainer = document.getElementById('stars');
        const starCount = 200;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            star.style.opacity = Math.random() * 0.7 + 0.3;
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            starsContainer.appendChild(star);
        }
    }
    
    // Initialize stars
    createStars();
    
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('themeToggle');
    const backToTop = document.getElementById('backToTop');
    const currentYear = document.getElementById('currentYear');
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialDots = document.querySelectorAll('.slider-dot');
    const prevTestimonialBtn = document.getElementById('prevTestimonial');
    const nextTestimonialBtn = document.getElementById('nextTestimonial');
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    // Set current year
    currentYear.textContent = new Date().getFullYear();
    
    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        // Navbar background
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 42, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = '';
            navbar.style.backdropFilter = '';
        }
        
        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Active nav link
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial Slider
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.testimonial-card').length;
    
    function updateSlider() {
        testimonialsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        testimonialDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    prevTestimonialBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });
    
    nextTestimonialBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });
    
    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Auto-rotate testimonials
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 6000);
    
    // Pause on hover
    testimonialsTrack.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialsTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 6000);
    });
    
    // Form Validation
    function validateForm() {
        let isValid = true;
        const formInputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
        
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff6b9d';
                isValid = false;
            } else {
                input.style.borderColor = 'rgba(108, 99, 255, 0.3)';
            }
            
            // Special validation for email
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.style.borderColor = '#ff6b9d';
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    // Real-time form validation
    contactForm.addEventListener('input', (e) => {
        const input = e.target;
        if (input.hasAttribute('required')) {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff6b9d';
            } else {
                input.style.borderColor = 'rgba(108, 99, 255, 0.3)';
            }
        }
    });
    
    // Notification System
    function showNotification(type, title, message, duration = 5000) {
        // Create notification container if it doesn't exist
        let notificationContainer = document.getElementById('notificationContainer');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.id = 'notificationContainer';
            notificationContainer.style.cssText = `
                position: fixed;
                top: 100px;
                right: 30px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 15px;
            `;
            document.body.appendChild(notificationContainer);
        }
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        const colors = {
            success: '#00ffcc',
            error: '#ff6b9d',
            warning: '#ffd700',
            info: '#00d4ff'
        };
        
        notification.innerHTML = `
            <div style="
                background: var(--card-bg);
                border-left: 4px solid ${colors[type]};
                padding: 20px;
                border-radius: var(--radius);
                box-shadow: var(--shadow-lg);
                display: flex;
                align-items: center;
                gap: 15px;
                min-width: 300px;
                max-width: 400px;
                transform: translateX(120%);
                transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
                backdrop-filter: blur(10px);
            ">
                <div style="color: ${colors[type]}; font-size: 1.5rem;">
                    <i class="${icons[type]}"></i>
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 5px; color: var(--text-primary);">
                        ${title}
                    </div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary);">
                        ${message}
                    </div>
                </div>
                <button style="
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-size: 1.2rem;
                    padding: 5px;
                    transition: var(--transition);
                ">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        notificationContainer.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.querySelector('div').style.transform = 'translateX(0)';
        }, 10);
        
        // Close button
        notification.querySelector('button').addEventListener('click', () => {
            closeNotification(notification);
        });
        
        // Auto close
        if (duration > 0) {
            setTimeout(() => {
                closeNotification(notification);
            }, duration);
        }
        
        function closeNotification(notificationElement) {
            notificationElement.querySelector('div').style.transform = 'translateX(120%)';
            setTimeout(() => {
                if (notificationElement.parentNode) {
                    notificationElement.parentNode.removeChild(notificationElement);
                }
            }, 400);
        }
        
        return notification;
    }
    
    // Send data to Telegram
    async function sendToTelegram(formData) {
        try {
            // Format the message for Telegram
            const message = `
🚀 *COSMIC CONTACT FORM SUBMISSION*

👨‍🚀 *Astronaut Name:* ${formData.name}
📡 *Transmission Frequency:* ${formData.email}
🌌 *Mission Type:* ${formData.projectType}
💰 *Fuel Budget:* ${formData.budget || 'Not specified'}
📝 *Mission Brief:*
${formData.message}

⏰ *Earth Time:* ${new Date().toLocaleString()}
📍 *Origin Page:* ${window.location.href}
🪐 *User Platform:* ${navigator.userAgent}
            `;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Send to Telegram Bot API
            const response = await fetch(
                `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedMessage}&parse_mode=Markdown`
            );
            
            const data = await response.json();
            
            if (data.ok) {
                return { success: true, message: 'Message transmitted to cosmic channels!' };
            } else {
                throw new Error(data.description || 'Failed to transmit to cosmic network');
            }
        } catch (error) {
            console.error('Telegram transmission error:', error);
            return { 
                success: false, 
                message: `Cosmic interference detected: ${error.message}. Message stored locally.` 
            };
        }
    }
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showNotification('error', 'Transmission Error', 'Please fill in all required fields correctly before launch.');
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            projectType: document.getElementById('projectType').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            location: window.location.href
        };
        
        // Show loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';
        submitBtn.disabled = true;
        
        try {
            // Send to Telegram
            const telegramResult = await sendToTelegram(formData);
            
            if (telegramResult.success) {
                // Show success notification
                showNotification('success', 'Transmission Successful!', 'Your cosmic message has been sent across the galaxy. I\'ll respond at light speed!', 6000);
                
                // Also show Telegram success
                setTimeout(() => {
                    showNotification('info', 'Cosmic Network Status', telegramResult.message, 4000);
                }, 1000);
                
                // Reset form
                contactForm.reset();
                
                // Log to console (for debugging)
                console.log('🌌 Cosmic transmission data:', formData);
                console.log('📡 Telegram response:', telegramResult);
                
            } else {
                // Telegram failed but form submitted locally
                showNotification('warning', 'Partial Transmission', telegramResult.message, 6000);
                
                // Still reset form and show success for local submission
                setTimeout(() => {
                    showNotification('info', 'Local Storage Active', 'Message stored in local database. Will transmit when network is restored.', 4000);
                }, 1000);
                
                contactForm.reset();
            }
            
        } catch (error) {
            // Show error notification
            showNotification('error', 'Transmission Failed', 'Cosmic interference detected. Please try again or contact me through alternative channels.', 6000);
            console.error('Form submission error:', error);
            
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for nebulas
    window.addEventListener('scroll', () => {
        const nebulas = document.querySelectorAll('.nebula');
        const scrolled = window.pageYOffset;
        
        nebulas.forEach((nebula, index) => {
            const speed = index === 0 ? 0.3 : 0.5;
            const yPos = -(scrolled * speed);
            nebula.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🚀 PhinVat Galaxy Portfolio initialized');
        console.log('📡 Telegram Bot configured with token:', TELEGRAM_BOT_TOKEN);
        console.log('🌌 Cosmic contact form ready for transmissions');
        
        // Show welcome notification
        setTimeout(() => {
            showNotification('info', 'Welcome to PhinVat!', 'Ready to explore the cosmos of code? Launch your project below.', 4000);
        }, 1000);
    });
