export default function accordion() {
    const accordionBtnsArr = Array.from(document.querySelectorAll('.accordion__btn')); // массив кнопок

    accordionBtnsArr.forEach((curentAccordionBtn) => { // пробегаем по массиву кнопок
        curentAccordionBtn.addEventListener('click', () => { // добаляем событие для каждой кнопки
            const activeAccrodionBtn = document.querySelector('.accordion__btn--active'); // находим открытый пункт
            if ((activeAccrodionBtn !== curentAccordionBtn) & (activeAccrodionBtn !== null)) { // если наденная кнопка не является текущей и найдена
                activeAccrodionBtn.classList.remove('accordion__btn--active'); // то удалить класс активации
            };

            curentAccordionBtn.classList.toggle('accordion__btn--active'); // открыть и закрыть
        });
    });
};  