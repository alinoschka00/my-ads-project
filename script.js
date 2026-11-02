// ==========================================
// 1. ИМИТАЦИЯ БАЗЫ ДАННЫХ
// ==========================================

// Массив объявлений (имитация таблицы в БД)
const allItems = [
    { id: 1, title: 'Дракон, Рэйвен', price: '3 590 ₽', img: 'img/dragon_passport.jpg.png', author: 'Иван', phone: '+7 (999) 111-22-33' },
    { id: 2, title: 'Толстовка "Распальцоыка"', price: '4 900 ₽', img: 'img/black_hoodie.jpg.png', author: 'Иван', phone: '+7 (999) 111-22-33' },
    { id: 3, title: 'Механические часы Победа - ИГ 2', price: '12 000 ₽', img: 'img/watch.jpg.png', author: 'Иван', phone: '+7 (999) 111-22-33' },
    { id: 4, title: 'iPhone 13 512GB', price: '79 990 ₽', img: 'img/iphone_blue.jpg.png', author: 'Петр', phone: '+7 (999) 444-55-66' },
    { id: 5, title: 'ТВ Тумба Друо', price: '67 850 ₽', img: 'img/tv_stand.jpg.png', author: 'Петр', phone: '+7 (999) 444-55-66' },
    { id: 6, title: 'Филадельфия маки', price: '620 ₽', img: 'img/sushi.jpg.png', author: 'Петр', phone: '+7 (999) 444-55-66' },
    { id: 7, title: 'Свеча «Paccana»', price: '790 ₽', img: 'img/candles.jpg.png', author: 'Анна', phone: '+7 (999) 777-88-99' },
    { id: 8, title: 'Ремешок для ключей', price: '1 590 ₽', img: 'img/leather_keychain.jpg.png', author: 'Анна', phone: '+7 (999) 777-88-99' },
    { id: 9, title: 'Футболка «Это пройдет»', price: '1 500 ₽', img: 'img/tshirt_logo.jpg.png', author: 'Анна', phone: '+7 (999) 777-88-99' },
    { id: 10, title: 'Тайник-цветущая', price: '700 ₽', img: 'img/wooden_bird.jpg.png', author: 'Анна', phone: '+7 (999) 777-88-99' },
    { id: 11, title: 'Мельница "Микки"', price: '690 ₽', img: 'img/mickey_tray.jpg.png', author: 'Иван', phone: '+7 (999) 111-22-33' },
    { id: 12, title: 'Ремешок для AppleWatch', price: '7 990 ₽', img: 'img/apple_watch_strap.jpg.png', author: 'Петр', phone: '+7 (999) 444-55-66' },
    { id: 13, title: 'Утка на велосипед в шлеме', price: '690 ₽', img: 'img/duck_helmet.jpg.png', author: 'Анна', phone: '+7 (999) 777-88-99' },
    { id: 14, title: 'Футболка «Тот, кому не нужно счастье»', price: '1 400 ₽', img: 'img/black_tshirts.jpg.png', author: 'Иван', phone: '+7 (999) 111-22-33' },
    { id: 15, title: 'Чехол для AirPods', price: '3 590 ₽', img: 'img/airpods_case.jpg.png', author: 'Петр', phone: '+7 (999) 444-55-66' }
];

// Текущий пользователь (имитация)
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Отклики (имитация таблицы БД)
let responses = JSON.parse(localStorage.getItem('responses')) || [];

// ==========================================
// 2. ЛОГИКА ДЛЯ ВСЕХ СТРАНИЦ (Вход/Выход)
// ==========================================
function updateAuthNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;

    if (currentUser) {
        nav.innerHTML = `
            <span style="font-size: 14px; margin-right: 15px;">Привет, ${currentUser.name}!</span>
            <a href="#" onclick="logout()">Выйти</a>
        `;
    } else {
        nav.innerHTML = `
            <a href="#" onclick="login()">Регистрация</a>
            <a href="#" onclick="login()">Вход</a>
        `;
    }
}

function login() {
    // Для теста сделаем так: при входе мы становимся "Пользователем 2" (не автором)
    currentUser = { id: 2, name: 'Пользователь 2', phone: '+7 (999) 000-00-00' };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    alert('Вы вошли как ' + currentUser.name);
    updateAuthNav();
    
    // Если мы на детальной странице - перерисовываем её
    if (document.getElementById('item-detail-page')) {
        renderItemPage();
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    alert('Вы вышли.');
    updateAuthNav();
    if (document.getElementById('item-detail-page')) {
        renderItemPage();
    }
}

// ==========================================
// 3. ЛОГИКА ДЛЯ ГЛАВНОЙ СТРАНИЦЫ (Пагинация)
// ==========================================
let visibleCount = 4; // Сколько карточек показываем изначально

function renderCards() {
    const container = document.getElementById('cards-container');
    if (!container) return; // Если мы не на главной

    // Берем только видимую часть
    const itemsToShow = allItems.slice(0, visibleCount);

    container.innerHTML = itemsToShow.map(item => `
        <div class="card">
            <a href="item.html?id=${item.id}" class="card-link">
                <img src="${item.img}" alt="${item.title}" class="card-img" onerror="this.src='https://placehold.co/300x300?text=Фото'">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-price">${item.price}</p>
            </a>
        </div>
    `).join('');

    // Скрываем кнопку "Показать еще", если показали всё
    const btn = document.getElementById('load-more-btn');
    if (btn) {
        if (visibleCount >= allItems.length) {
            btn.style.display = 'none';
        } else {
            btn.style.display = 'block';
        }
    }
}

function loadMoreCards() {
    visibleCount += 4; // Показываем еще 4
    renderCards();
}

// ==========================================
// 4. ЛОГИКА ДЛЯ ДЕТАЛЬНОЙ СТРАНИЦЫ (item.html)
// ==========================================
function renderItemPage() {
    // Проверяем, есть ли на странице контейнер для деталей
    const container = document.getElementById('item-detail-page');
    if (!container) return;

    // Получаем ID из URL (например, item.html?id=3)
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = parseInt(urlParams.get('id')) || 1; // Если нет ID, показываем первый

    const item = allItems.find(i => i.id === itemId);
    if (!item) {
        container.innerHTML = '<h2>Объявление не найдено</h2>';
        return;
    }

    // Проверяем, откликался ли текущий пользователь на это объявление
    const hasResponded = currentUser ? responses.some(r => r.itemId === itemId && r.userId === currentUser.id) : false;
    
    // Является ли текущий пользователь автором?
    // (Для теста: если мы вошли как Пользователь 2, а автор - Иван/Петр/Анна, то мы НЕ автор. 
    // Чтобы проверить режим автора, временно поменяй `item.author` на 'Пользователь 2' в массиве выше).
    const isAuthor = currentUser && (item.author === currentUser.name);

    // Формируем HTML
    let phoneHtml = '<span style="color: #888;">+7 (***) ***-**-**</span>';
    let authWarning = '<p class="auth-warning">Войдите, чтобы увидеть номер телефона</p>';
    let respondBtnHtml = '';
    let responsesListHtml = '';

    // 1. Блок с телефоном
    if (currentUser) {
        phoneHtml = `<strong>${item.phone}</strong>`;
        authWarning = '';
    }

    // 2. Кнопка отклика и список откликов
    if (isAuthor) {
        // Автор видит список откликнувшихся
        const itemResponses = responses.filter(r => r.itemId === itemId);
        responsesListHtml = `
            <div class="responses-list" style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 15px;">
                <h4>Отклики (${itemResponses.length}):</h4>
                ${itemResponses.length > 0 
                    ? itemResponses.map(r => `
                        <div style="background: #fff; padding: 10px; margin-bottom: 10px; border-radius: 6px; border: 1px solid #eee;">
                            <p style="margin: 0 0 5px 0;"><strong>${r.userName}</strong></p>
                            <p style="margin: 0; color: #ff2e63;">${r.userPhone}</p>
                        </div>
                      `).join('')
                    : '<p style="color: #888;">Пока нет откликов.</p>'
                }
            </div>
        `;
    } else if (currentUser) {
        // Не автор
        if (hasResponded) {
            respondBtnHtml = `<button class="btn-respond" disabled style="background:#ccc; cursor:not-allowed;">Вы уже откликнулись</button>`;
        } else {
            respondBtnHtml = `<button class="btn-respond" onclick="makeResponse(${item.id})">Откликнуться на объявление</button>`;
        }
    } else {
        // Не залогинен
        respondBtnHtml = `<button class="btn-respond" onclick="login()">Войдите, чтобы откликнуться</button>`;
    }

    // Рендерим страницу
    container.innerHTML = `
        <a href="index.html" class="back-link">← Назад к объявлениям</a>
        <div class="item-content">
            <div class="item-image-block">
                <img src="${item.img}" alt="${item.title}" class="item-main-img" onerror="this.src='https://placehold.co/600x400?text=Фото'">
            </div>
            <div class="item-info">
                <h1 class="item-title">${item.title}</h1>
                <p class="item-price">${item.price}</p>
                
                <div class="item-author">
                    <p><strong>Автор:</strong> ${item.author}</p>
                    <p><strong>Телефон:</strong> ${phoneHtml}</p>
                    ${authWarning}
                    ${responsesListHtml}
                </div>

                <div class="item-description">
                    <h3>Описание</h3>
                    <p>Отличный товар в идеальном состоянии. Покупал недавно, ношу редко. В комплекте всё, что на фото. Торг уместен.</p>
                </div>

                ${respondBtnHtml}
            </div>
        </div>
    `;
}

function makeResponse(itemId) {
    if (!currentUser) return;

    // Добавляем отклик в массив
    responses.push({
        itemId: itemId,
        userId: currentUser.id,
        userName: currentUser.name,
        userPhone: currentUser.phone
    });

    // Сохраняем в localStorage
    localStorage.setItem('responses', JSON.stringify(responses));

    alert('Вы успешно откликнулись! Автор свяжется с вами.');
    
    // Перерисовываем страницу, чтобы обновить кнопку
    renderItemPage();
}

// ==========================================
// 5. ЗАПУСК ПРИ ЗАГРУЗКЕ
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    updateAuthNav();
    
    // Если мы на главной - рисуем карточки
    if (document.getElementById('cards-container')) {
        renderCards();
    }
    
    // Если мы на детальной - рисуем её
    if (document.getElementById('item-detail-page')) {
        renderItemPage();
    }
});