from rest_framework import serializers
from backend.models import *


class GeneralInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralInfo
        fields = '__all__'

class WeighBridgeInSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeighBridgeIn
        fields = '__all__'

class QualityControlSerializer(serializers.ModelSerializer):
    class Meta:
        model = QualityControl
        fields = '__all__'

class OffloadingBaySerializer(serializers.ModelSerializer):
    class Meta:
        model = OffloadingBay
        fields = ['id', 'time_in', 'time_out', 'notes', 'operator_name', 'truck']

class WeighBridgeOutSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeighBridgeOut
        fields = '__all__'

class TruckSerializer(serializers.ModelSerializer):
    general_info = GeneralInfoSerializer()
    weighbridge_in = WeighBridgeInSerializer()
    quality_control = QualityControlSerializer()
    tankfarm = OffloadingBaySerializer()
    weighbridge_out = WeighBridgeOutSerializer()

    class Meta:
        model = Truck
        fields = ['id', 'driver', 'cab_plate', 'trailer_plate', 'general_info', 'weighbridge_in', 'quality_control', 'tankfarm', 'weighbridge_out']
        depth = 2
