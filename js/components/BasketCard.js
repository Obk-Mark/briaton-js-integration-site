import * as components from './components.js';
import { deleteProductFromBasket } from './basket.js';

export default class BasketCard {
    constructor(productsInfo) {
        this.id = productsInfo.id;
        this.src = productsInfo.image;
        this.title = productsInfo.name;
        this.price = productsInfo.price.new;
    }

    getBasketCard() {
        const cardEl = components.getClassEl('li', 'basket__item');
        cardEl.id = this.id;

        const imgContainerEl = components.getClassEl('div', 'basket__img');
        const imgEl = components.getImgEl('basket__img-el', this.src, 60, 60, 'Фотография товара');
        imgContainerEl.append(imgEl);

        const nameEl = components.getTextEl('span', 'basket__name', this.title);
        const priceEl = components.getTextEl('span', 'basket__price', `${this.price} руб`);

        const btnEl = components.getBtnEl('basket__close');
        btnEl.innerHTML = `
            <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-close"></use>
            </svg>
        `;
        btnEl.addEventListener('click', () => {
            deleteProductFromBasket(this.id);
        });

        cardEl.append(
            imgContainerEl,
            nameEl,
            priceEl,
            btnEl
        );

        return cardEl;
    };
};