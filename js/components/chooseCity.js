import filterProducts from "./filterProducts.js";
import { productsInfoArrServer } from '../main.js';

export let currentCity = 'orenburg';

export default function chooseCity() {
    // Открытие и закрытие выпадающего меню
    const locationCityBtnEl = document.querySelector('.location__city');
    locationCityBtnEl.addEventListener('click', function () {
        this.classList.toggle('location__city--active');
    });

    // Выбор города
    Array
        .from(document.querySelectorAll('.location__sublink'))
        .forEach((locationSublinkEl) => {
            locationSublinkEl.addEventListener('click', function () {
                const locationCityNameEl = document.querySelector('.location__city-name');
                locationCityNameEl.textContent = this.textContent;

                switch (this.textContent) {
                    case 'Москва':
                        currentCity = 'moscow';
                        break;
                    case 'Оренбург':
                        currentCity = 'orenburg';
                        break;
                    case 'Санкт-Петербург':
                        currentCity = 'saintPetersburg';
                        break;
                };

                locationCityBtnEl.classList.remove('location__city--active');
            });
        });
};