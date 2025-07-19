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

    // Contact Section animation
    const contactSection = document.querySelector('.contact-section');
    const contactContent = document.querySelector('.contact-content');

    if (contactSection && contactContent) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactContent.classList.add('animated-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(contactSection);
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
});