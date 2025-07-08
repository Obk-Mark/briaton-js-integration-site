import { productsInfoArrServer } from '../main.js';

export default async function getQuantityCategories() {
    // Объект с количеством товаров в категории
    const typeObject = {
        pendant: 0,
        ceiling: 0,
        overhead: 0,
        point: 0,
        nightlights: 0
    };

    // Подсчёт количества товаров в категории
    productsInfoArrServer.forEach((productInfo) => {
        productInfo
            .type
            .forEach((type) => {
                typeObject[type]++
            });
    });

    // Отображение данных на странице
    Object
        .keys(typeObject)
        .forEach((typeName) => {
            document
                .querySelector(`.custom-checkbox--${typeName}`)
                .querySelector('.custom-checkbox__count').textContent = typeObject[typeName];
        });
};