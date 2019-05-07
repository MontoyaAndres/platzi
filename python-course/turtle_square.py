import turtle

window = turtle.Screen()

colors = ['red', 'purple', 'blue', 'green', 'yellow', 'orange']

pen = turtle.Pen()
pen.speed(0)

for x in range(360):
    pen.pencolor(colors[x % 6])
    pen.width(x / 100 + 1)
    pen.forward(x)
    pen.left(59)

window.mainloop()
