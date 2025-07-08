import * as components from './components.js';
import ProductCard from './ProductCard.js';
import { productsInfoArrServer } from '../main.js';

const nextBtn = document.querySelector('.day-products__navigation-btn--next');
const prevBtn = document.querySelector('.day-products__navigation-btn--prev');

export default function slider() {
    const newproductsInfoArrServer = productsInfoArrServer.filter((product) => product.goodsOfDay);

    const dayProductsListEl = document.querySelector('.day-products__list');

    newproductsInfoArrServer.forEach((productsInfo) => {
        const dayProductsItemEl = components.getClassEl('li', ['day-products__item', 'swiper-slide']);
        const cardEl = (new ProductCard(productsInfo)).getCard();
        cardEl.classList.add('product-card--small');

        dayProductsItemEl.append(cardEl);
        dayProductsListEl.append(dayProductsItemEl);
    });

    startSlider();
    const swiper = document.querySelector('.swiper').swiper;

    nextBtn.addEventListener('click', () => {
        swiper.slideNext();
    });

    prevBtn.addEventListener('click', () => {
        swiper.slidePrev();
    });
}

function startSlider() {
    new Swiper('.swiper', {
        speed: 400,
        spaceBetween: 40,
        slidesPerView: 4,

        on: {
            reachBeginning: function () {
                nextBtn.disabled = false;
                prevBtn.disabled = true;
            },

            fromEdge: function () {
                nextBtn.disabled = false;
                prevBtn.disabled = false;
            },

            reachEnd: function () {
                nextBtn.disabled = true;
                prevBtn.disabled = false;
            }
        }
    });
};