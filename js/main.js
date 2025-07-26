document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper for testimonials
    new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    const applyDiscountBtn = document.getElementById('applyDiscountBtn');
    const priceDisplayBottom = document.getElementById('priceDisplayBottom');
    const discountMessageBottom = document.getElementById('discountMessageBottom');
    const discountCheckbox = document.getElementById('discountCheckbox');
    const priceDisplayButton = document.getElementById('priceDisplayButton');

    console.log('Elements retrieved:', { applyDiscountBtn, priceDisplayBottom, discountMessageBottom, discountCheckbox, priceDisplayButton });

    let discountApplied = false;
    const originalPrice = 4999;
    const discountedPrice = 499;

    applyDiscountBtn.addEventListener('click', function() {
        console.log('Button clicked!');
        console.log('Before click - discountApplied:', discountApplied, 'discountCheckbox.checked:', discountCheckbox.checked);
        if (discountApplied) {
            // Remove discount
            animatePrice(discountedPrice, originalPrice, priceDisplayBottom, priceDisplayButton);
            discountMessageBottom.classList.add('hidden');
            discountCheckbox.checked = false;
            discountApplied = false;
            console.log('Discount removed. After - discountApplied:', discountApplied, 'discountCheckbox.checked:', discountCheckbox.checked);
        } else {
            // Apply discount
            animatePrice(originalPrice, discountedPrice, priceDisplayBottom, priceDisplayButton);
            discountMessageBottom.classList.remove('hidden');
            discountCheckbox.checked = true;
            discountApplied = true;
            console.log('Discount applied. After - discountApplied:', discountApplied, 'discountCheckbox.checked:', discountCheckbox.checked);
        }
    });
});

function openUpgradePopup() {
    document.getElementById('popup1').classList.remove('hidden');
}

function closePopup1() {
    document.getElementById('popup1').classList.add('hidden');
}

function animatePrice(start, end, element1, element2) {
    let current = start;
    const increment = (end - start) / 100; // 100 steps for animation
    const duration = 500; // milliseconds
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;

        if (progress < 1) {
            current = start + increment * progress * 100;
            element1.textContent = `₹${Math.round(current)}`;
            element2.textContent = `Get Full System for ₹${Math.round(current)}`;
            requestAnimationFrame(step);
        } else {
            element1.textContent = `₹${end}`;
            element2.textContent = `Get Full System for ₹${end}`;
            // Ensure the final price is exactly the end value
            element1.textContent = `₹${end}`;
            element2.textContent = `Get Full System for ₹${end}`;
        }
    }
    requestAnimationFrame(step);
}