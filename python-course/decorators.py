from getpass import getpass

PASSWORD = '123456'


def password_required(func):
    def wrapper():
        password = getpass('What is your password? ')

        if password == PASSWORD:
            return func()
        else:
            print("You're wrong")

    return wrapper


@password_required
def needs_password():
    print('here we go!')


def upper(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)

        return result.upper()

    return wrapper


@upper
def say_my_name(name):
    return 'Hola, {}'.format(name)


if __name__ == '__main__':
    print(say_my_name('hey'))
    needs_password()
