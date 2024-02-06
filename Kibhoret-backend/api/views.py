from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from backend.models import *
from backend.models import Truck as TruckModel
from .serializers import *
from django.http import JsonResponse


# Create your views here.
class Truck(APIView):
    def get(self, request, pk):
        truck = TruckModel.objects.get(pk=pk)
        serializer = TruckSerializer(truck)
        return JsonResponse(serializer.data)

    def delete(self, request, pk):
        truck = TruckModel.objects.get(pk=pk)
        truck.delete()
        return JsonResponse(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        truck = TruckModel.objects.get(pk=pk)
        serializer = TruckSerializer(truck, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return   JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Trucks(APIView):
    def get(self, request):
        trucks = TruckModel.objects.select_related().all()
        serialized_trucks = TruckSerializer(trucks, many=True)
        total_trucks = len(serialized_trucks.data)
        all_trucks = serialized_trucks.data
        return JsonResponse({"total_trucks": total_trucks, "all_trucks": all_trucks})

    def post(self, request):
        serializer = TruckSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class GeneralInfos(APIView):
#     def get(self, request):
#         infos = GeneralInfo.objects.prefetch_related('truck').all()
#         serialized_infos = GeneralInfoSerializer(infos, many=True)
#         return Response(serialized_infos.data)


class WeighbridgeIn(APIView):
    def get(self, request):
        trucks = TruckModel.objects.select_related().filter(
            general_info__isnull=False,
            weighbridge_in__isnull=True)
        serialized_trucks = TruckSerializer(trucks, many=True)
        total_trucks = len(serialized_trucks.data)
        all_trucks = serialized_trucks.data
        return JsonResponse({"total_trucks": total_trucks, "all_trucks": all_trucks})


class Lab(APIView):
    def get(self, request):
        trucks = TruckModel.objects.select_related().filter(
            weighbridge_in__isnull=False, quality_control__isnull=True)
        serialized_trucks = TruckSerializer(trucks, many=True)
        total_trucks = len(serialized_trucks.data)
        all_trucks = serialized_trucks.data
        return JsonResponse({"total_trucks": total_trucks, "all_trucks": all_trucks})


class Tankfarm(APIView):
    def get(self, request):
        trucks = TruckModel.objects.select_related().filter(
            tankfarm__isnull=True, quality_control__isnull=False)
        serialized_trucks = TruckSerializer(trucks, many=True)
        total_trucks = len(serialized_trucks.data)
        all_trucks = serialized_trucks.data
        return JsonResponse({"total_trucks": total_trucks, "all_trucks": all_trucks})


class WeighbridgeOut(APIView):
    def get(self, request):
        trucks = TruckModel.objects.select_related().filter(
            weighbridge_out__isnull=True, tankfarm__isnull=False)
        serialized_trucks = TruckSerializer(trucks, many=True)
        total_trucks = len(serialized_trucks.data)
        all_trucks = serialized_trucks.data
        return JsonResponse({"total_trucks": total_trucks, "all_trucks": all_trucks})
