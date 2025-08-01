document.addEventListener('DOMContentLoaded', () => {
    // NEW: Remove no-scroll from body and trigger initial header/nav animation
    const body = document.body;
    const header = document.querySelector('header');
    const navLinks = document.getElementById('nav-links');

    if (header) {
        // Use a slight delay to ensure CSS is rendered before removing class
        setTimeout(() => {
            header.classList.remove('initial-hidden');
        }, 100); // Small delay for header
    }

    if (navLinks) {
        setTimeout(() => {
            // Only remove for desktop, mobile nav starts display: none
            if (window.innerWidth > 768) {
                navLinks.classList.remove('initial-hidden');
            }
        }, 300); // Delay for nav links after header starts animating
    }

    // Allow scroll after a combined animation duration
    setTimeout(() => {
        body.classList.remove('no-scroll'); // Restore scroll by removing the class
    }, 1000); // Adjust this total duration to match your loading animation speed

    const heading = document.getElementById('animated-heading');
    const text = heading.textContent;
    heading.textContent = ''; // Clear original text

    const words = text.split(' ').filter(word => word.length > 0); // Split into words, filter empty strings

    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' '; // Add space back after each word
        
        // Apply Playfair Display font to the word "Tahmid"
        if (word.toLowerCase() === 'tahmid') {
            span.classList.add('playfair-display-font'); // Changed to playfair-display-font
        }

        heading.appendChild(span);

        // Animate each word with a delay
        setTimeout(() => {
            span.classList.add('visible');
        }, index * 100); // 100ms delay per word
    });

    // Animate the "Work With Me" button after the heading
    const heroWorkButton = document.querySelector('.hero-work-button');
    if (heroWorkButton) {
        // Find the last word span to chain the animation
        const lastWordSpan = heading.querySelector('span:last-child');
        const lastWordDelay = words.length * 100; // Total delay for all words to appear

        setTimeout(() => {
            heroWorkButton.classList.add('visible');
        }, lastWordDelay + 300); // Add button animation after words, with a small extra delay
    }

    // Magnetic hover effect for hero heading
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        // Wait for the initial heading animation to complete before enabling magnetic effect
        // The last word delay + the CSS transform transition duration (0.8s) + a small buffer
        const totalHeadingAnimationDuration = (words.length * 100) + 800 + 100; 

        setTimeout(() => {
            // NEW: Only apply magnetic effect on larger screens (non-touch devices primarily)
            if (window.innerWidth > 768) { // Assuming 768px is the breakpoint for desktop
                const currentAnimatedHeadingSpans = document.querySelectorAll('#animated-heading span');
                const magneticStrength = 0.8; // How much the words move (0.1 to 0.5 typically)
                const magneticRadius = 100;   // Distance from mouse to activate effect (in pixels)

                heroSection.addEventListener('mousemove', (e) => {
                    // Ensure event listeners are only added once
                    if (!heroSection.dataset.magneticListenersAdded) {
                        heroSection.dataset.magneticListenersAdded = 'true'; // Mark as added
                    }

                    currentAnimatedHeadingSpans.forEach(span => {
                        const rect = span.getBoundingClientRect();
                        const spanCenterX = rect.left + rect.width / 2;
                        const spanCenterY = rect.top + rect.height / 2;

                        const deltaX = e.clientX - spanCenterX;
                        const deltaY = e.clientY - spanCenterY;

                        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                        if (distance < magneticRadius) {
                            // Calculate the force and direction
                            const force = magneticStrength * (1 - distance / magneticRadius);
                            const offsetX = deltaX * force;
                            const offsetY = deltaY * force;
                            
                            // Apply transform and add class for faster transition
                            span.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0px)`;
                            span.classList.add('magnetic-hover');
                        } else {
                            // Reset to original position if outside radius
                            span.style.transform = 'translate3d(0px, 0px, 0px)';
                            span.classList.remove('magnetic-hover');
                        }
                    });
                });

                heroSection.addEventListener('mouseleave', () => {
                    currentAnimatedHeadingSpans.forEach(span => {
                        // Smoothly transition back to original position
                        span.style.transform = 'translate3d(0px, 0px, 0px)';
                        span.classList.remove('magnetic-hover');
                    });
                });
            }
        }, totalHeadingAnimationDuration);
    }

    // Store original texts for scramble animation
    const originalAboutMeText = document.querySelector('.about-me-section h2')?.textContent;
    const originalEducationText = document.querySelector('.education-section h2')?.textContent;
    const originalSkillsText = document.querySelector('.skills-section h2')?.textContent;
    const originalRecentWorksText = document.querySelector('.recent-works-section h2')?.textContent;

    // Utility function to wrap each character in a span (kept for other potential uses)
    function wrapCharacters(element) {
        if (!element) return [];
        const text = element.textContent;
        element.innerHTML = ''; // Clear original content

        const charSpans = [];
        for (let i = 0; i < text.length; i++) {
            const charSpan = document.createElement('span');
            // Handle spaces and newlines specifically to maintain layout
            if (text[i] === ' ') {
                charSpan.innerHTML = '&nbsp;'; // Use non-breaking space
            } else if (text[i] === '\n') {
                charSpan.appendChild(document.createElement('br')); // Insert break tag for newlines
            } else {
                charSpan.textContent = text[i];
            }
            element.appendChild(charSpan);
            charSpans.push(charSpan);
        }
        return charSpans;
    }

    // NEW: Utility function to wrap each word in a span for animations
    function wrapWordsForAnimation(element) {
        if (!element) return [];
        const text = element.textContent;
        element.innerHTML = ''; // Clear original content

        // Split text by any whitespace, keeping original delimiters to process them
        // This regex splits and keeps the whitespace parts in the resulting array
        const parts = text.split(/(\s+)/).filter(part => part.length > 0);

        const wordSpans = [];
        parts.forEach(part => {
            if (/\s+/.test(part)) { // If it's a whitespace part
                if (part.includes('\n')) {
                    element.appendChild(document.createElement('br')); // Preserve actual newlines
                } else {
                    element.appendChild(document.createTextNode('\u00A0')); // Use non-breaking space for spaces
                }
            } else { // It's a word
                const span = document.createElement('span');
                span.textContent = part;
                element.appendChild(span);
                wordSpans.push(span);
            }
        });
        return wordSpans;
    }

    // Function to animate characters/words in with a stagger effect
    function animateCharacterReveal(charSpans, staggerDelay = 30, initialDelay = 0) {
        if (!charSpans || charSpans.length === 0) return;

        charSpans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('animated-in');
            }, initialDelay + (index * staggerDelay));
        });
    }

    // Scramble text function
    function scrambleText(element, originalText, duration = 1000, frameDuration = 50) {
        if (!element || !originalText) return;

        const chars = '!@#$%^&*()_+=-{}[]|;:,.<>?/`~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const numFrames = duration / frameDuration;
        let frame = 0;

        function animate() {
            let scrambledText = '';
            const revealLength = Math.floor(originalText.length * (frame / numFrames));

            for (let i = 0; i < originalText.length; i++) {
                if (i < revealLength) {
                    scrambledText += originalText[i];
                } else {
                    scrambledText += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            element.textContent = scrambledText;

            if (frame < numFrames) {
                frame++;
                setTimeout(animate, frameDuration);
            } else {
                element.textContent = originalText; // Ensure final text is correct
            }
        }
        animate();
    }

    // Hamburger menu functionality
    const hamburgerMenu = document.getElementById('hamburger-menu');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            
            if (!isActive) {
                // Opening menu
                navLinks.classList.add('active');
                hamburgerMenu.classList.add('open');
                body.classList.add('no-scroll'); // Prevent background scroll by adding class
            } else {
                // Closing menu
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('open');
                body.classList.remove('no-scroll'); // Restore background scroll by removing class
            }
        });

        // Close menu when a navigation link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('open');
                body.classList.remove('no-scroll'); // Restore background scroll by removing class
            });
        });

        // Close menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !hamburgerMenu.contains(e.target) && 
                !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('open');
                body.classList.remove('no-scroll'); // Restore background scroll by removing class
            }
        });

        // Close menu on escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('open');
                body.classList.remove('no-scroll'); // Restore background scroll by removing class
            }
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

    // NEW: Dynamic Scrolling Headline for Collaborations Section
    const scrollingHeadlineText = document.querySelector('.scrolling-headline-text');
    const phrase = "Collaborations & Platforms";
    const repetitionCount = 5; // Repeat the phrase multiple times to ensure it covers the screen

    if (scrollingHeadlineText) {
        // Dynamically add repeated phrases
        for (let i = 0; i < repetitionCount; i++) {
            const span = document.createElement('span');
            span.textContent = phrase;
            scrollingHeadlineText.appendChild(span);
            // Add non-breaking spaces for separation between repetitions
            if (i < repetitionCount - 1) {
                scrollingHeadlineText.appendChild(document.createTextNode('\u00A0\u00A0\u00A0\u00A0\u00A0')); // Five non-breaking spaces
            }
        }

        let lastScrollY = window.scrollY;
        let currentTranslateX = 0; // Accumulate scroll movement for continuous effect
        const scrollSpeedFactor = 0.5; // Controls how fast the text moves relative to scroll

        function animateScrollingHeadline() {
            const deltaScroll = window.scrollY - lastScrollY;
            
            // Adjust currentTranslateX based on scroll direction
            // If scrolling down (deltaScroll positive), currentTranslateX decreases (moves left)
            // If scrolling up (deltaScroll negative), currentTranslateX increases (moves right)
            currentTranslateX -= deltaScroll * scrollSpeedFactor;

            scrollingHeadlineText.style.transform = `translateX(${currentTranslateX}px)`;
            lastScrollY = window.scrollY; // Update lastScrollY for the next frame

            requestAnimationFrame(animateScrollingHeadline);
        }

        // Start the animation immediately when the page loads
        requestAnimationFrame(animateScrollingHeadline);
    }

    // About Me section animation
    const aboutMeSection = document.querySelector('.about-me-section');
    const aboutMeH2 = aboutMeSection?.querySelector('h2'); // Get the h2
    const aboutMeTextLines = document.querySelectorAll('.about-me-text-line'); // Get all new text lines

    if (aboutMeSection && aboutMeTextLines.length > 0 && aboutMeH2) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.2 // Trigger when 20% of the section is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start scramble text for heading
                    if (originalAboutMeText) {
                        setTimeout(() => scrambleText(aboutMeH2, originalAboutMeText), 300);
                    }

                    // Animate each text line with staggered delay and alternating direction
                    aboutMeTextLines.forEach((line, index) => {
                        // Apply initial transform class
                        if (index % 2 === 0) {
                            line.classList.add('from-left');
                        } else {
                            line.classList.add('from-right');
                        }

                        // Apply animated-in class after a delay to trigger transition
                        setTimeout(() => {
                            line.classList.add('animated-in');
                        }, 500 + (index * 150)); // Delay after heading scramble, then stagger lines
                    });

                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        observer.observe(aboutMeSection);
    }

    // Education section animation
    const educationSection = document.querySelector('.education-section');
    const educationItems = document.querySelectorAll('.education-item');
    const educationH2 = educationSection?.querySelector('h2');

    // Pre-wrap characters for education items
    const educationItemTextSpans = [];
    educationItems.forEach(item => {
        const h3 = item.querySelector('h3');
        const institution = item.querySelector('.institution');
        const years = item.querySelector('.years');

        // Use the new wrapWordsForAnimation function for education section text
        if (h3) educationItemTextSpans.push(wrapWordsForAnimation(h3));
        if (institution) educationItemTextSpans.push(wrapWordsForAnimation(institution));
        if (years) educationItemTextSpans.push(wrapWordsForAnimation(years));
    });

    if (educationSection && educationItems.length > 0 && educationH2) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.2 // Trigger when 20% of the section is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (originalEducationText) {
                         setTimeout(() => scrambleText(educationH2, originalEducationText), 300);
                    }

                    educationItems.forEach((item, itemIndex) => {
                        // Animate the education card itself
                        setTimeout(() => {
                            item.classList.add('animated-in');
                            // After card animates in, animate its text
                            const h3Chars = item.querySelector('h3')?.querySelectorAll('span');
                            const institutionChars = item.querySelector('.institution')?.querySelectorAll('span');
                            const yearsChars = item.querySelector('.years')?.querySelectorAll('span');

                            // Stagger character animations within each card
                            animateCharacterReveal(Array.from(h3Chars), 30, 200); // 200ms after card starts
                            animateCharacterReveal(Array.from(institutionChars), 20, 400); // 400ms after card starts
                            animateCharacterReveal(Array.from(yearsChars), 20, 600); // 600ms after card starts

                        }, itemIndex * 200); // Staggered animation for each card
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
    const skillsH2 = skillsSection?.querySelector('h2');

    if (skillsSection && skillItems.length > 0 && skillsH2) {
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
                    if (originalSkillsText) {
                        setTimeout(() => scrambleText(skillsH2, originalSkillsText), 300);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(skillsSection);
    }

    // Recent Works section animation
    const recentWorksSection = document.querySelector('.recent-works-section');
    const workImages = document.querySelectorAll('.works-grid img');
    const recentWorksH2 = recentWorksSection?.querySelector('h2');

    if (recentWorksSection && workImages.length > 0 && recentWorksH2) {
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

    // Contact section animation
    const contactSection = document.querySelector('.contact-section');
    const contactContent = document.querySelector('.contact-content');
    const contactLeft = document.querySelector('.contact-left');
    const contactRight = document.querySelector('.contact-right');

    if (contactSection && contactContent && contactLeft && contactRight) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate main content first
                    contactContent.classList.add('animated-in');
                    
                    // Then animate left and right columns with staggered delay
                    setTimeout(() => {
                        contactLeft.classList.add('animated-in');
                    }, 200);
                    
                    setTimeout(() => {
                        contactRight.classList.add('animated-in');
                    }, 400);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(contactSection);
    }

    // Footer animation
    const footer = document.querySelector('footer');
    
    if (footer) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('animated-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(footer);
    }

    // Header hide/show on scroll
    let lastScrollY = window.scrollY;

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
            sendButton.innerHTML = '<span>Preparing Email...</span>';
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

                sendButton.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane send-icon"></i>';
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