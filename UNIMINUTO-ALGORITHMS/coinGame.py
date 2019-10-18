"""
El problema es que el player1 y el player2 juegan a cara y cruz, que son 0 y 1
"""

import random

score = []
playerOneScore = 0
playerTwoScore = 0

tries = int(input('How many tries do you want to play? '))
triesCount = 0

while True:
    randomNumber = random.getrandbits(1)

    playerOne = input('PlayerOne what number? ')
    playerTwo = input('PlayerTwo what number? ')

    if int(playerOne) == randomNumber:
        score.append(0)
    
    if int(playerTwo) == randomNumber:
        score.append(1)
    
    triesCount += 1

    if triesCount == tries:
        print('The score is {}'.format(score))

        for value in score:
            if value == 0:
                playerOneScore += 1
            else:
                playerTwoScore += 1
        
        print('The playerOne has {} and the playerTwo has {}'.format(playerOneScore, playerTwoScore))

        break