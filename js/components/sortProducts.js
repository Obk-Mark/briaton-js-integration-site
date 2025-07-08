import generateProductsList from "./generateProductsList.js";

export default function sortProducts(productsInfoArr) {
    // Локальная фукнция сортировки
    function _sort(sortValue) { 
        switch (sortValue) {
            case 'price-min':
                productsInfoArr.sort((a, b) => a.price.new - b.price.new);
                break;
            
            case 'price-max':
                productsInfoArr.sort((a, b) => b.price.new - a.price.new);
                break;

            case 'rating-max':
                productsInfoArr.sort((a, b) => b.rating - a.rating);
                break;
        };
        generateProductsList(productsInfoArr);
    };

    const selectEl = document.querySelector('.catalog__sort-select'); // select элемент
    _sort(selectEl.value); // сортировка при загрузке страницы

    selectEl.addEventListener('change', () => {
        _sort(selectEl.value); // сортировка при изменении значения 
    });
};