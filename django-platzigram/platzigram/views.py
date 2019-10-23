from django.http import HttpResponse, JsonResponse
from datetime import datetime


def hello_world(request):
    now = datetime.now().strftime("%b %dth %Y - %H:%M hrs")

    return HttpResponse("Oh, hi! Current server time is {now}".format(now=now))


def hi(request):
    # This is a interesting debugger
    # import pdb; pdb.set_trace()

    response = {}

    try:
        numbers = sorted(map(int, set(request.GET["numbers"].split(","))))

        response = JsonResponse({"numbers": dict(enumerate(numbers))})
    except Exception as e:
        print(e)
        response = JsonResponse({"error": "bad request"})
    finally:
        return response


def user(request, name, age):
    if age < 12:
        message = "Sorry {}, you are not allowed here".format(name)
    else:
        message = "Hello, {}! Welcome to Platzigram".format(name)

    return HttpResponse(message)
