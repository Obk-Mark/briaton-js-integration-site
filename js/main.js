import chooseCity from './components/chooseCity.js';
import openCloseMainMenu from './components/openCloseMainMenu.js';
import generateProductsList from './components/generateProductsList.js';
import getQuantityCategories from './components/getQuantityCategories.js';
import filterProducts from './components/filterProducts.js';
import sortProducts from './components/sortProducts.js';
import accordion from './components/accordion.js';
import slider from './components/slider.js';
import { renderBasketList } from './components/basket.js';
import sendForm from './components/sendingFrom.js';

// Загрузка страницы
window.addEventListener('DOMContentLoaded', () => {
    openCloseMainMenu(); // Открытие, закрытие бургерного меню
    chooseCity(); // Выбор города
    sendForm(); // Отправка формы
    accordion(); // Аккордион
});

// Получение данных с сервера
async function fetchData() {
    try {
        const response = await fetch('../data/data.json');
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Ощибка при получении данных:', error);
    }
};

// Экспорт массива с информацией о товарах
export const productsInfoArrServer = await fetchData();

// Выполнение фукнций после получения данных с сервера
fetchData().then(data => {
    renderBasketList(); // Генерация списка корзины
    getQuantityCategories() // Получить количество товаров в соответствующей категории
    filterProducts(data); // Фильтрация
    sortProducts(data); // Сортировка
    slider(); // Слайдер
});
