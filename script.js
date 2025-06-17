// script.js

document.addEventListener('DOMContentLoaded', () => {
    const mobileSidebar = document.getElementById('mobileSidebar');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    const footerAccordionToggles = document.querySelectorAll('.footer-accordion-toggle');
    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.product-card');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountSpan = document.getElementById('cartCount');
    const heroCarouselInner = document.getElementById('heroCarouselInner');
    const heroDotsContainer = document.getElementById('heroDots');
    const instagramCarousel = document.getElementById('instagramCarousel');
    const instagramDotsContainer = document.getElementById('instagramDots');
    const addProductLink = document.getElementById('addProductLink');
    const newsletterSignupBtn = document.getElementById('newsletterSignupBtn');
    const newsletterEmail = document.getElementById('newsletterEmail');

    let cartCount = 0; // Initialize cart count

    // --- Mobile Sidebar Functionality ---
    menuToggle.addEventListener('click', () => {
        mobileSidebar.classList.add('open');
    });

    closeSidebar.addEventListener('click', () => {
        mobileSidebar.classList.remove('open');
    });

    // Close sidebar when clicking outside (optional, but good UX)
    document.addEventListener('click', (event) => {
        if (!mobileSidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileSidebar.classList.remove('open');
        }
    });

    // Handle back button for a smooth navigation experience (conceptual)
    document.getElementById('backButton').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        showNotification('Navigating back... (This is a demo)');
    });


    // --- Accordion Functionality for Categories ---
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('.toggle-icon');

            if (content.classList.contains('open')) {
                content.classList.remove('open');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                // Close other open accordions in the sidebar
                accordionToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        const otherContent = otherToggle.nextElementSibling;
                        const otherIcon = otherToggle.querySelector('.toggle-icon');
                        if (otherContent.classList.contains('open')) {
                            otherContent.classList.remove('open');
                            otherIcon.classList.remove('fa-chevron-up');
                            otherIcon.classList.add('fa-chevron-down');
                        }
                    }
                });
                content.classList.add('open');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });

    // --- Footer Accordion Functionality ---
    footerAccordionToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('.toggle-icon');

            if (content.classList.contains('open')) {
                content.classList.remove('open');
                icon.style.transform = 'rotate(0deg)';
            } else {
                // Close other open accordions in the footer
                footerAccordionToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        const otherContent = otherToggle.nextElementSibling;
                        const otherIcon = otherToggle.querySelector('.toggle-icon');
                        if (otherContent.classList.contains('open')) {
                            otherContent.classList.remove('open');
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });
                content.classList.add('open');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });


    // --- Search Functionality ---
    searchToggle.addEventListener('click', () => {
        searchInput.classList.toggle('hidden');
        if (!searchInput.classList.contains('hidden')) {
            searchInput.focus();
        } else {
            searchInput.value = ''; // Clear search on close
            productCards.forEach(card => card.classList.remove('hidden-by-search')); // Show all products
        }
    });

    searchInput.addEventListener('keyup', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        productCards.forEach(card => {
            const productName = card.dataset.name.toLowerCase();
            if (productName.includes(searchTerm) || searchTerm === '') {
                card.classList.remove('hidden-by-search');
            } else {
                card.classList.add('hidden-by-search');
            }
        });
    });


    // --- Add to Cart Functionality ---
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            cartCountSpan.textContent = cartCount;
            const productName = button.dataset.productName || 'Item';
            showNotification(`${productName} added to cart!`);
        });
    });

    // --- Newsletter Signup Functionality ---
    newsletterSignupBtn.addEventListener('click', () => {
        const email = newsletterEmail.value;
        if (email && email.includes('@')) {
            showNotification(`Thanks for signing up, ${email}!`);
            newsletterEmail.value = ''; // Clear the input
        } else {
            showNotification('Please enter a valid email address.', 'red'); // Optional: different color for error
        }
    });

    // Simple notification function (replaces alert())
    function showNotification(message, type = 'green') {
        const notificationDiv = document.createElement('div');
        notificationDiv.className = `fixed bottom-4 left-1/2 -translate-x-1/2 bg-${type}-500 text-white px-4 py-2 rounded-md shadow-lg z-50 transition-opacity duration-300 opacity-0`;
        notificationDiv.textContent = message;
        document.body.appendChild(notificationDiv);

        // Animate in
        setTimeout(() => {
            notificationDiv.style.opacity = '1';
        }, 10); // Small delay for transition to work

        // Animate out and remove
        setTimeout(() => {
            notificationDiv.style.opacity = '0';
            notificationDiv.addEventListener('transitionend', () => notificationDiv.remove());
        }, 2000);
    }

    // --- Carousel/Slider Functionality ---
    function setupCarousel(carouselInner, dotsContainer) {
        let currentIndex = 0;
        const items = carouselInner.children;
        const totalItems = items.length;
        if (totalItems === 0) return; // Exit if no items

        // Create dots
        if (dotsContainer) {
            dotsContainer.innerHTML = ''; // Clear existing dots
            for (let i = 0; i < totalItems; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot', 'mx-1');
                if (i === 0) dot.classList.add('active');
                dot.dataset.slide = i;
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateCarousel();
                });
                dotsContainer.appendChild(dot);
            }
        }

        function updateCarousel() {
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
            // Update active dot
            if (dotsContainer) {
                Array.from(dotsContainer.children).forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }

        // Auto-slide
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000); // Change slide every 5 seconds

        updateCarousel(); // Initialize position
    }

    // Setup carousels for hero and instagram
    if (heroCarouselInner && heroDotsContainer) {
        setupCarousel(heroCarouselInner, heroDotsContainer);
    }

    if (instagramCarousel && instagramDotsContainer) {
        setupCarousel(instagramCarousel, instagramDotsContainer);
    }
    
    // Simulate "Add Product" functionality (for demonstration)
    addProductLink.addEventListener('click', (event) => {
        event.preventDefault();
        showNotification('Product Add interface (Admin only). This is a demo link.');
        // In a real application, this would redirect to an admin panel
        // or open a modal for product creation.
    });
});

