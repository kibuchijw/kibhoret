from django.conf import settings
from django.shortcuts import render
import jwt
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from backend.models import *
from backend.models import Truck as TruckModel
from .serializers import *
from django.http import JsonResponse

from django.shortcuts import get_object_or_404
from rest_framework.exceptions import NotFound, ValidationError

from rest_framework.response import Response


class Truck(APIView):
    """
    An API endpoint that allows CRUD operations on a given
    truck instance
    """
    def get(self, request, pk):
        """ Retrieves a truck instance based on its primary key"""
        truck = get_object_or_404(TruckModel, pk=pk)
        serializer = TruckSerializer(truck)
        return JsonResponse(serializer.data)

    def delete(self, request, pk):
        """ Deletes a truck instance by its primary key """
        truck = get_object_or_404(TruckModel, pk=pk)
        truck.delete()
        return JsonResponse(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        """ Updates a truck instance by its primary key  """
        truck = get_object_or_404(TruckModel, pk=pk)
        serializer = TruckSerializer(truck, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        else:
            error_message = "Validation Error in PUT request. Please check the following fields:"
            raise ValidationError({error_message: serializer.errors})


class Trucks(APIView):
    """
    An API endpoint that allows CRUD operations on multiple Truck
    instances
    """
    def get(self, request):
        """ Retrieve all Truck instances """
        trucks = TruckModel.objects.select_related().all()
        serialized_trucks = TruckSerializer(trucks, many=True)
        total_trucks = len(serialized_trucks.data)
        all_trucks = serialized_trucks.data
        return JsonResponse({"total_trucks": total_trucks, "all_trucks": all_trucks})

    def post(self, request):
        """ Create a new Truck instance """
        serializer = TruckSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            error_message = "Validation Error in POST request. Please check the following fields:"
            raise ValidationError({error_message: serializer.errors})


class WeighbridgeIn(APIView):
    """ An API endpoint providing all operations on trucks when
    they enter the weightbridge for the first time
    """
    def get(self, request):
        """ Retrieves all the trucks that have gone through
        the weighbridge for the first time
        """
        trucks = TruckModel.objects.select_related().filter(
            general_info__isnull=False,
            weighbridge_in__isnull=True)
        serialized_trucks = TruckSerializer(trucks, many=True)
        total_trucks = len(serialized_trucks.data)
        all_trucks = serialized_trucks.data
        return JsonResponse({"total_trucks": total_trucks, "all_trucks": all_trucks})


class Lab(APIView):
    """ API endpoint providing information on operations of the truck
    and its payload at the quality control stage
    """
    def get(self, request):
        """ Retrieves all trucks that have gone through the lab stage """
        trucks = TruckModel.objects.select_related().filter(
            weighbridge_in__isnull=False, quality_control__isnull=True)
        serialized_trucks = TruckSerializer(trucks, many=True)
        total_trucks = len(serialized_trucks.data)
        all_trucks = serialized_trucks.data
        return JsonResponse({"total_trucks": total_trucks, "all_trucks": all_trucks})


class Tankfarm(APIView):
    """" API endpoint providing truck information and offloading
     process
     """
    def get(self, request):
        """ Retrieves all trucks that have gone through offloading stage """
        trucks = TruckModel.objects.select_related().filter(
            tankfarm__isnull=True, quality_control__isnull=False)
        serialized_trucks = TruckSerializer(trucks, many=True)
        total_trucks = len(serialized_trucks.data)
        all_trucks = serialized_trucks.data
        return JsonResponse({"total_trucks": total_trucks, "all_trucks": all_trucks})


class WeighbridgeOut(APIView):
    """" API endpoint providing operations related to trucks on the
     second and final weigh at the weighbridge
     """
    def get(self, request):
        """  Retrieves all trucks that have gone through second weighing """ 
        trucks = TruckModel.objects.select_related().filter(
            weighbridge_out__isnull=True, tankfarm__isnull=False)
        serialized_trucks = TruckSerializer(trucks, many=True)
        total_trucks = len(serialized_trucks.data)
        all_trucks = serialized_trucks.data
        return JsonResponse({"total_trucks": total_trucks, "all_trucks": all_trucks})

# views.py


class UserLoginAPIView(APIView):
    """ API endpoint for user authentication and token generation """
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        """ Method that authenticates users and generates JWT """
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']

            # Retrieve user roles
            roles = [group.name for group in user.groups.all()]

            # Define the expiration time
            expiration_time = datetime.utcnow() + timedelta(minutes=30)

            # Generate JWT token with user role information
            token_payload = {
                'user_id': user.id,
                'username': user.username,
                'roles': roles,  # Include user roles in the payload
                'exp': expiration_time,  # Expiration time
            }
            token = jwt.encode(
                token_payload, settings.SECRET_KEY, algorithm='HS256')
            return Response({"token": token}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
