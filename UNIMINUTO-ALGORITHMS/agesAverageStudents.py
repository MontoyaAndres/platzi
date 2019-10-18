"""
Sacar el promedio de edades de una cantidad de estudiantes
"""

from numpy import average

students = input('How many students do you have? ')
agesBySpace = input('Enter ages by space: ')

ages = list(map(int, agesBySpace.split(' ')))

result = average(ages)

print('The ages are {}, and the average is {}'.format(ages, result))