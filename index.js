// document.getElementById('form').addEventListener('submit', function(event) {
//     event.preventDefault();
//
//     const form = event.target;
//     const name = form.name.value.trim();
//     const tel = form.tel.value.trim();
//     const email = form.email.value.trim();
//     const errorMessages = document.getElementById('errorMessages');
//     const responseMessages = document.getElementById('responseMessages');
//
//     errorMessages.innerHTML = '';
//     responseMessages.innerHTML = '';
//
//     let hasError = false;
//
//     const showError = (message) => {
//         hasError = true;
//         errorMessages.innerHTML += `<p>${message}</p>`;
//     };
//
//     if (!name) {
//         showError('Введите ваше имя и фамилию.');
//     }
//
//     const telPattern = /^\+?[0-9\s\-()]*$/;
//     if (!tel || !telPattern.test(tel)) {
//         showError('Введите корректный номер телефона.');
//     }
//
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailPattern.test(email)) {
//         showError('Введите корректный email.');
//     }
//
//     if (hasError) {
//         return;
//     }
//
//     const formData = {
//         name: name,
//         tel: tel,
//         email: email
//     };
//
//     sendEmail(formData);
//
//     form.reset();
// });
//
// function sendEmail({ name, email, tel }) {
//
//     const responseMessages = document.getElementById('responseMessages');
//
//     emailjs.init('O6gslK_UeokvENiMh');
//
//     const templateParams = {
//         from_name: name,
//         from_tel: tel,
//         from_email: email
//     };
//
//     emailjs.send('service_82ghbv3', 'template_si0xx9f', templateParams)
//         .then(function() {
//             responseMessages.innerHTML += '<p>Ваши данные успешно отправлены!</p>';
//         }, function() {
//             responseMessages.innerHTML += '<p style="color: red;">Ошибка! Данные не отправлены!</p>';
//         });
// }


document.addEventListener('DOMContentLoaded', function () {
    const phoneInputField = document.querySelector("#phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
        initialCountry: "ua"
    });

    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value.trim();
        const tel = phoneInput.getNumber();
        const countryData = phoneInput.getSelectedCountryData();
        const country = countryData.name;
        const email = form.email.value.trim();
        const errorMessages = document.getElementById('errorMessages');
        const responseMessages = document.getElementById('responseMessages');

        errorMessages.innerHTML = '';
        responseMessages.innerHTML = '';

        let hasError = false;

        const showError = (message) => {
            hasError = true;
            errorMessages.innerHTML += `<p style="color: red;">${message}</p>`;
        };

        if (!name) {
            showError('Введите ваше имя и фамилию.');
        }

        if (!tel || !phoneInput.isValidNumber()) {
            showError('Введите корректный номер телефона.');
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            showError('Введите корректный email.');
        }

        if (hasError) {
            return;
        }

        const formData = {
            country: country,
            name: name,
            tel: tel,
            email: email
        };

        sendEmail(formData);

        form.reset();
        phoneInputField.value = '';
    });

    function sendEmail({country, name, email, tel}) {
        const responseMessages = document.getElementById('responseMessages');
        const loader = document.getElementById('loader');
        loader.innerText = 'Send...';

        emailjs.init('O6gslK_UeokvENiMh');

        const templateParams = {
            from_country: country,
            from_name: name,
            from_email: email,
            from_tel: tel
        };

        emailjs.send('service_82ghbv3', 'template_si0xx9f', templateParams)
            .then(function () {
                responseMessages.innerHTML += '<p>Ваши данные успешно отправлены!</p>';
                loader.innerText = '';
            }, function () {
                responseMessages.innerHTML += '<p style="color: red;">Ошибка! Данные не отправлены!</p>';
                loader.innerText = '';
            });
    }
});


