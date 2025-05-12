document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы формы
    const form = document.getElementById('create-post-form');
    const titleInput = document.getElementById('post-title');
    const categorySelect = document.getElementById('post-category');
    const imageInput = document.getElementById('post-image');
    const imagePreview = document.getElementById('image-preview');
    const editorContent = document.getElementById('post-content');
    const hiddenContent = document.getElementById('post-content-hidden');
    const tagsInput = document.getElementById('post-tags');
    const previewButton = document.getElementById('preview-button');
    const previewModal = document.getElementById('preview-modal');
    const closePreviewButton = document.getElementById('close-preview');

    // Элементы предпросмотра
    const previewTitle = document.getElementById('preview-title');
    const previewCategory = document.getElementById('preview-category');
    const previewImageContainer = document.getElementById('preview-image-container');
    const previewImage = document.getElementById('preview-image');
    const previewContent = document.getElementById('preview-content');
    const previewTags = document.getElementById('preview-tags');

    // Обработчик загрузки изображения
    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function(e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Предпросмотр изображения">`;
                imagePreview.style.display = 'block';
            };

            reader.readAsDataURL(file);
        }
    });

    // Инициализация редактора
    const editorButtons = document.querySelectorAll('.editor__button');

    editorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const command = this.dataset.command;
            const value = this.dataset.value || '';

            if (command === 'createLink') {
                const url = prompt('Введите URL ссылки:', 'https://');
                if (url) {
                    document.execCommand(command, false, url);
                }
            } else if (command === 'insertImage') {
                const url = prompt('Введите URL изображения:', 'https://');
                if (url) {
                    document.execCommand(command, false, url);
                }
            } else {
                document.execCommand(command, false, value);
            }

            // Обновляем активное состояние кнопок
            updateButtonStates();
        });
    });

    // Обновление состояния кнопок редактора
    function updateButtonStates() {
        editorButtons.forEach(button => {
            const command = button.dataset.command;

            if (command === 'formatBlock') {
                const value = button.dataset.value;
                const formatValue = document.queryCommandValue('formatBlock');
                button.classList.toggle('active', formatValue === value);
            } else {
                button.classList.toggle('active', document.queryCommandState(command));
            }
        });
    }

    // Обработчик фокуса на редакторе
    editorContent.addEventListener('focus', updateButtonStates);
    editorContent.addEventListener('keyup', updateButtonStates);
    editorContent.addEventListener('mouseup', updateButtonStates);

    // Обработчик изменений в редакторе
    editorContent.addEventListener('input', function() {
        hiddenContent.value = this.innerHTML;
    });

    // Обработчик кнопки предпросмотра
    previewButton.addEventListener('click', function() {
        // Заполняем данные предпросмотра
        previewTitle.textContent = titleInput.value || 'Заголовок поста';

        const categoryText = categorySelect.options[categorySelect.selectedIndex]?.text;
        previewCategory.textContent = categoryText || 'Категория';

        if (imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImageContainer.style.display = 'block';
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            previewImageContainer.style.display = 'none';
        }

        previewContent.innerHTML = editorContent.innerHTML;

        // Обрабатываем теги
        const tags = tagsInput.value.split(',').filter(tag => tag.trim() !== '');
        previewTags.innerHTML = '';

        tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'preview-post__tag';
            tagElement.textContent = tag.trim();
            previewTags.appendChild(tagElement);
        });

        // Показываем модальное окно
        previewModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Закрытие модального окна
    closePreviewButton.addEventListener('click', function() {
        previewModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Закрытие модального окна при клике вне его содержимого
    previewModal.addEventListener('click', function(e) {
        if (e.target === previewModal) {
            previewModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Проверяем заполнение обязательных полей
        if (!titleInput.value) {
            alert('Пожалуйста, введите заголовок поста');
            titleInput.focus();
            return;
        }

        if (!categorySelect.value) {
            alert('Пожалуйста, выберите категорию');
            categorySelect.focus();
            return;
        }

        if (!editorContent.textContent.trim()) {
            alert('Пожалуйста, добавьте содержание поста');
            editorContent.focus();
            return;
        }

        // Сохраняем содержимое редактора в скрытое поле
        hiddenContent.value = editorContent.innerHTML;

        // Имитация отправки формы
        // В реальном проекте здесь был бы AJAX запрос на сервер

        // Показываем сообщение об успешной публикации
        alert('Пост успешно опубликован!');

        // Перенаправляем на главную страницу
        window.location.href = 'index.html';
    });

    // Обработчик нажатия клавиш в редакторе
    editorContent.addEventListener('keydown', function(e) {
        // Вставка табуляции при нажатии Tab
        if (e.key === 'Tab') {
            e.preventDefault();
            document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
        }
    });
});