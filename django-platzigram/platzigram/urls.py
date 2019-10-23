from django.urls import path

from platzigram import views

urlpatterns = [
    path("hello/", views.hello_world),
    path("sorted/", views.hi),
    path("user/<str:name>/<int:age>", views.user),
]
