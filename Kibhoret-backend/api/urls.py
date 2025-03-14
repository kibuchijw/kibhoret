from django.urls import path
from . import views


urlpatterns = [
    # path('trucks/', views.Trucks.as_view()),
    path('trucks/', views.Trucks.as_view(), name='trucks'),
    path('truck/<int:pk>/', views.Truck.as_view()),
    # path('generalinfo/', views.GeneralInfos.as_view()),
    path('tankfarm/', views.Tankfarm.as_view()),

    path('weighbridge/in/', views.WeighbridgeIn.as_view()),
    path('weighbridge/out/', views.WeighbridgeOut.as_view()),
    path('qualitycontrol/', views.Lab.as_view()),
    path('auth/login/', views.UserLoginAPIView.as_view()),
]
