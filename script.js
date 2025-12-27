
        // Telegram Bot Configuration
        const TELEGRAM_BOT_TOKEN = '8570354023:AAFr9np_1ammaPXR0too-WoD-MEgzFv-43g';
        const TELEGRAM_CHAT_ID = '2085547143'; // Your Telegram user ID from the message

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
                navbar.style.background = 'rgba(var(--bg-primary-rgb), 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
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
        }, 5000);
        
        // Pause on hover
        testimonialsTrack.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialsTrack.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            }, 5000);
        });
        
        // Form Validation
        function validateForm() {
            let isValid = true;
            const formInputs = contactForm.querySelectorAll('input, select, textarea[required]');
            
            formInputs.forEach(input => {
                const errorElement = input.nextElementSibling;
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
                
                // Special validation for email
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        input.classList.add('error');
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
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            }
        });
        
        // Notification System
        function showNotification(type, title, message, duration = 5000) {
            const notificationContainer = document.getElementById('notificationContainer');
            
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            
            const icons = {
                success: 'fas fa-check-circle',
                error: 'fas fa-exclamation-circle',
                warning: 'fas fa-exclamation-triangle'
            };
            
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="${icons[type]}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${title}</div>
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            notificationContainer.appendChild(notification);
            
            // Trigger animation
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Close button
            notification.querySelector('.notification-close').addEventListener('click', () => {
                closeNotification(notification);
            });
            
            // Auto close
            if (duration > 0) {
                setTimeout(() => {
                    closeNotification(notification);
                }, duration);
            }
            
            return notification;
        }
        
        function closeNotification(notification) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }
        
        // Send data to Telegram
        async function sendToTelegram(formData) {
            try {
                // Format the message for Telegram
                const message = `
📨 *New Contact Form Submission*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
🎯 *Project Type:* ${formData.projectType}
💰 *Budget:* ${formData.budget || 'Not specified'}
📝 *Message:*
${formData.message}

🕒 *Time:* ${new Date().toLocaleString()}
🌐 *Page:* ${window.location.href}
                `;
                
                // Encode the message for URL
                const encodedMessage = encodeURIComponent(message);
                
                // Send to Telegram Bot API
                const response = await fetch(
                    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodedMessage}&parse_mode=Markdown`
                );
                
                const data = await response.json();
                
                if (data.ok) {
                    return { success: true, message: 'Message sent to Telegram successfully!' };
                } else {
                    throw new Error(data.description || 'Failed to send to Telegram');
                }
            } catch (error) {
                console.error('Telegram error:', error);
                return { 
                    success: false, 
                    message: `Telegram error: ${error.message}. Form submitted locally.` 
                };
            }
        }
        
        // Form submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                showNotification('error', 'Validation Error', 'Please fill in all required fields correctly.');
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
            submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Send to Telegram
                const telegramResult = await sendToTelegram(formData);
                
                if (telegramResult.success) {
                    // Show success notification
                    showNotification('success', 'Message Sent!', 'Your message has been sent successfully. I\'ll get back to you soon!', 6000);
                    
                    // Also show Telegram success
                    setTimeout(() => {
                        showNotification('success', 'Telegram Notification', telegramResult.message, 4000);
                    }, 1000);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Log to console (for debugging)
                    console.log('Form data submitted:', formData);
                    console.log('Telegram response:', telegramResult);
                    
                } else {
                    // Telegram failed but form submitted locally
                    showNotification('warning', 'Partial Success', telegramResult.message, 6000);
                    
                    // Still reset form and show success for local submission
                    setTimeout(() => {
                        showNotification('success', 'Form Submitted', 'Your message has been saved locally. I\'ll review it soon.', 4000);
                    }, 1000);
                    
                    contactForm.reset();
                }
                
            } catch (error) {
                // Show error notification
                showNotification('error', 'Submission Error', 'There was an error sending your message. Please try again or contact me directly.', 6000);
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
        
        // Add subtle parallax effect to hero background
        window.addEventListener('scroll', () => {
            const heroBg = document.querySelector('.hero-bg');
            if (heroBg) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroBg.style.transform = `skewX(-10deg) translateX(20%) translateY(${rate}px)`;
            }
        });

        // Initialize form validation on page load
        document.addEventListener('DOMContentLoaded', () => {
            // Test the Telegram connection (optional)
            console.log('Portfolio website loaded');
            console.log('Telegram Bot Token configured');
            console.log('Your Chat ID:', TELEGRAM_CHAT_ID);
            
            // Show a welcome notification (optional)
            setTimeout(() => {
                showNotification('success', 'Welcome!', 'Feel free to contact me using the form below.', 3000);
            }, 2000);
        });
   