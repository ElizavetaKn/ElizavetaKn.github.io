document.addEventListener('DOMContentLoaded', function() {
    // Получаем кнопку переключения темы
    const themeToggle = document.querySelector('.theme-toggle');

    // Проверяем, есть ли сохраненная тема в localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Устанавливаем начальную тему
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');

    // Добавляем обработчик события клика на кнопку
    themeToggle.addEventListener('click', function() {
        // Переключаем класс dark-theme на body
        document.body.classList.toggle('dark-theme');

        // Сохраняем выбранную тему в localStorage
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');

        console.log('Тема переключена на: ' + (isDarkTheme ? 'темную' : 'светлую'));
    });
});