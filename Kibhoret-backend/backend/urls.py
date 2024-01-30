# created this; maps our urls to various functions in view

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'), #best practice to name url endpoints
    path('gate/', views.truck_list),
    path('weighbridge-in/', views.weigh1),
    path('quality-control/', views.qualitycontrol),
    path('tankfarm/', views.offloading),
    path('weighbridge-out/', views.weigh2),

    path('gate/<int:gate_id>/', views.detail),
    
]
