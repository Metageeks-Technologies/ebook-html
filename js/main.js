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

    // Timer logic
    const offerTimerElement = document.getElementById('offer-timer');
    const initialDuration = 8 * 60 * 60; // 8 hours in seconds
    let timerInterval;

    function startTimer(duration) {
        let timer = duration;
        let hours, minutes, seconds;

        timerInterval = setInterval(() => {
            hours = parseInt(timer / 3600, 10);
            minutes = parseInt((timer % 3600) / 60, 10);
            seconds = parseInt(timer % 60, 10);

            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            offerTimerElement.textContent = `⚡ Offer Expires in: ${hours}:${minutes}:${seconds}`;

            if (--timer < 0) {
                clearInterval(timerInterval);
                startTimer(initialDuration); // Reset to 8 hours
            }
        }, 1000);
    }

    startTimer(initialDuration); // Start the timer on page load

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