from django.urls import path
from . import views


urlpatterns = [
    path('trucks/', views.Trucks.as_view()),
    path('generalinfo/', views.GeneralInfos.as_view()),
    path('tankfarm/', views.Tankfarm.as_view())
]