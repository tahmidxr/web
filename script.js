document.addEventListener('DOMContentLoaded', () => {
    const heading = document.getElementById('animated-heading');
    const text = heading.textContent;
    heading.textContent = ''; // Clear original text

    const words = text.split(' ').filter(word => word.length > 0); // Split into words, filter empty strings

    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' '; // Add space back after each word
        heading.appendChild(span);

        // Animate each word with a delay
        setTimeout(() => {
            span.classList.add('visible');
        }, index * 100); // 100ms delay per word
    });

    // Hamburger menu functionality
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('open');
        });

        // Close menu when a navigation link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('open');
            });
        });
    }

    // Smooth scroll for nav links and scroll arrow
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Collaborations section animation
    const collaborationsSection = document.querySelector('.collaborations-section');
    const collabImage = document.querySelector('.collab-image');
    const collabText = document.querySelector('.collab-text');

    if (collaborationsSection && collabImage && collabText) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.2 // Trigger when 20% of the section is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    collabImage.classList.add('animated-in');
                    collabText.classList.add('animated-in');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        observer.observe(collaborationsSection);
    }

    // About Me section animation
    const aboutMeSection = document.querySelector('.about-me-section');
    const aboutMeContent = document.querySelector('.about-me-content');

    if (aboutMeSection && aboutMeContent) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.2 // Trigger when 20% of the section is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutMeContent.classList.add('animated-in');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        observer.observe(aboutMeSection);
    }

    // Education section animation
    const educationSection = document.querySelector('.education-section');
    const educationItems = document.querySelectorAll('.education-item');

    if (educationSection && educationItems.length > 0) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.2 // Trigger when 20% of the section is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    educationItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animated-in');
                        }, index * 200); // Staggered animation
                    });
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        observer.observe(educationSection);
    }

    // Skills section animation
    const skillsSection = document.querySelector('.skills-section');
    const skillItems = document.querySelectorAll('.skill-item');

    if (skillsSection && skillItems.length > 0) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.2 // Trigger when 20% of the section is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillItems.forEach((item) => {
                        item.classList.add('animated-in');
                        const progressBarFill = item.querySelector('.progress-bar-fill');
                        const progress = progressBarFill.dataset.progress;
                        if (progress) {
                            progressBarFill.style.width = `${progress}%`;
                        }
                    });
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        observer.observe(skillsSection);
    }

    // Recent Works section animation
    const recentWorksSection = document.querySelector('.recent-works-section');
    const workImages = document.querySelectorAll('.works-grid img');

    if (recentWorksSection && workImages.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    workImages.forEach((img, index) => {
                        setTimeout(() => {
                            img.classList.add('animated-in');
                        }, index * 100); // Staggered animation for images
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(recentWorksSection);
    }

    // Header hide/show on scroll
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 50) { // Scrolling down and not at the very top
            header.classList.add('header-hidden');
        } else if (window.scrollY < lastScrollY || window.scrollY <= 50) { // Scrolling up or at the top
            header.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
    });

    // Mail form submission handler
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const subjectInput = document.getElementById('subject-input');
    const messageTextarea = document.getElementById('message-textarea');
    const sendButton = contactForm.querySelector('.send-button');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // Simple client-side validation
            if (!nameInput.value || !emailInput.value || !messageTextarea.value) {
                formMessage.textContent = 'Please fill in all required fields (Name, Email, Message).';
                formMessage.style.color = '#FF3700'; // Red color for error
                formMessage.style.display = 'block';
                return; // Stop the function if validation fails
            }

            // Basic email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.style.color = '#FF3700'; // Red color for error
                formMessage.style.display = 'block';
                return; // Stop the function if validation fails
            }

            const name = nameInput.value;
            const email = emailInput.value;
            const subject = subjectInput.value;
            const message = messageTextarea.value;

            // IMPORTANT: Replace "your.email@example.com" with Tahmid's actual email address.
            // This form uses a client-side mailto link, which will open the user's default email client.
            // For a server-side email sending solution (recommended for professional use),
            // this JavaScript logic would need to be replaced with an API call to a backend service.
            const recipientEmail = "your.email@example.com"; 

            // Construct the mailto link
            const mailtoSubject = encodeURIComponent(`Message from ${name} (${email}) - ${subject}`);
            const mailtoBody = encodeURIComponent(message);

            const mailtoLink = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

            // Provide immediate feedback to the user
            sendButton.textContent = 'Preparing Email...';
            sendButton.disabled = true;
            sendButton.style.opacity = '0.7';

            // Simulate a slight delay for better UX before opening mail client
            setTimeout(() => {
                window.location.href = mailtoLink;

                // Reset form and show success message
                nameInput.value = '';
                emailInput.value = '';
                subjectInput.value = '';
                messageTextarea.value = '';

                formMessage.textContent = 'Your email client is opening. Thank you for your message!';
                formMessage.style.color = '#FFA500'; // Orange color for success
                formMessage.style.display = 'block';

                sendButton.innerHTML = 'Send Message <i class="fas fa-paper-plane send-icon"></i>';
                sendButton.disabled = false;
                sendButton.style.opacity = '1';

                // Hide message after some time
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000); // Hide after 5 seconds
            }, 500); // 0.5 second delay
        });
    }
});