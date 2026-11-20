
// ==========================================
// 1. ИМИТАЦИЯ БАЗЫ ДАННЫХ
// ==========================================

const allItems = [
    { id: 1, title: 'Дракон, Рэйвен', price: '3 590 ₽', img: 'img/dragon_passport.jpg.png', author: 'Иван', phone: '+7 (999) 111-22-33' },
    { id: 2, title: 'Толстовка "Распальцовка"', price: '4 900 ₽', img: 'img/black_hoodie.jpg.png', author: 'Иван', phone: '+7 (999) 111-22-33' },
    { id: 3, title: 'Механические часы Победа - ИЛ 2.', price: '12 000 ₽', img: 'img/watch.jpg.png', author: 'Иван', phone: '+7 (999) 111-22-33' },
    { id: 4, title: 'iPhone 13 512GB', price: '79 990 ₽', img: 'img/iphone_blue.jpg.png', author: 'Петр', phone: '+7 (999) 444-55-66' },
    { id: 5, title: 'ТВ Тумба Дуро', price: '67 850 ₽', img: 'img/tv_stand.jpg.png', author: 'Петр', phone: '+7 (999) 444-55-66' },
    { id: 6, title: 'Филадельфия манго', price: '620 ₽', img: 'img/sushi.jpg.png', author: 'Петр', phone: '+7 (999) 444-55-66' },
    { id: 7, title: 'Свеча «Popcorn»', price: '790 ₽', img: 'img/candles.jpg.png', author: 'Анна', phone: '+7 (999) 777-88-99' },
    { id: 8, title: 'Ремешок для ключей Ориноко - рыжий', price: '1 590 ₽', img: 'img/leather_keychain.jpg.png', author: 'Анна', phone: '+7 (999) 777-88-99' },
    { id: 9, title: 'Футболка «Это пройдет»', price: '1 500 ₽', img: 'img/tshirt_logo.jpg.png', author: 'Анна', phone: '+7 (999) 777-88-99' },
    { id: 10, title: 'Таежная цветущая', price: '700 ₽', img: 'img/wooden_bird.jpg.png', author: 'Анна', phone: '+7 (999) 777-88-99' },
    { id: 11, title: 'Менажница "Микки" из кедра', price: '690 ₽', img: 'img/mickey_tray.jpg.png', author: 'Иван', phone: '+7 (999) 111-22-33' },
    { id: 12, title: 'Ремешок для AppleWatch из Novonappa', price: '7 990 ₽', img: 'img/apple_watch_strap.jpg.png', author: 'Петр', phone: '+7 (999) 444-55-66' },
    { id: 13, title: 'Утка на велосипед в шлеме', price: '690 ₽', img: 'img/duck_helmet.jpg.png', author: 'Анна', phone: '+7 (999) 777-88-99' },
    { id: 14, title: 'Футболка «Тот, кому не нужно счастье»', price: '1 400 ₽', img: 'img/black_tshirts.jpg.png', author: 'Иван', phone: '+7 (999) 111-22-33' },
    { id: 15, title: 'Чехол для AirPods в цвете Lavande', price: '3 590 ₽', img: 'img/airpods_case.jpg.png', author: 'Петр', phone: '+7 (999) 444-55-66' }
];

// ==========================================
// 2. ПОЛЬЗОВАТЕЛИ И ОТКЛИКИ
// ==========================================

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem('siteUsers')) || [];
    } catch {
        return [];
    }
}

function getSavedUser() {
    try {
        return JSON.parse(localStorage.getItem('currentUser')) || null;
    } catch {
        return null;
    }
}

let currentUser = getSavedUser();

let responses = JSON.parse(localStorage.getItem('responses') || '[]');

// ==========================================
// 3. АВТОРИЗАЦИЯ
// ==========================================

function updateAuthNav() {
    const nav = document.getElementById('auth-nav');
    if (!nav) return;

    if (currentUser) {
        const safeName = document.createElement('span');
        safeName.textContent = 'Привет, ' + currentUser.name + '!';

        const logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.textContent = 'Выйти';
        logoutLink.onclick = function(event) {
            event.preventDefault();
            logout();
        };

        nav.replaceChildren(safeName, logoutLink);
    } else {
        nav.innerHTML = `
            <a href="register.html">Регистрация</a>
            <a href="login.html">Вход</a>
        `;
    }
}

function login() {
    window.location.href = 'login.html';
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthNav();
    window.location.href = 'index.html';
}

// ==========================================
// 4. РЕГИСТРАЦИЯ
// ==========================================

const registerForm = document.getElementById('register-form');

if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim().toLowerCase();
        const password = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm').value;
        const error = document.getElementById('register-error');

        error.textContent = '';

        if (!name || !email) {
            error.textContent = 'Заполните все поля.';
            return;
        }

        if (password.length < 8) {
            error.textContent = 'Пароль должен содержать минимум 8 символов.';
            return;
        }

        if (password !== confirm) {
            error.textContent = 'Пароли не совпадают.';
            return;
        }

        const users = getUsers();

        if (users.some(user => user.email === email)) {
            error.textContent = 'Этот email уже зарегистрирован.';
            return;
        }

        const user = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            phone: ''
        };

        users.push(user);

        localStorage.setItem('siteUsers', JSON.stringify(users));

        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        alert('Регистрация прошла успешно!');

        window.location.href = 'index.html';
    });
}

// ==========================================
// 5. ВХОД
// ==========================================

const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const password = document.getElementById('login-password').value;
        const error = document.getElementById('login-error');

        error.textContent = '';

        const users = getUsers();

        const user = users.find(item =>
            item.email === email && item.password === password
        );

        if (!user) {
            error.textContent = 'Неверный email или пароль.';
            return;
        }

        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone || ''
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        alert('Вы успешно вошли!');

        window.location.href = 'index.html';
    });
}

// ==========================================
// 6. ГЛАВНАЯ СТРАНИЦА И ПАГИНАЦИЯ
// ==========================================

let visibleCount = 4;

function renderCards() {
    const container = document.getElementById('cards-container');
    if (!container) return;

    const itemsToShow = allItems.slice(0, visibleCount);

    container.innerHTML = itemsToShow.map(item => `
        <div class="card">
            <a href="item.html?id=${item.id}" class="card-link">
                <img src="${item.img}"
                     alt="${item.title}"
                     class="card-img"
                     onerror="this.src='https://placehold.co/300x300?text=Фото'">

                <h3 class="card-title">${item.title}</h3>
                <p class="card-price">${item.price}</p>
            </a>
        </div>
    `).join('');

    const btn = document.getElementById('load-more-btn');

    if (btn) {
        btn.style.display = visibleCount >= allItems.length ? 'none' : 'block';
    }
}

function loadMoreCards() {
    visibleCount += 4;
    renderCards();
}

// ==========================================
// 7. СТРАНИЦА ПРОСМОТРА ОБЪЯВЛЕНИЯ
// ==========================================

function renderItemPage() {
    const container = document.getElementById('item-detail-page');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const itemId = parseInt(urlParams.get('id')) || 1;

    const item = allItems.find(i => i.id === itemId);

    if (!item) {
        container.innerHTML = '<h2>Объявление не найдено</h2>';
        return;
    }

    const hasResponded = currentUser
        ? responses.some(r => r.itemId === itemId && r.userId === currentUser.id)
        : false;

    const isAuthor = currentUser && item.author === currentUser.name;

    let phoneHtml = '<span style="color:#888;">+7 (***) ***-**-**</span>';
    let authWarning = '<p class="auth-warning">Войдите, чтобы увидеть номер телефона</p>';
    let respondBtnHtml = '';
    let responsesListHtml = '';

    if (currentUser) {
        phoneHtml = item.phone;
        authWarning = '';
    }

    if (isAuthor) {
        const itemResponses = responses.filter(r => r.itemId === itemId);

        responsesListHtml = `
            <div class="responses-list">
                <h4>Отклики (${itemResponses.length}):</h4>

                ${itemResponses.length > 0
                    ? itemResponses.map(r => `
                        <div>
                            <p><strong>${r.userName}</strong></p>
                            <p>${r.userPhone || 'Телефон не указан'}</p>
                        </div>
                    `).join('')
                    : '<p>Пока нет откликов.</p>'
                }
            </div>
        `;
    } else if (currentUser) {
        respondBtnHtml = hasResponded
            ? '<button class="btn-respond" disabled>Вы уже откликнулись</button>'
            : `<button class="btn-respond" onclick="makeResponse(${item.id})">Откликнуться на объявление</button>`;
    } else {
        respondBtnHtml = `
            <button class="btn-respond" onclick="login()">
                Войдите, чтобы откликнуться
            </button>
        `;
    }

    container.innerHTML = `
        <a href="index.html" class="back-link">← Назад к объявлениям</a>

        <div class="item-content">
            <div class="item-image-block">
                <img src="${item.img}"
                     alt="${item.title}"
                     class="item-main-img"
                     onerror="this.src='https://placehold.co/600x400?text=Фото'">
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

// ==========================================
// 8. ОТКЛИКИ
// ==========================================

function makeResponse(itemId) {
    if (!currentUser) {
        login();
        return;
    }

    const alreadyResponded = responses.some(
        r => r.itemId === itemId && r.userId === currentUser.id
    );

    if (alreadyResponded) return;

    responses.push({
        itemId: itemId,
        userId: currentUser.id,
        userName: currentUser.name,
        userPhone: currentUser.phone || ''
    });

    localStorage.setItem('responses', JSON.stringify(responses));

    alert('Вы успешно откликнулись!');

    renderItemPage();
}

// ==========================================
// 9. ЗАПУСК САЙТА
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    updateAuthNav();

    if (document.getElementById('cards-container')) {
        renderCards();
    }

    if (document.getElementById('item-detail-page')) {
        renderItemPage();
    }
});
