from django.urls import path
from . import views


urlpatterns = [
    path('trucks/', views.Trucks.as_view()),
    path('generalinfo/', views.GeneralInfos.as_view()),
    path('tankfarm/', views.Tankfarm.as_view()),

    path('weighbridge/in/', views.WeighbridgeIn.as_view()),
    path('weighbridge/out/', views.WeighbridgeOut.as_view()),
    path('qc/', views.Lab.as_view()),
]