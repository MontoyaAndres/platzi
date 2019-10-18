romanNumbers = {
    "i": 1,
    "v": 5,
    "x": 10,
    "l": 50,
    "c": 100,
    "d": 500,
    "m": 1000
}

number = input('Enter a roman number: ')
result = 0

for i in range(len(number)):
    value = romanNumbers[number[i]]

    if i+1 < len(number) and romanNumbers[number[i+1]] > value:
        result -= value
    else:
        result += value

print(result)