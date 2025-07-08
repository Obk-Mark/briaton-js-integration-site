function getTextEl(el, classNames, text) {
    const element = document.createElement(el);

    if (typeof classNames == 'object') {
        console.log(classNames);
        classNames.forEach(className => {
            element.classList.add(className);
        });
    } else {
        element.classList.add(classNames);
    };

    element.classList.add(classNames);
    element.textContent = text;

    return element;
};

function getClassEl(el, classNames) {
    const element = document.createElement(el);

    if (typeof classNames == 'object') {
        classNames.forEach(className => {
            element.classList.add(className);
        });
    } else {
        element.classList.add(classNames);
    };

    return element;
};

function getBtnEl(classNames, text = '', type = 'button', ariaLabel = 'Кнопка') {
    const btnEl = document.createElement('button');
    
    if (typeof classNames == 'object') {
        classNames.forEach(className => {
            btnEl.classList.add(className);
        });
    } else {
        btnEl.classList.add(classNames);
    };

    btnEl.textContent = text;
    btnEl.type = type;
    btnEl.ariaLabel = ariaLabel;

    return btnEl;
}

function getImgEl(classNames, src = '#', width, height, alt = 'Картинка') {
    const imgEl = document.createElement('img');

    if (typeof classNames == 'object') {
        classNames.forEach(className => {
            imgEl.classList.add(className);
        });
    } else {
        imgEl.classList.add(classNames);
    };

    imgEl.src = src;
    imgEl.setAttribute('width', width);
    imgEl.setAttribute('height', height);
    imgEl.alt = alt;

    return imgEl;
};

function getLinkEl(classNames, href = '#', ariaLabel = '') {
    const linkEl = document.createElement('a');

    if (typeof classNames == 'object') {
        classNames.forEach(className => {
            linkEl.classList.add(className);
        });
    } else {
        linkEl.classList.add(classNames);
    };

    linkEl.href = href;
    linkEl.ariaLabel = ariaLabel;

    return linkEl;
};

export {
    getTextEl, // Получить элемент с текстом
    getClassEl, // Получить элемент с классом
    getBtnEl, // Получить кнопку
    getImgEl, // Получить картинку
    getLinkEl, // Получить ссылку
}