document.addEventListener('DOMContentLoaded', function() {
    // Фильтрация постов по категориям
    const categoryTags = document.querySelectorAll('.category-tag');
    const communityPosts = document.querySelectorAll('.community-post');

    categoryTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Удаляем активный класс у всех тегов
            categoryTags.forEach(t => t.classList.remove('category-tag--active'));

            // Добавляем активный класс текущему тегу
            this.classList.add('category-tag--active');

            // Получаем категорию из атрибута data-category
            const category = this.dataset.category;

            // Фильтруем посты
            communityPosts.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // Сортировка постов
    const sortSelect = document.querySelector('.sort-select');

    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const value = this.value;
            const postsContainer = document.querySelector('.community-posts__grid');
            const posts = Array.from(document.querySelectorAll('.community-post'));

            // Сортировка постов в зависимости от выбранного значения
            if (value === 'newest') {
                // Здесь должна быть логика сортировки по дате
                // Для примера просто перемешаем посты
                shufflePosts(posts, postsContainer);
            } else if (value === 'popular') {
                // Сортировка по популярности (количеству просмотров)
                sortByViews(posts, postsContainer);
            } else if (value === 'discussed') {
                // Сортировка по количеству комментариев
                sortByComments(posts, postsContainer);
            }
        });
    }

    // Функция для перемешивания постов (для демонстрации)
    function shufflePosts(posts, container) {
        for (let i = posts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [posts[i], posts[j]] = [posts[j], posts[i]];
        }

        // Очищаем контейнер и добавляем посты в новом порядке
        container.innerHTML = '';
        posts.forEach(post => {
            container.appendChild(post);
        });
    }

    // Функция для сортировки по просмотрам
    function sortByViews(posts, container) {
        posts.sort((a, b) => {
            const viewsA = parseInt(a.querySelector('.community-post__stat:first-child span').textContent.replace(/[^\d]/g, ''));
            const viewsB = parseInt(b.querySelector('.community-post__stat:first-child span').textContent.replace(/[^\d]/g, ''));
            return viewsB - viewsA;
        });

        // Очищаем контейнер и добавляем посты в новом порядке
        container.innerHTML = '';
        posts.forEach(post => {
            container.appendChild(post);
        });
    }

    // Функция для сортировки по комментариям
    function sortByComments(posts, container) {
        posts.sort((a, b) => {
            const commentsA = parseInt(a.querySelector('.community-post__stat:last-child span').textContent.replace(/[^\d]/g, ''));
            const commentsB = parseInt(b.querySelector('.community-post__stat:last-child span').textContent.replace(/[^\d]/g, ''));
            return commentsB - commentsA;
        });

        // Очищаем контейнер и добавляем посты в новом порядке
        container.innerHTML = '';
        posts.forEach(post => {
            container.appendChild(post);
        });
    }

    // Обработка поиска
    const searchForm = document.querySelector('.search-form');

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const searchQuery = this.querySelector('.search-form__input').value.toLowerCase();

            if (searchQuery.trim() === '') {
                return;
            }

            // Фильтруем посты по поисковому запросу
            communityPosts.forEach(post => {
                const title = post.querySelector('.community-post__title').textContent.toLowerCase();
                const excerpt = post.querySelector('.community-post__excerpt').textContent.toLowerCase();

                if (title.includes(searchQuery) || excerpt.includes(searchQuery)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });

            // Сбрасываем активный класс у всех тегов категорий
            categoryTags.forEach(tag => tag.classList.remove('category-tag--active'));

            // Устанавливаем активный класс для тега "Все"
            document.querySelector('.category-tag[data-category="all"]').classList.add('category-tag--active');
        });
    }

    // Обработка пагинации
    const paginationButtons = document.querySelectorAll('.pagination-button');

    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            paginationButtons.forEach(btn => btn.classList.remove('pagination-button--active'));

            // Если это не кнопка "Следующая", добавляем активный класс
            if (!this.classList.contains('pagination-button--next')) {
                this.classList.add('pagination-button--active');
            }

            // Здесь должна быть логика загрузки постов для выбранной страницы
            // Для демонстрации просто прокрутим страницу вверх
            window.scrollTo({
                top: document.querySelector('.community-posts').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
});