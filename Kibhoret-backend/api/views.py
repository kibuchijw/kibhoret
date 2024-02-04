from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from backend.models import *
from .serializers import *


# Create your views here.
class Trucks(APIView):
    def get(self, request):
        trucks = Truck.objects.select_related().all()
        serialized_trucks = TruckSerializer(trucks, many=True)
        return Response(serialized_trucks.data)
    
    def post(self, request):
        serialized_truck = TruckSerializer(data=request.data)
        if serialized_truck.is_valid():
            serialized_truck.save()
            return Response(serialized_truck.data, status=status.HTTP_201_CREATED)
        return Response(serialized_truck.errors, status=status.HTTP_400_BAD_REQUEST)


class GeneralInfos(APIView):
    def get(self, request):
        infos = GeneralInfo.objects.prefetch_related('truck').all()
        serialized_infos = GeneralInfoSerializer(infos, many=True)
        return Response(serialized_infos.data)
    



class WeighbridgeIn(APIView):
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
    
class WeighbridgeOut(APIView):
    def get(self, request):
        infos = WeighBridgeOut.objects.prefetch_related('truck').all()
        serialized_infos = WeighBridgeOutSerializer(infos, many=True)
        return Response(serialized_infos.data)

