// Плавная прокрутка для якорных ссылок
document.addEventListener('DOMContentLoaded', function() {
    // Получаем все якорные ссылки
    const anchors = document.querySelectorAll('a[href^="#"]');

    // Для каждой ссылки добавляем обработчик события клика
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            // Получаем ID элемента, к которому нужно прокрутить
            const targetId = this.getAttribute('href');

            // Если ID не пустой и не просто "#"
            if (targetId !== '#') {
                // Находим элемент по ID
                const targetElement = document.querySelector(targetId);

                // Если элемент существует, прокручиваем к нему
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Отступ для учета фиксированного меню
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Мобильное меню
    const burgerMenu = document.querySelector('.burger-menu');
    const navigation = document.querySelector('.navigation');

    burgerMenu.addEventListener('click', function() {
        // Переключаем классы активности у кнопки и навигации
        this.classList.toggle('active');
        navigation.classList.toggle('active');

        // Блокируем/разблокируем прокрутку страницы при открытом меню
        if (navigation.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Закрытие мобильного меню при клике на ссылку
    const mobileLinks = document.querySelectorAll('.navigation__link');

    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navigation.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                navigation.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Закрытие мобильного меню при клике вне меню
    document.addEventListener('click', function(event) {
        if (!navigation.contains(event.target) && !burgerMenu.contains(event.target) && navigation.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            navigation.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Отправка формы контактов
    const contactForm = document.querySelector('.contact__form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Здесь можно добавить валидацию формы и отправку данных
            // Но для примера просто выведем сообщение об успешной отправке
            alert('Сообщение успешно отправлено!');
            this.reset();
        });
    }
});