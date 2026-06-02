/* ==========================================================================
   James Vining Psychotherapy - Interactive Logic & Functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Theme Management (Light / Dark Mode)
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Start with light (bright) mode by default, unless they have explicitly saved dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        enableLightMode();
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    });

    function enableDarkMode() {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.className = 'fa-solid fa-sun'; // Sun icon for light mode transition
        localStorage.setItem('theme', 'dark');
    }

    function enableLightMode() {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.className = 'fa-solid fa-moon'; // Moon icon for dark mode transition
        localStorage.setItem('theme', 'light');
    }


    // ----------------------------------------------------
    // 2. Sticky Header Box Shadow
    // ----------------------------------------------------
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // ----------------------------------------------------
    // 3. Mobile Navigation Menu Toggle
    // ----------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // ----------------------------------------------------
    // 4. Scroll Reveal Animations (Intersection Observer)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    // Stop observing once it has been revealed
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        revealElements.forEach(el => el.classList.add('reveal-active'));
    }


    // ----------------------------------------------------
    // 5. Interactive Pricing Switcher
    // ----------------------------------------------------
    const pricingToggle = document.getElementById('pricing-toggle');
    const pricingBadge = document.getElementById('pricing-badge');
    const pricingVal = document.getElementById('pricing-val');
    const labelInd = document.getElementById('label-ind');
    const labelCoup = document.getElementById('label-coup');

    pricingToggle.addEventListener('change', () => {
        if (pricingToggle.checked) {
            // Couples Sessions Active
            pricingBadge.textContent = 'Couples Session';
            pricingVal.textContent = '$250';
            labelCoup.classList.add('active');
            labelInd.classList.remove('active');
        } else {
            // Individual Sessions Active
            pricingBadge.textContent = 'Individual Session';
            pricingVal.textContent = '$180';
            labelInd.classList.add('active');
            labelCoup.classList.remove('active');
        }
    });

    // Make labels clickable to toggle pricing switch
    labelInd.addEventListener('click', () => {
        if (pricingToggle.checked) {
            pricingToggle.checked = false;
            pricingToggle.dispatchEvent(new Event('change'));
        }
    });

    labelCoup.addEventListener('click', () => {
        if (!pricingToggle.checked) {
            pricingToggle.checked = true;
            pricingToggle.dispatchEvent(new Event('change'));
        }
    });


    // ----------------------------------------------------
    // 6. Insurance Checker Logic
    // ----------------------------------------------------
    const insuranceSearch = document.getElementById('insurance-search');
    const checkerResult = document.getElementById('checker-result');

    // List of in-network insurance providers based on Psychology Today profile
    const inNetworkInsurances = [
        'aetna',
        'cigna',
        'united healthcare',
        'unitedhealthcare',
        'uhc',
        'oxford',
        'oscar',
        'oscar health',
        'anthem',
        'blue cross',
        'blue shield',
        'bcbs',
        'anthem bcbs'
    ];

    insuranceSearch.addEventListener('input', () => {
        const query = insuranceSearch.value.trim().toLowerCase();
        
        if (!query) {
            checkerResult.className = 'checker-result';
            checkerResult.innerHTML = '<p class="result-placeholder">Enter your insurance above to check network status.</p>';
            return;
        }

        // Search for a match in our in-network array
        const match = inNetworkInsurances.some(ins => {
            if (query.length < 3) {
                // For very short queries, only do exact matching or match complete words (e.g. "uhc")
                return ins === query || ins.split(/\s+/).includes(query);
            }
            // For longer queries, match if the search term is a substring
            return ins.includes(query) || query.includes(ins);
        });

        if (match) {
            checkerResult.className = 'checker-result result-in-network';
            checkerResult.innerHTML = `
                <p>
                    <i class="fa-solid fa-circle-check" style="margin-right: 8px;"></i>
                    <strong>In-Network:</strong> James Vining is in-network with this provider. Your sessions will likely be covered (copays/deductibles apply).
                </p>
            `;
        } else {
            checkerResult.className = 'checker-result result-out-network';
            checkerResult.innerHTML = `
                <p>
                    <i class="fa-solid fa-circle-info" style="margin-right: 8px;"></i>
                    <strong>Out-of-Network:</strong> This plan may not be directly in-network. However, James provides documentation for Out-of-Network reimbursement, or sliding scale slots may be available.
                </p>
            `;
        }
    });


    // ----------------------------------------------------
    // 7. Interactive Contact Form Validation & Submission
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const successClientName = document.getElementById('success-client-name');
    const successContactPref = document.getElementById('success-contact-pref');
    const resetFormBtn = document.getElementById('reset-form-btn');
    const submitButton = document.getElementById('submit-button');
    const generalError = document.getElementById('form-general-error');
    const generalErrorText = document.getElementById('general-error-text');

    // Simple Email Validator
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Simple Phone Validator (optional, but must be numeric if entered)
    function isValidPhone(phone) {
        if (!phone) return true; // Phone is optional
        // Stripping non-numeric characters to test length
        const cleanNumber = phone.replace(/\D/g, '');
        return cleanNumber.length >= 10;
    }

    // Input blur handlers for dynamic feedback
    const fields = [
        { id: 'client-name', errorId: 'name-error', check: val => val.trim().length > 0 },
        { id: 'client-email', errorId: 'email-error', check: val => isValidEmail(val.trim()) },
        { id: 'client-phone', errorId: 'phone-error', check: val => isValidPhone(val.trim()) },
        { id: 'contact-preference', errorId: 'preference-error', check: val => val !== '' },
        { id: 'interest-area', errorId: 'interest-error', check: val => val !== '' },
        { id: 'client-message', errorId: 'message-error', check: val => val.trim().length > 0 }
    ];

    fields.forEach(field => {
        const inputEl = document.getElementById(field.id);
        if (inputEl) {
            inputEl.addEventListener('blur', () => {
                validateField(field);
            });
            // Clear error on input change
            inputEl.addEventListener('input', () => {
                const group = inputEl.parentElement;
                group.classList.remove('has-error');
                inputEl.setAttribute('aria-invalid', 'false');
            });
            if (inputEl.tagName === 'SELECT') {
                inputEl.addEventListener('change', () => {
                    const group = inputEl.parentElement;
                    group.classList.remove('has-error');
                    inputEl.setAttribute('aria-invalid', 'false');
                });
            }
        }
    });

    function validateField(field) {
        const inputEl = document.getElementById(field.id);
        const group = inputEl.parentElement;
        const value = inputEl.value;
        
        if (!field.check(value)) {
            // Trigger shake again if it's already invalid
            if (group.classList.contains('has-error')) {
                group.classList.remove('has-error');
                group.offsetHeight; // force reflow
            }
            group.classList.add('has-error');
            inputEl.setAttribute('aria-invalid', 'true');
            return false;
        } else {
            group.classList.remove('has-error');
            inputEl.setAttribute('aria-invalid', 'false');
            return true;
        }
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        fields.forEach(field => {
            const isValid = validateField(field);
            if (!isValid) isFormValid = false;
        });

        if (!isFormValid) {
            // Scroll to the first error and focus the input field
            const firstError = document.querySelector('.form-group.has-error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const input = firstError.querySelector('input, select, textarea');
                if (input) input.focus();
            }
            return;
        }

        // Form is valid - Show loading state
        const originalBtnText = submitButton.querySelector('span').textContent;
        const btnIcon = submitButton.querySelector('.btn-icon');
        
        submitButton.disabled = true;
        submitButton.querySelector('span').textContent = 'Sending Inquiry…';
        btnIcon.className = 'fa-solid fa-spinner fa-spin btn-icon';
        if (generalError) generalError.style.display = 'none';

        const clientName = document.getElementById('client-name').value;
        const contactPreference = document.getElementById('contact-preference').value;

        // Send actual email via FormSubmit API using JSON POST
        fetch(contactForm.action || 'send_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Name: clientName,
                Email: document.getElementById('client-email').value,
                Phone: document.getElementById('client-phone').value,
                Preference: contactPreference,
                Support_Area: document.getElementById('interest-area').value,
                Message: document.getElementById('client-message').value
            })
        })
        .then(response => {
            if (response.ok) {
                // Set success screen information
                successClientName.textContent = clientName;
                successContactPref.textContent = contactPreference.toUpperCase();
                
                // Transition view with crossfade animations
                contactForm.classList.add('form-fade-out');
                
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    contactForm.classList.remove('form-fade-out');
                    
                    formSuccess.style.display = 'flex';
                    formSuccess.offsetHeight; // force reflow
                    formSuccess.classList.add('reveal');
                    
                    // Reset form inputs
                    contactForm.reset();
                    if (generalError) generalError.style.display = 'none';
                }, 250);
            } else {
                return response.json().then(errData => {
                    throw new Error(errData.message || "Failed to send email.");
                }).catch(() => {
                    throw new Error("There was a problem sending your message. Please try again or call (347) 835-4967 directly.");
                });
            }
        })
        .catch(err => {
            if (generalError && generalErrorText) {
                generalErrorText.textContent = err.message || "Connection error. Please check your internet connection and try again.";
                generalError.style.display = 'flex';
                generalError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                alert(err.message || "Connection error. Please try again.");
            }
        })
        .finally(() => {
            // Reset button state
            submitButton.disabled = false;
            submitButton.querySelector('span').textContent = originalBtnText;
            btnIcon.className = 'fa-solid fa-paper-plane btn-icon';
        });
    });

    // Reset success screen back to form with transition
    resetFormBtn.addEventListener('click', () => {
        formSuccess.classList.add('form-fade-out');
        
        setTimeout(() => {
            formSuccess.style.display = 'none';
            formSuccess.classList.remove('reveal', 'form-fade-out');
            
            contactForm.style.display = 'block';
            contactForm.classList.add('form-fade-out');
            contactForm.offsetHeight; // force reflow
            contactForm.classList.remove('form-fade-out');
        }, 250);
    });
});
