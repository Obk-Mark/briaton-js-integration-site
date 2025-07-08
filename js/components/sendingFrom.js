export default function sendForm() {
    // Валидация формы
    const validator = new JustValidate('#questions__form');
    validator
        .addField('#name', [
            {
                rule: 'required',
                errorMessage: 'Введите Ваше имя',
            },
            {
                rule: 'minLength',
                value: 3,
                errorMessage: 'Минимальная длина 3 символа',
            },
            {
                rule: 'maxLength',
                value: 20,
                errorMessage: 'Максимальная длина 20 символов',
            },
        ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Введите Вашу почту',
            },
            {
                rule: 'email',
                errorMessage: 'Почта введена неверно',
            },
        ])
        .addField('#agree', [
            {
                rule: 'required',
                errorMessage: 'Согласие обязательно',
            },
        ]);


    // Отправка формы
    const formEl = document.querySelector('#questions__form');
    formEl.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (validator.isValid) {
            const userName = document.querySelector('#name').value;
            const userEmail = document.querySelector('#email').value;
            const userAgree = document.querySelector('#agree').checked;

            const userInfo = {
                userName,
                userEmail,
                userAgree
            };

            try {
                await fetch('https://httpbin.org/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        email: userEmail,
                    },
                    body: JSON.stringify(userInfo)
                });
                
                showCard('Благодарим за обращение!');
            } catch (error) {
                console.error(error);
                showCard('Не удалось отправить обращение');
            };
        };
    });

    function showCard(text) {
        const messageCardEl = document.querySelector('.message');
        const messageTextEl = messageCardEl.querySelector('.message__text');
        messageTextEl.textContent = text;
        const closeBtn = messageCardEl.querySelector('.message__close');
        closeBtn.addEventListener('click', () => {
            messageCardEl.classList.remove('message--active');
        });

        messageCardEl.classList.add('message--active');
    };
}
