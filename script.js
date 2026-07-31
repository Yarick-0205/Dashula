function createPersistentHearts() {
    const heartsCount = 100; // количество сердечек
    for (let i = 0; i < heartsCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💗';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = (10 + Math.random() * 20) + 'px';
        heart.style.opacity = 0.7 + Math.random() * 0.3;
        heart.style.zIndex = 9999;
        document.body.appendChild(heart);

        animateHeart(heart);
    }
}

// Базовая easing-функция (подбирается под очень плавное движение)
function easeInOutCubic(t) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateHeart(heart) {
    const startLeft = parseFloat(heart.style.left);
    const startTop = parseFloat(heart.style.top);
    const deltaX = (Math.random() - 0.5) * 25; // чуть меньше амплитуды для плавности
    const deltaY = (Math.random() - 0.5) * 25;
    const duration = 4000 + Math.random() * 3000; // чуть короче, для более быстрого танца

    const startTime = performance.now();

    function move() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        const currentX = startLeft + deltaX * easedProgress;
        const currentY = startTop + deltaY * easedProgress;

        heart.style.left = currentX + 'vw';
        heart.style.top = currentY + 'vh';

        if (progress < 1) {
            requestAnimationFrame(move);
        } else {
            // После завершения, начинаем заново, чтобы сердечки "плавали"
            animateHeart(heart);
        }
    }

    move();
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', () => {
    createPersistentHearts();
});
