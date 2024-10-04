(async function() {
    const wallets = ["example",];

    function fillInput(input, value) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(input, value);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    async function retryOnce(operation, errorMessage) {
        try {
            return await operation();
        } catch (error) {
            console.log(`${errorMessage} Повторная попытка...`);
            await new Promise(resolve => setTimeout(resolve, 1000)); //sleep
            return await operation();
        }
    }

    async function addWallets() {
        const addButtonSelector = 'button.balance_okui.balance_okui-btn.btn-md.btn-outline-secondary';
        const maxWallets = Math.min(wallets.length, 50);

        for (let i = 0; i < maxWallets; i++) {
            console.log(`Добавление кошелька ${i + 1} из ${maxWallets}`);

            await retryOnce(async () => {
                if (i > 0) {
                    const addButton = document.querySelector(addButtonSelector);
                    if (!addButton) {
                        throw new Error('Кнопка "+ Добавить" не найдена');
                    }
                    addButton.click();
                    await new Promise((resolve) => setTimeout(resolve, 1000)); //sleep
                }

                const addressInputs = document.querySelectorAll('input.balance_okui-input-input[placeholder="Адрес блокчейна"]');
                const addressInput = addressInputs[addressInputs.length - 1];
                if (!addressInput) {
                    throw new Error(`Поле для ввода адреса ${i + 1} не найдено`);
                }
                console.log(`Заполнение адреса ${i + 1}: ${wallets[i]}`);
                fillInput(addressInput, wallets[i]);

                // только для первого кошелька
                if (i === 0) {
                    const cryptoDropdowns = document.querySelectorAll('div.balance_okui-input-box.auto-size.balance_okui-select-inner-box');
                    const cryptoDropdown = Array.from(cryptoDropdowns)
                        .filter(el => el.querySelector('.value.placeholder')?.textContent.trim() === "Выбор криптовалюты")
                        .pop(); 

                    if (!cryptoDropdown) {
                        throw new Error(`Поле для выбора криптовалюты ${i + 1} не найдено`);
                    }
                    cryptoDropdown.click();
                    await new Promise((resolve) => setTimeout(resolve, 1000)); // sleep

                    const searchInput = document.querySelector('input.balance_okui-input-input.balance_okui-select-search-ellipsis');
                    if (!searchInput) {
                        throw new Error('Поле для поиска криптовалюты не найдено');
                    }
                    console.log('Поиск опции SATS...');
                    fillInput(searchInput, 'SATS'); // 'SATS' в поле поиска
                    await new Promise(resolve => setTimeout(resolve, 500)); // sleep

                    const satsOption = Array.from(document.querySelectorAll('.balance_okui-select-item'))
                    .find(el => el.querySelector('.SelectOption_content__tk16w div')?.innerText.trim() === "SATS");

                    if (!satsOption) {
                        throw new Error(`Опция "SATS" ${i + 1} не найдена`);
                    }

                    satsOption.click();
                    await new Promise((resolve) => setTimeout(resolve, 1000)); //sleep
                }

                // Выбор сети (Bitcoin) для каждого кошелька
                const networkDropdowns = document.querySelectorAll('div.value.placeholder');
                const networkDropdown = Array.from(networkDropdowns)
                    .filter(el => el.textContent.trim() === "Выберите сеть")
                    .pop(); 
                if (!networkDropdown) {
                    throw new Error(`Поле для выбора сети ${i + 1} не найдено`);
                }
                networkDropdown.click();
                await new Promise((resolve) => setTimeout(resolve, 500)); //sleep
                
                const bitcoinOptions = document.querySelectorAll('.balance_okui-select-item');
                const bitcoinOption = Array.from(bitcoinOptions)
                    .filter(el => el.innerText.trim() === "Bitcoin")
                    .pop(); 

                if (!bitcoinOption) {
                    throw new Error(`Опция "Bitcoin" ${i + 1} не найдена`);
                }
                bitcoinOption.click();

                await new Promise((resolve) => setTimeout(resolve, 500)); //sleep
            }, `Ошибка при добавлении кошелька ${i + 1}.`);
        }

        console.log('Адреса добавлены. Активирую бессрочные адреса...');

        await retryOnce(async () => {
            const checkboxSelector = 'input.balance_okui-checkbox-input';
            const checkbox = document.querySelector(checkboxSelector);
            if (!checkbox) {
                throw new Error('Чекбокс не найден');
            }
            checkbox.click();
            await new Promise((resolve) => setTimeout(resolve, 500)); //sleep

            const buttonSelector = 'span.balance_okui-checkbox-children > button';
            const button = document.querySelector(buttonSelector);
            if (!button) {
                throw new Error('Кнопка не найдена');
            }
            button.click();
            await new Promise((resolve) => setTimeout(resolve, 500)); //sleep

            const radioSelector = 'input.balance_okui-radio-input';
            const radioElement = document.querySelector(radioSelector);
            if (!radioElement) {
                throw new Error('Кнопка "Бессрочно" не найдена');
            }
            radioElement.click();

            const saveButtonSelector = 'button[data-testid="okd-dialog-confirm-btn"]';
            const saveButton = document.querySelector(saveButtonSelector);
            if (!saveButton) {
                throw new Error('Кнопка "Подтвердить" не найдена');
            }
            saveButton.click();
        }, 'Ошибка при активации бессрочных адресов.');

        console.log('Процесс завершен!');
    }

    addWallets();
})();
