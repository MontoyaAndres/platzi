import random

list_elements = list(range(100))


def show_list():
    print(list_elements)


def element_par():
    pars = [number for number in list_elements if number % 2 == 0]
    print(pars)


def add_word(word):
    global list_elements

    list_elements += word
    print(list_elements)


def student_list():
    student_uid = [1, 2, 3]
    students = ['Juan', 'Jose', 'Larsen']
    student_with_uid = {uid: student for uid,
                        student in zip(student_uid, students)}
    print(student_with_uid)


def number_list():
    random_numbers = []
    for i in range(10):
        random_numbers.append(random.randint(1, 3))

    non_repeated = {number for number in random_numbers}
    print(non_repeated)


if __name__ == '__main__':
    number_list()
