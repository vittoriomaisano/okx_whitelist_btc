import re

def get_wallet_addresses():
    print(TEXT)
    print("Вставь кошельки построчно и нажми ENTER:\n")
    addresses = []
    while True:
        line = input().strip()
        if not line:
            break
        addresses.append(line)
    return addresses

def update_console_js(wallet_addresses):
    wallets_js = ', '.join([f'"{address}"' for address in wallet_addresses])
    new_wallets_line = f'const wallets = [{wallets_js}];'

    try:
        with open('console.js', 'r') as f:
            existing_code = f.read()
    except FileNotFoundError:
        print("Файл console.js не найден.")
        exit(1)

    pattern = re.compile(r'const wallets = \[.*?\];', re.DOTALL)
    updated_code = pattern.sub(new_wallets_line, existing_code)

    print("Открой консоль на сайте https://www.okx.com/ru/balance/withdrawal-add-address/btc и вставь туда этот код:\n\n\n\n")
    print(updated_code)
    print('\n\n')

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
    wallet_addresses = get_wallet_addresses()
    update_console_js(wallet_addresses)
