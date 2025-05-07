// -------- SKRYPT DLA MENU MOBILNEGO --------
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link'); // Pobierz wszystkie linki w menu mobilnym

mobileMenuButton.addEventListener('click', () => {
	// Przełącz klasę 'hidden' lub niestandardową klasę do pokazywania/ukrywania
	mobileMenu.classList.toggle('hidden');
	// Opcjonalnie: Zmień ikonę przycisku
	const menuIcon = mobileMenuButton.querySelector('i');
	if (mobileMenu.classList.contains('hidden')) {
		menuIcon.classList.remove('ri-close-line');
		menuIcon.classList.add('ri-menu-line');
	} else {
		menuIcon.classList.remove('ri-menu-line');
		menuIcon.classList.add('ri-close-line');
	}
});

// Zamknij menu mobilne po kliknięciu linku w menu
mobileNavLinks.forEach(link => {
	link.addEventListener('click', () => {
		mobileMenu.classList.add('hidden');
		// Przywróć ikonę menu
		const menuIcon = mobileMenuButton.querySelector('i');
		menuIcon.classList.remove('ri-close-line');
		menuIcon.classList.add('ri-menu-line');
	});
});

// -------- SMOOTH SCROLLING DLA KOTWIC --------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		const targetId = this.getAttribute('href');
		const targetElement = document.querySelector(targetId);

		if (targetElement) {
			// Oblicz pozycję docelową, uwzględniając wysokość paska nawigacyjnego
			const navbarHeight = document.getElementById('navbar').offsetHeight;
			const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth',
			});

			// Opcjonalnie: Zaktualizuj adres URL po przewinięciu (dla linków desktopowych)
			if (!this.classList.contains('mobile-nav-link')) {
				history.pushState(null, null, targetId);
			}
		}
	});
});

// -------- AKTYWNA KLASA DLA LINKÓW NAVIGACYJNYCH PRZY PRZEWIJANIU --------
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function updateActiveNavLink() {
	let current = '';
	sections.forEach(section => {
		const sectionTop = section.offsetTop - document.getElementById('navbar').offsetHeight - 50; // Ustaw próg
		const sectionHeight = section.clientHeight;
		if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
			current = '#' + section.getAttribute('id');
		}
	});

	navLinks.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href') === current) {
			link.classList.add('active');
		} else if (current === '' && link.getAttribute('href') === '#hero') {
			// Jeśli jesteśmy na samej górze, ustaw "Strona główna" jako aktywną
			link.classList.add('active');
		}
	});
	mobileNavLinks.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href') === current) {
			link.classList.add('active');
		} else if (current === '' && link.getAttribute('href') === '#hero') {
			link.classList.add('active');
		}
	});
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink); // Ustaw aktywny link po załadowaniu strony (np. jeśli strona została odświeżona na innej sekcji)

// -------- ZMIANA WYSOKOŚCI NAVBARU PRZY PRZEWIJANIU (opcjonalne) --------
const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero'); // Sekcja Hero

function updateNavbarHeight() {
	if (window.scrollY > (heroSection ? heroSection.offsetHeight / 2 : 100)) {
		// Zmniejsz navbar po przewinięciu połowy sekcji Hero lub 100px
		navbar.classList.add('py-2'); // Mniejszy padding
		navbar.classList.remove('py-3'); // Usunięcie większego paddingu
	} else {
		navbar.classList.add('py-3'); // Większy padding
		navbar.classList.remove('py-2'); // Usunięcie mniejszego paddingu
	}
}

window.addEventListener('scroll', updateNavbarHeight);
window.addEventListener('load', updateNavbarHeight); // Sprawdź wysokość po załadowaniu
