export default function openCloseMainMenu() {
    // Открытие бургерного меню
    const mainMenuOpenBtnEl = document.querySelector('.header__catalog-btn');
    mainMenuOpenBtnEl.addEventListener('click', () => {
        document.querySelector('.main-menu').classList.add('main-menu--active');
    });

    // Закрытие бургерного меню
    const mainMenuCloseBtnEl = document.querySelector('.main-menu__close');
    mainMenuCloseBtnEl.addEventListener('click', () => {
        document.querySelector('.main-menu').classList.remove('main-menu--active');
    });
};