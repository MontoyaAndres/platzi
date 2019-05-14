import random
import copy


def lists():
    # https://platzi.com/clases/1378-python/14164-uso-de-listas/
    countries = ["Colombia", "Ecuador", "Brasil", "Honduras"]
    # No hacer, porque si cambia el valor de `countries`, global_countries también cambia
    # global_countries = countries
    # Manera recomendada
    global_countries = copy.copy(countries)
    countries[0] = "Venezuela"
    print(countries, global_countries)


def binary_search(data, target, low, high):
    if low > high:
        return False

    mid = (low + high) // 2

    if target == data[mid]:
        return True
    elif target < data[mid]:
        return binary_search(data, target, low, mid - 1)
    else:
        return binary_search(data, target, mid + 1, high)


if __name__ == "__main__":
    data = [random.randint(0, 100) for i in range(10)]

    data.sort()

    print(data)

    target = int(input('What number would you like to find?'))
    found = binary_search(data, target, 0, len(data) - 1)

    print(found)
