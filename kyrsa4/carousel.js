document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы карусели
    const carousel = document.querySelector('.carousel');

    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel__slide');
        const prevButton = carousel.querySelector('.carousel__button--prev');
        const nextButton = carousel.querySelector('.carousel__button--next');
        const dots = carousel.querySelectorAll('.carousel__dot');

        // Номер текущего слайда
        let currentSlide = 0;
        // Флаг для предотвращения быстрого переключения слайдов
        let isAnimating = false;
        // Таймер для автоматического переключения слайдов
        let slideInterval;

        // Функция для показа выбранного слайда
        function showSlide(index) {
            // Если анимация в процессе, прерываем выполнение
            if (isAnimating) return;

            isAnimating = true;

            // Удаляем активные классы
            slides.forEach(slide => {
                slide.classList.remove('carousel__slide--active');
                // Добавляем класс для анимации исчезания
                slide.style.opacity = '0';
            });

            dots.forEach(dot => {
                dot.classList.remove('carousel__dot--active');
            });

            // Устанавливаем новый активный слайд
            slides[index].classList.add('carousel__slide--active');
            // Анимируем появление слайда
            slides[index].style.opacity = '1';

            dots[index].classList.add('carousel__dot--active');

            // Сбрасываем флаг анимации через полсекунды
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }

        // Функция для переключения на следующий слайд
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Функция для переключения на предыдущий слайд
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        // Добавляем обработчики событий
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        // Добавляем обработчики для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Функция для запуска автоматического переключения слайдов
        function startSlideshow() {
            stopSlideshow(); // Остановим предыдущий таймер, если он был
            slideInterval = setInterval(nextSlide, 5000); // Переключаем каждые 5 секунд
        }

        // Функция для остановки автоматического переключения слайдов
        function stopSlideshow() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        }

        // Останавливаем слайдшоу при наведении мыши на карусель
        carousel.addEventListener('mouseenter', stopSlideshow);
        // Возобновляем слайдшоу при уходе мыши с карусели
        carousel.addEventListener('mouseleave', startSlideshow);

        // Запускаем автоматическое переключение слайдов
        startSlideshow();

        // Обрабатываем свайпы на мобильных устройствах
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        function handleSwipe() {
            const swipeThreshold = 50; // Минимальное расстояние для свайпа

            if (touchEndX - touchStartX > swipeThreshold) {
                // Свайп вправо - предыдущий слайд
                prevSlide();
            } else if (touchStartX - touchEndX > swipeThreshold) {
                // Свайп влево - следующий слайд
                nextSlide();
            }
        }
    }
});