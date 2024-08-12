(async function() {
    const wallets = ["example",];

    function fillInput(input, value) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(input, value);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    async function selectUniversalAddress() {
        const addressTypeSelector = '.balance_okui-input-box.auto-size.balance_okui-select-inner-box';
        const addressTypeElement = document.querySelector(addressTypeSelector);
        if (!addressTypeElement) {
            console.error('Элемент для выбора типа адреса не найден');
            return;
        }
        addressTypeElement.click();
        await new Promise((resolve) => setTimeout(resolve, 500)); // sleep

        const universalAddressSelector = '.balance_okui-popup .balance_okui-select-item:nth-child(2)';
        const universalAddressElement = document.querySelector(universalAddressSelector);
        if (!universalAddressElement) {
            console.error('Опция "Универсальный адрес" не найдена');
            return;
        }
        universalAddressElement.click();
        await new Promise((resolve) => setTimeout(resolve, 500)); // sleep
    }

    async function addWallets() {
        const addButtonSelector = 'button.balance_okui.balance_okui-btn.btn-md.btn-outline-secondary';
        const maxWallets = Math.min(wallets.length, 50); 

        await selectUniversalAddress();

        for (let i = 0; i < maxWallets; i++) {
            console.log(`Добавление кошелька ${i + 1} из ${maxWallets}`);

            if (i > 0) {
                const addButton = document.querySelector(addButtonSelector);
                if (!addButton) {
                    console.error('Кнопка "+ Добавить" не найдена');
                    return;
                }
                addButton.click();
                await new Promise((resolve) => setTimeout(resolve, 1000)); // sleep
            }

            const addressInput = document.querySelectorAll('input.balance_okui-input-input[placeholder="Адрес блокчейна"]')[i];
            if (!addressInput) {
                console.error(`Поле для ввода адреса ${i + 1} не найдено`);
                continue;
            }
            console.log(`Заполнение адреса ${i + 1}: ${wallets[i]}`);
            fillInput(addressInput, wallets[i]);

            const networkDropdown = document.querySelectorAll('input.balance_okui-input-input[placeholder="Выберите сеть"]')[i];
            if (!networkDropdown) {
                console.error(`Поле для выбора сети ${i + 1} не найдено`);
                continue;
            }
            networkDropdown.click();
            await new Promise((resolve) => setTimeout(resolve, 500)); // sleep

            const bitcoinOption = document.evaluate(
                '//div[contains(@class, "balance_okui-select-item") and text()="Bitcoin"]',
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;

            if (!bitcoinOption) {
                console.error(`Опция "Bitcoin" ${i + 1} не найдена`);
                continue;
            }
            bitcoinOption.click();

            await new Promise((resolve) => setTimeout(resolve, 500)); // sleep
        }

        console.log('Адреса добавлены. Активирую бессрочные адреса...');

        const checkboxSelector = 'input.balance_okui-checkbox-input';
        const checkbox = document.querySelector(checkboxSelector);
        if (!checkbox) {
            console.error('Чекбокс не найден');
            return;
        }
        checkbox.click();
        await new Promise((resolve) => setTimeout(resolve, 500)); // sleep

        const buttonSelector = 'span.balance_okui-checkbox-children > button';
        const button = document.querySelector(buttonSelector);
        if (!button) {
            console.error('Кнопка не найдена');
            return;
        }
        button.click();
        await new Promise((resolve) => setTimeout(resolve, 500)); // sleep

        const radioSelector = 'input.balance_okui-radio-input';
        const radioElement = document.querySelector(radioSelector);
        if (!radioElement) {
            console.error('Кнопка "Бессрочно" не найдена');
            return;
        }
        radioElement.click();
        await new Promise((resolve) => setTimeout(resolve, 500)); // sleep

        const confirmButtonSelector = 'button[data-testid="okd-dialog-confirm-btn"]';
        const confirmButton = document.querySelector(confirmButtonSelector);
        if (!confirmButton) {
            console.error('Кнопка подтверждения не найдена');
            return;
        }
        confirmButton.click();

        console.log('Завершено');
    }

    addWallets();
})();
