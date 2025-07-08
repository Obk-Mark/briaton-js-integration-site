import ProductCard from './ProductCard.js';
import * as components from './components.js';

// HTML элементы
const paginationList = document.querySelector('.catalog__pagination');

// Пагинация
export default function generateProductsList(productsInfoArr) {
    paginationList.innerHTML = '';

    if (productsInfoArr.length > 6) {
        paginationList.style.display = 'flex';

        const paginationPages = Math.ceil(productsInfoArr.length / 6);

        for (let i = 0; i < paginationPages; i++) {
            const liEl = components.getClassEl('li', 'catalog__pagination-item');
            const btnEl = components.getBtnEl('catalog__pagination-link', i + 1, 'button');
            btnEl.addEventListener('click', function () {
                window.location.href = '#catalog'

                generateCatalog(productsInfoArr.slice(i * 6, 6 * (i + 1)));

                const btnsArr = Array.from(document.querySelectorAll('.catalog__pagination-link')); // массив кнопок
                btnsArr.map(btn => btn.disabled = false); // отключаем disabled у всех кнопок
                this.disabled = true; // добавляем disabled для текущей кнопки
            });
            liEl.append(btnEl);
            paginationList.append(liEl);
        }

        document.querySelector('.catalog__pagination-link').disabled = true;
        generateCatalog(productsInfoArr.slice(0, 6));
    } else {
        generateCatalog(productsInfoArr);
    };
};

// Локальная функция генерации каталога
function generateCatalog(productsArr) {
    const catalogListEl = document.querySelector('.catalog__list');
    catalogListEl.innerHTML = '';
    productsArr.forEach(productInfoObject => {
        const catalogLiEl = components.getClassEl('li', 'catalog__item');
        catalogLiEl.append(
            new ProductCard(productInfoObject).getCard()
        );

        catalogListEl.appendChild(catalogLiEl);
    });
};