function createPersistentHearts() {
    const heartsCount = 120; // сколько сердечек
    for(let i = 0; i < heartsCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💗'; // сердечко
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw'; // случайная позиция по горизонтали
        heart.style.top = Math.random() * 100 + 'vh';   // случайная позиция по вертикали
        heart.style.fontSize = (10 + Math.random() * 20) + 'px'; // размер
        heart.style.opacity = 0.7 + Math.random() * 0.3; // прозрачность
        heart.style.zIndex = 9999; // поверх всего
        document.body.appendChild(heart);

        animateHeart(heart);
    }
}

function animateHeart(heart) {
    // Бесконечное движение с помощью setInterval или requestAnimationFrame
    const deltaX = (Math.random() - 0.5) * 50; // случайное смещение по X
    const deltaY = (Math.random() - 0.5) * 50; // случайное смещение по Y
    const duration = 10000 + Math.random() * 5000; // случайное время анимации

    const startX = parseFloat(heart.style.left);
    const startY = parseFloat(heart.style.top);

    const startTime = performance.now();

    function move() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Новые координаты
        const currentX = startX + deltaX * progress;
        const currentY = startY + deltaY * progress;

        heart.style.left = currentX + 'vw';
        heart.style.top = currentY + 'vh';

        if (progress < 1) {
            requestAnimationFrame(move);
        } else {
            // Зацикливаем движение, чтобы сердечки не исчезали
            animateHeart(heart);
        }
    }

    move();
}

// запуск при загрузке
document.addEventListener('DOMContentLoaded', () => {
    createPersistentHearts();
});