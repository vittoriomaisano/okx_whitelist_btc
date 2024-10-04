import re

def get_wallet_addresses():
    print("Вставь кошельки построчно и нажми ENTER:\n")
    addresses = []
    while True:
        line = input().strip()
        if not line:
            break
        addresses.append(line)
    return addresses

def update_console_js(wallet_addresses, filename):
    wallets_js = ', '.join([f'"{address}"' for address in wallet_addresses])
    new_wallets_line = f'const wallets = [{wallets_js}];'

    try:
        with open(filename, 'r') as f:
            existing_code = f.read()
    except FileNotFoundError:
        print(f"Файл {filename} не найден.")
        exit(1)

    pattern = re.compile(r'const wallets = \[.*?\];', re.DOTALL)
    updated_code = pattern.sub(new_wallets_line, existing_code)

    print(f"Открой консоль на сайте https://www.okx.com/ru/balance/withdrawal-add-address и вставь туда этот код:\n\n\n")
    print(updated_code)
    print('\n\n')

def select_module():
    print("Выберите модуль для запуска:")
    print("\n1. BTC-Bitcoin")
    print("2. SATS-Bitcoin\n")

    while True:
        choice = input("Введите 1 или 2: ").strip()
        if choice in ['1', '2']:
            return choice
        else:
            print("Неверный ввод. Пожалуйста, введите 1 или 2.")

if __name__ == "__main__":

    TEXT = r'''

    
    ▄▄▄▄   ▓█████  ██▓     ▒█████   ███▄ ▄███▓ ▒█████   ██▀███  
    ▓█████▄ ▓█   ▀ ▓██▒    ▒██▒  ██▒▓██▒▀█▀ ██▒▒██▒  ██▒▓██ ▒ ██▒
    ▒██▒ ▄██▒███   ▒██░    ▒██░  ██▒▓██    ▓██░▒██░  ██▒▓██ ░▄█ ▒
    ▒██░█▀  ▒▓█  ▄ ▒██░    ▒██   ██░▒██    ▒██ ▒██   ██░▒██▀▀█▄  
    ░▓█  ▀█▓░▒████▒░██████▒░ ████▓▒░▒██▒   ░██▒░ ████▓▒░░██▓ ▒██▒
    ░▒▓███▀▒░░ ▒░ ░░ ▒░▓  ░░ ▒░▒░▒░ ░ ▒░   ░  ░░ ▒░▒░▒░ ░ ▒▓ ░▒▓░
    ▒░▒   ░  ░ ░  ░░ ░ ▒  ░  ░ ▒ ▒░ ░  ░      ░  ░ ▒ ▒░   ░▒ ░ ▒░
    ░    ░    ░     ░ ░   ░ ░ ░ ▒  ░      ░   ░ ░ ░ ▒    ░░   ░ 
    ░         ░  ░    ░  ░    ░ ░         ░       ░ ░     ░

    
    '''

    print(TEXT)
    module_choice = select_module()

    if module_choice == '1':
        filename = 'console.js'
    else:
        filename = 'console_sats.js'

    wallet_addresses = get_wallet_addresses()
    update_console_js(wallet_addresses, filename)
