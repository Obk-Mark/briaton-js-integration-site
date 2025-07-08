import sortProducts from './sortProducts.js';

export default function filterProducts(productsInfoArr) {
    const filterFormEl = document.querySelector('.catalog-form');

    // Событие очистки формы
    filterFormEl.addEventListener('reset', () => {
        sortProducts(productsInfoArr);
    });

    // Событие изменения формы - добавления фильтров
    filterFormEl.addEventListener('change', () => {
        const typeFilterArr = Array
            .from(filterFormEl.querySelectorAll('.custom-checkbox__field'))
            .filter(element => element.checked == true)
            .map(item => item.id);

        const availabilityFilter = (filterFormEl.querySelector('input[name = "status"]:checked'))?.value;

        let newProductsArr = productsInfoArr;
        if (typeFilterArr.length > 0) {
            newProductsArr = newProductsArr.filter((productsInfo) => {
                let doesMatch = false;

                const productTypes = productsInfo.type;
                productTypes.forEach((type) => {
                    if (typeFilterArr.indexOf(type) >= 0) {
                        doesMatch = true;
                        return doesMatch;
                    }
                });

                return doesMatch;
            });
        };

        if (availabilityFilter == 'instock') {
            newProductsArr = newProductsArr.filter((productsInfo) => {
                let doesMatch = false;

                const availabilityCount = () => {
                    let counter = 0;
                    const availabilityCities = Object.values(productsInfo.availability);
                    availabilityCities.forEach(n => {
                        counter += n;
                    });
                    return counter;
                }
                if (availabilityCount() > 0) {
                    doesMatch = true;
                };

                return doesMatch;
            });
        };

        sortProducts(newProductsArr);
    });
};