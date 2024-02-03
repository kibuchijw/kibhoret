from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from backend.models import *
from .serializers import *
from backend.models import WeighBridgeIn 

# Create your views here.
class Trucks(APIView):
    def get(self, request):
        trucks = Truck.objects.select_related().all()
        serialized_trucks = TruckSerializer(trucks, many=True)
        return Response(serialized_trucks.data)

    
class GeneralInfos(APIView):
    def get(self, request):
        infos = GeneralInfo.objects.prefetch_related('truck').all()
        serialized_infos = GeneralInfoSerializer(infos, many=True)
        return Response(serialized_infos.data)
    

# class WeighBridgeIn(APIView):
#     def get(self, request):
#         infos = WeighBridgeIn.objects.prefetch_related('truck').all()
#         serialized_infos = WeighBridgeInSerializer(infos, many=True)
#         return Response(serialized_infos.data)


class WeighIn(APIView):
    def get(self, request):
        infos = WeighBridgeIn.objects.prefetch_related('truck').all()
        serialized_infos = WeighBridgeInSerializer(infos, many=True)
        return Response(serialized_infos.data)
 
class WeighIn(APIView):
    def get(self, request):
        infos = WeighBridgeIn.objects.prefetch_related('truck').all()
        serialized_infos = WeighBridgeInSerializer(infos, many=True)
        return Response(serialized_infos.data)
    

class Lab(APIView):
    def get(self, request):
        infos = QualityControl.objects.prefetch_related('truck').all()
        serialized_infos = QualityControlSerializer(infos, many=True)
        return Response(serialized_infos.data)


class Tankfarm(APIView):
    def get(self, request):
        infos = OffloadingBay.objects.prefetch_related('truck').all()
        serialized_infos = OffloadingBaySerializer(infos, many=True)
        return Response(serialized_infos.data)

