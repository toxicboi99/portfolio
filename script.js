// Theme handling
(function themeInit() {
	const root = document.documentElement;
	const stored = localStorage.getItem('theme');
	if (stored === 'light' || stored === 'dark') {
		root.classList.toggle('light', stored === 'light');
		return;
	}
	const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
	root.classList.toggle('light', prefersLight);
})();

document.addEventListener('DOMContentLoaded', () => {
	const navToggle = document.getElementById('navToggle');
	const primaryNav = document.getElementById('primaryNav');
	const themeToggle = document.getElementById('themeToggle');
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());

	// Mobile nav toggle
	if (navToggle && primaryNav) {
		const closeNav = () => {
			navToggle.setAttribute('aria-expanded', 'false');
			primaryNav.classList.remove('open');
			primaryNav.setAttribute('aria-expanded', 'false');
			document.body.classList.remove('menu-open');
		};

		navToggle.addEventListener('click', (e) => {
			e.stopPropagation();
			const expanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', String(!expanded));
			primaryNav.classList.toggle('open');
			primaryNav.setAttribute('aria-expanded', String(!expanded));
			
			// Prevent body scroll when menu is open
			if (!expanded) {
				document.body.classList.add('menu-open');
			} else {
				document.body.classList.remove('menu-open');
			}
		});

		// Close on link click (mobile)
		primaryNav.querySelectorAll('a').forEach((a) => {
			a.addEventListener('click', () => {
				closeNav();
			});
		});

		// Close on outside click
		document.addEventListener('click', (e) => {
			if (primaryNav.classList.contains('open') && 
				!primaryNav.contains(e.target) && 
				!navToggle.contains(e.target)) {
				closeNav();
			}
		});

		// Close on Escape key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && primaryNav.classList.contains('open')) {
				closeNav();
				navToggle.focus();
			}
		});
	}

	// Theme toggle
	if (themeToggle) {
		themeToggle.addEventListener('click', () => {
			document.documentElement.classList.toggle('light');
			const isLight = document.documentElement.classList.contains('light');
			localStorage.setItem('theme', isLight ? 'light' : 'dark');
			themeToggle.textContent = isLight ? '☀️' : '🌙';
		});
		// set initial icon
		const isLightNow = document.documentElement.classList.contains('light');
		themeToggle.textContent = isLightNow ? '☀️' : '🌙';
	}

	// Scroll progress indicator
	const scrollProgress = document.createElement('div');
	scrollProgress.className = 'scroll-progress';
	document.body.appendChild(scrollProgress);

	const updateScrollProgress = () => {
		const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
		const scrolled = window.pageYOffset;
		const progress = scrolled / windowHeight;
		scrollProgress.style.transform = `scaleX(${progress})`;
	};

	window.addEventListener('scroll', updateScrollProgress);
	updateScrollProgress();

	// IntersectionObserver for reveal animations
	const revealEls = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window && revealEls.length) {
		// Respect prefers-reduced-motion
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const threshold = prefersReducedMotion ? 0 : 0.1;
		
		const io = new IntersectionObserver((entries, obs) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					obs.unobserve(entry.target);
				}
			});
		}, { 
			threshold: threshold,
			rootMargin: '0px 0px -50px 0px'
		});
		revealEls.forEach((el) => io.observe(el));
	} else {
		revealEls.forEach((el) => el.classList.add('is-visible'));
	}

	// Animate skills list items
	const skillsItems = document.querySelectorAll('.skills li');
	if ('IntersectionObserver' in window && skillsItems.length) {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const threshold = prefersReducedMotion ? 0 : 0.1;
		
		const skillsIO = new IntersectionObserver((entries, obs) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					obs.unobserve(entry.target);
				}
			});
		}, { 
			threshold: threshold,
			rootMargin: '0px 0px -30px 0px'
		});
		skillsItems.forEach((el) => skillsIO.observe(el));
	} else {
		skillsItems.forEach((el) => el.classList.add('is-visible'));
	}

	// Animate section headings on scroll
	const sectionHeadings = document.querySelectorAll('.section h2');
	if ('IntersectionObserver' in window && sectionHeadings.length) {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const threshold = prefersReducedMotion ? 0 : 0.2;
		
		const headingsIO = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.animationPlayState = 'running';
				}
			});
		}, { 
			threshold: threshold,
			rootMargin: '0px 0px -100px 0px'
		});
		sectionHeadings.forEach((el) => headingsIO.observe(el));
	}

	// Smooth scroll for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (href === '#' || href === '#top') return;
			
			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				const headerOffset = 80;
				const elementPosition = target.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		});
	});

	// Contact form validation and fake submit
	const form = document.getElementById('contactForm');
	const statusEl = document.getElementById('formStatus');
	if (form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const name = /** @type {HTMLInputElement} */(document.getElementById('name'));
			const email = /** @type {HTMLInputElement} */(document.getElementById('email'));
			const message = /** @type {HTMLTextAreaElement} */(document.getElementById('message'));

			let valid = true;
			clearError('name');
			clearError('email');
			clearError('message');

			if (!name.value.trim()) { setError('name', 'Please enter your name'); valid = false; }
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { setError('email', 'Please enter a valid email'); valid = false; }
			if (!message.value.trim() || message.value.trim().length < 10) { setError('message', 'Please enter a message (10+ chars)'); valid = false; }

			if (!valid) return;
			
			const submitBtn = form.querySelector('button[type="submit"]');
			if (submitBtn) {
				submitBtn.classList.add('btn--loading');
				submitBtn.disabled = true;
			}
			
			if (statusEl) {
				statusEl.textContent = 'Sending…';
				statusEl.style.opacity = '0';
				setTimeout(() => {
					statusEl.style.opacity = '1';
				}, 10);
			}
			
			// simulate async submit
			setTimeout(() => {
				if (statusEl) {
					statusEl.textContent = 'Thanks! Your message has been sent.';
					statusEl.style.animation = 'fadeInUp 0.5s ease-out';
				}
				form.reset();
				if (submitBtn) {
					submitBtn.classList.remove('btn--loading');
					submitBtn.disabled = false;
				}
			}, 1500);
		});
	}

	function setError(field, msg) {
		const p = document.querySelector(`.error[data-for="${field}"]`);
		if (p) p.textContent = msg;
	}
	function clearError(field) {
		const p = document.querySelector(`.error[data-for="${field}"]`);
		if (p) p.textContent = '';
	}


	// Floating WhatsApp widget
	const whatsappWidget = document.createElement('div');
	whatsappWidget.className = 'whatsapp-widget';
	whatsappWidget.innerHTML = `
		<div class="whatsapp-widget__button whatsapp-widget__button--business">
			<a href="https://wa.me/9779829409955?text=Hello%20Ritesh%2C%20I%20would%20like%20to%20connect%20on%20WhatsApp." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp business +977 9829409955">
				<span class="whatsapp-widget__icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 2.04C6.47 2.04 1.96 6.55 1.96 12.08c0 2.14.7 4.12 1.88 5.75L2 22l4.33-1.15c1.56 1.06 3.42 1.69 5.39 1.69 5.53 0 10.04-4.51 10.04-10.04S17.53 2.04 12 2.04z" fill="#128C7E"/>
						<path d="M8.7 8.5h2.1c.26 0 .48.23.48.5v.8c0 .27-.22.5-.48.5H8.7v1h2.1c.27 0 .48.22.48.5v.8c0 .27-.21.5-.48.5H8.7v2h2.1c.27 0 .48.22.48.5v.8c0 .27-.21.5-.48.5H7.5c-.28 0-.5-.23-.5-.5V8.99c0-.28.22-.5.5-.5h1.2z" fill="#fff"/>
						<path d="M14.9 8.18c.06 0 .12.01.17.03l.03.01c.18.06.31.24.31.43v7.75a.5.5 0 0 1-.8.4l-5.84-4.06a.5.5 0 0 1 0-.83l5.84-3.95c.11-.07.24-.11.37-.11z" fill="#fff" opacity="0.75"/>
					</svg>
				</span>
			</a>
		</div>
		<div class="whatsapp-widget__button whatsapp-widget__button--personal">
			<a href="https://wa.me/919234670937?text=Hello%20Ritesh%2C%20I%20would%20like%20to%20connect%20on%20WhatsApp." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp personal +91 9234670937">
				<span class="whatsapp-widget__icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 2.04C6.47 2.04 1.96 6.55 1.96 12.08c0 2.14.7 4.12 1.88 5.75L2 22l4.33-1.15c1.56 1.06 3.42 1.69 5.39 1.69 5.53 0 10.04-4.51 10.04-10.04S17.53 2.04 12 2.04z" fill="#25D366"/>
						<path d="M17.16 14.68c-.28-.14-1.65-.81-1.91-.9-.26-.09-.45-.13-.64.13-.19.26-.72.9-.89 1.09-.16.19-.33.21-.61.07-.28-.14-1.18-.44-2.24-1.37-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.47.14-.16.18-.27.28-.46.09-.19.05-.36-.03-.5-.08-.14-.64-1.54-.88-2.1-.23-.55-.47-.48-.64-.49-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.35-.25.28-.95.92-.95 2.25s.97 2.61 1.11 2.79c.14.19 1.92 2.94 4.66 4.12.65.28 1.16.45 1.56.58.66.21 1.26.18 1.74.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.26-.19-.54-.33z" fill="#fff"/>
					</svg>
				</span>
			</a>
		</div>
	`;
	document.body.appendChild(whatsappWidget);

	// Page Transitions
	const pageTransition = document.querySelector('.page-transition');
	const links = document.querySelectorAll('a[href$=".html"]');
	
	links.forEach(link => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href');
			if (href && !href.startsWith('#')) {
				e.preventDefault();
				if (pageTransition) {
					pageTransition.classList.add('active');
				}
				setTimeout(() => {
					window.location.href = href;
				}, 450);
			}
		});
	});



	// Copy code functionality
	const copyButtons = document.querySelectorAll('.code-snippet-3d .btn');
	copyButtons.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const codeBlock = btn.closest('.code-snippet-3d')?.querySelector('code');
			if (codeBlock) {
				navigator.clipboard.writeText(codeBlock.textContent).then(() => {
					const originalText = btn.textContent;
					btn.textContent = 'Copied!';
					setTimeout(() => {
						btn.textContent = originalText;
					}, 2000);
				});
			}
		});
	});

	// Enhanced form validation for contact page
	const contactForm = document.getElementById('contactForm');
	if (contactForm) {
		const subjectField = document.getElementById('subject');
		if (subjectField) {
			contactForm.addEventListener('submit', (e) => {
				const subject = subjectField.value.trim();
				if (!subject) {
					setError('subject', 'Please enter a subject');
					e.preventDefault();
				}
			});
		}
	}

	// Certificate Modal functionality
	const certificateModal = document.getElementById('certificateModal');
	const modalImage = document.getElementById('modalImage');
	const modalClose = document.querySelector('.certificate-modal-close');
	const certificateViewBtns = document.querySelectorAll('.certificate-view-btn');
	const certificateImages = document.querySelectorAll('.certificate-image');

	// Open modal when clicking view button
	certificateViewBtns.forEach((btn, index) => {
		btn.addEventListener('click', (e) => {
			e.stopPropagation();
			const certificateItem = btn.closest('.certificate-item');
			const img = certificateItem.querySelector('.certificate-image');
			if (img && modalImage) {
				modalImage.src = img.src;
				modalImage.alt = img.alt;
				if (certificateModal) {
					certificateModal.classList.add('active');
					certificateModal.setAttribute('aria-hidden', 'false');
					document.body.style.overflow = 'hidden';
				}
			}
		});
	});

	// Open modal when clicking certificate image
	certificateImages.forEach((img) => {
		img.addEventListener('click', () => {
			if (modalImage) {
				modalImage.src = img.src;
				modalImage.alt = img.alt;
				if (certificateModal) {
					certificateModal.classList.add('active');
					certificateModal.setAttribute('aria-hidden', 'false');
					document.body.style.overflow = 'hidden';
				}
			}
		});
	});

	// Close modal
	function closeCertificateModal() {
		if (certificateModal) {
			certificateModal.classList.remove('active');
			certificateModal.setAttribute('aria-hidden', 'true');
			document.body.style.overflow = '';
		}
	}

	if (modalClose) {
		modalClose.addEventListener('click', closeCertificateModal);
	}

	if (certificateModal) {
		const overlay = certificateModal.querySelector('.certificate-modal-overlay');
		if (overlay) {
			overlay.addEventListener('click', closeCertificateModal);
		}

		// Close on Escape key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
				closeCertificateModal();
			}
		});
	}
});

