import * as components from './components.js';
import { addProductInBasket } from './basket.js';

export default class ProductCard {
    constructor(productInfo) {
        this.id = productInfo.id;
        this.title = productInfo.name;
        this.price = productInfo.price.new;
        this.oldPrice = productInfo.price.old;
        this.src = productInfo.image;
        this.availability = productInfo.availability;
        this.type = productInfo.type;
        this.rating = productInfo.rating;
        this.goodsOfDay = productInfo.goodsOfDay;
    }

    getCard() {
        // Создание карточки
        const cardEl = components.getClassEl('div', 'product-card');

        cardEl.append(this.getCardVisual(), this.getCardInfo());
        return cardEl;
    };

    getCardVisual() {
        const cardVisualEl = components.getClassEl('div', 'product-card__visual'); // Создание обёртки для верхней группы

        const cardImgEl = components.getImgEl('product-card__img', this.src, 290, 436, 'Изображение товара'); // Создание изображения

        const cardMoreEl = components.getClassEl('div', 'product-card__more'); // Создание раздела "Подробнее"

        // Создание кнопки "Корзина"
        this.cardBasketBtnEl = components.getLinkEl(['product-card__link', 'btn', 'btn--icon']);
        this.cardBasketBtnEl.innerHTML = `
            <span class="btn__text">В корзину</span>
            <svg width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-basket"></use>
            </svg>
        `;
        this.cardBasketBtnEl.id = this.id;
        this.cardBasketBtnEl.addEventListener('click', function (e) {
            e.preventDefault();
            addProductInBasket(this.id);
        });

        this.cardDetailedBtnEl = components.getLinkEl(['product-card__link', 'btn', 'btn--secondary']); // Создание кнопки "Подробнее"

        const cardDetailedTextEl = components.getTextEl('span', 'btn__text', 'Подробнее'); // Создание текста для кнопки "Подробнее"

        // Сборка верхней группы
        cardMoreEl.append(this.cardBasketBtnEl, this.cardDetailedBtnEl);
        this.cardDetailedBtnEl.append(cardDetailedTextEl);
        cardVisualEl.append(cardImgEl, cardMoreEl);

        return cardVisualEl;
    };

    getCardInfo() {
        const cardInfoEl = components.getClassEl('div', 'product-card__info'); // Создание обёртки для нижней группы

        const cardTitleEl = components.getTextEl('h2', 'product-card__title', this.title); // Создание заголовка с названием товара


        const cardOldPriceEl = components.getClassEl('span', 'product-card__old') // Создание обёртки для старой цены
        const oldPriceNumberEl = components.getTextEl('span', 'product-card__old-number', this.oldPrice); // Создание span со старой ценой
        const oldPriceCurrencyEl = components.getTextEl('span', 'product-card__old-add', ' ₽'); // Создание span с валютой
        cardOldPriceEl.append(oldPriceNumberEl, oldPriceCurrencyEl); // Добавление элементов в обёртку "старая цена"


        const cardPriceEl = components.getClassEl('span', 'product-card__price'); // Создание обёртки для цены товара
        const priceNumberEl = components.getTextEl('span', 'product-card__price-number', this.price); // Создание span с ценой
        const priceCurrencyEl = components.getTextEl('span', 'product-card__add', ' ₽'); // Создание span с валютой    
        cardPriceEl.append(priceNumberEl, priceCurrencyEl); // Добавление элементов в обёртку "цена товара"  

        const cardTooltipEl = components.getClassEl('div', ['product-card__tooltip', 'tooltip']); // Создание тултипа

        const tooltipBtnEl = components.getBtnEl('tooltip__btn', '', 'button', 'Показать подсказку'); // Создание кнопки тултипа
        tooltipBtnEl.innerHTML = `
            <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-i"></use>
            </svg>
        `;



        const tooltipContentEl = components.getClassEl('div', 'tooltip__content'); // Создание обёртки для контента тултипа  

        const tooltipTitleEl = components.getTextEl('span', 'tooltip__text', 'Наличие товара по городам:'); // Создание заголовка для контента

        const tooltipListEl = components.getClassEl('ul', 'tooltip__list'); // Создание списка тултипа

        const citiesNames = ["Москва", "Оренбург", "Санкт-Петербург"]; // массив с именами доступных городов
        const citiesVailability = (Object.values(this.availability)); // массив с количеством товара в городах

        const tooltipArr = []; // Создание элементов списка тултипа
        for (let i = 0; i < citiesNames.length; i++) {
            const tooltipItemEl = components.getClassEl('li', 'tooltip__item');
            tooltipArr.push(tooltipItemEl);
        };

        for (let i = 0; i < citiesNames.length; i++) {
            const tooltipTextEl = components.getTextEl('span', 'tooltip__text', `${citiesNames[i]}: `);
            const tooltipCountEl = components.getTextEl('span', 'tooltip__count', citiesVailability[i] || 0);

            tooltipTextEl.append(tooltipCountEl);
            tooltipArr[i].append(tooltipTextEl);
        };

        tooltipArr.forEach((tooltipItem) => {
            tooltipListEl.append(tooltipItem);
        }); // Добавление элементов в список тултипа

        tooltipContentEl.append(tooltipTitleEl, tooltipListEl); // Добавление элементов в обёртку для контента тултипа     

        cardTooltipEl.append(tooltipBtnEl, tooltipContentEl); // Добавление элементов в тултип 

        cardInfoEl.append(cardTitleEl, cardOldPriceEl, cardPriceEl, cardTooltipEl); // Добавление элементов в обёртку для нижней группы

        // Настройка Tippy.js
        tippy(tooltipBtnEl, {
            content: tooltipContentEl.innerHTML,
            allowHTML: true,
            theme: 'lightwhite',
            duration: [300, 500],
            placement: 'top-end',
            arrow: false
        });

        return cardInfoEl;
    };
};