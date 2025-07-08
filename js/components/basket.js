import * as components from './components.js';
import BasketCard from './BasketCard.js';
import { productsInfoArrServer } from '../main.js';


const basketEl = document.querySelector('.header__basket');
const basketBtnEl = document.querySelector('.header__user-btn');
basketBtnEl.onclick = () => {
    basketEl.classList.toggle('basket--active');
};
const basketListEl = document.querySelector('.basket__list');

// Счётчик
export function counter(n) {
    const counterNumber = n;

    const counterEl = document.querySelector('.header__user-count');
    const emptyBlockEl = document.querySelector('.basket__empty-block');
    const orderBtn = components.getLinkEl(['basket__link', 'btn']);
    orderBtn.textContent = 'Перейти к оформлению';

    counterEl.textContent = counterNumber;
    if (counterNumber > 0) {
        emptyBlockEl.style.display = 'none';

        if (!basketEl.contains(document.querySelector('.basket__link'))) {
            basketEl.append(orderBtn);
        };

    } else {
        emptyBlockEl.style.display = 'block';
        if (document.querySelector('.basket__link')) {
            basketEl.removeChild(document.querySelector('.basket__link'));
        };
    };
};


// Добавление товара в корзину
export function addProductInBasket(id) {
    const addedProductInfo = productsInfoArrServer.find((product) => product.id == id);

    const addingProductsArrLS = JSON.parse(localStorage.getItem('basketProducts')) || [];
    addingProductsArrLS.push(addedProductInfo);
    localStorage.setItem('basketProducts', JSON.stringify(addingProductsArrLS));

    renderBasketList();
};


// Удаление товара из корзины
export function deleteProductFromBasket(id) {
    let removalProductsArrLS = JSON.parse(localStorage.getItem('basketProducts'));
    const removalIndex = removalProductsArrLS.indexOf(
        removalProductsArrLS.find((product) => product.id == id)
    );
    removalProductsArrLS.splice(removalIndex, 1);
    localStorage.setItem('basketProducts', JSON.stringify(removalProductsArrLS));

    renderBasketList();
};

// Генерация списка корзины
export function renderBasketList() {
    basketListEl.innerHTML = '';

    const productsArrLS = JSON.parse(localStorage.getItem('basketProducts')) || [];

    productsArrLS.forEach(productsInfo => {
        const productCard = new BasketCard(productsInfo);
        basketListEl.append(productCard.getBasketCard());
    });

    counter(productsArrLS.length);
};

