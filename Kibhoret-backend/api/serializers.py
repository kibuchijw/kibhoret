from rest_framework import serializers
from backend.models import *
from django.contrib.auth import authenticate


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
        fields = '__all__'


class WeighBridgeOutSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeighBridgeOut
        fields = '__all__'


class TruckSerializer(serializers.ModelSerializer):
    general_info = GeneralInfoSerializer(allow_null=True, required=False)
    weighbridge_in = WeighBridgeInSerializer(allow_null=True, required=False)
    quality_control = QualityControlSerializer(allow_null=True, required=False)
    tankfarm = OffloadingBaySerializer(allow_null=True, required=False)
    weighbridge_out = WeighBridgeOutSerializer(allow_null=True, required=False)

    class Meta:
        model = Truck
        fields = ['id', 'driver', 'cab_plate', 'trailer_plate', 'general_info',
                  'weighbridge_in', 'quality_control', 'tankfarm', 'weighbridge_out']

    def create(self, validated_data):
        general_info_data = validated_data.pop('general_info')
        general = None
        if general_info_data is not None:
            general = GeneralInfo.objects.create(**general_info_data)

        weighbridge_in_data = validated_data.pop('weighbridge_in')
        weigh_in = None
        if weighbridge_in_data is not None:
            weigh_in = WeighBridgeIn.objects.create(**weighbridge_in_data)

        quality_control_data = validated_data.pop('quality_control')
        qc = None
        if quality_control_data is not None:
            qc = QualityControl.objects.create(**quality_control_data)

        tankfarm_data = validated_data.pop('tankfarm')
        tf = None
        if tankfarm_data is not None:
            tf = OffloadingBay.objects.create(**tankfarm_data)

        weighbridge_out_data = validated_data.pop('weighbridge_out')
        weigh_out = None
        if weighbridge_out_data is not None:
            weigh_out = WeighBridgeOut.objects.create(**weighbridge_out_data)

        truck = Truck.objects.create(general_info=general,
                                     weighbridge_in=weigh_in,
                                     quality_control=qc,
                                     tankfarm=tf,
                                     weighbridge_out=weigh_out,
                                     **validated_data)
        return truck

    def update(self, instance, validated_data):
        instance.driver = validated_data.get('driver', instance.driver)
        instance.cab_plate = validated_data.get(
            'cab_plate', instance.cab_plate)
        instance.trailer_plate = validated_data.get(
            'trailer_plate', instance.trailer_plate)
        instance.save()

        general_data = validated_data.pop('general_info')
        if general_data is not None:
            general = instance.general_info
            if general is None:
                instance.general_info = GeneralInfo.objects.create(
                    **general_data)
                instance.save()
            else:
                general.delivery_number = general_data.get(
                    'delivery_number', general.delivery_number)
                general.loading_date = general_data.get(
                    'loading_date', general.loading_date)
                general.fuel_gauge = general_data.get(
                    'fuel_gauge', general.fuel_gauge)
                general.water_reservoir = general_data.get(
                    'water_reservoir', general.water_reservoir)
                general.number_of_seals = general_data.get(
                    'number_of_seals', general.number_of_seals)
                general.seals_condition = general_data.get(
                    'seals_condition', general.seals_condition)
                general.sealing_condition = general_data.get(
                    'sealing_condition', general.sealing_condition)
                general.seals_identification = general_data.get(
                    'seals_identification', general.seals_identification)
                general.time_in = general_data.get('time_in', general.time_in)
                general.time_out = general_data.get(
                    'time_out', general.time_out)
                general.officer_name = general_data.get(
                    'officer_name', general.officer_name)
                general.save()

        weighin_data = validated_data.pop('weighbridge_in')
        if weighin_data is not None:
            weigh_in = instance.weighbridge_in
            if weigh_in is None:
                instance.weighbridge_in = WeighBridgeIn.objects.create(
                    **weighin_data)
                instance.save()
            else:
                weigh_in.delivery_number = weighin_data.get(
                    'delivery_number', weigh_in.delivery_number)
                weigh_in.first_weight = weighin_data.get(
                    'first_weight', weigh_in.first_weight)
                weigh_in.time_in = weighin_data.get(
                    'time_in', weigh_in.time_in)
                weigh_in.time_out = weighin_data.get(
                    'time_out', weigh_in.time_out)
                weigh_in.operator_name = weighin_data.get(
                    'operator_name', weigh_in.operator_name)
                weigh_in.officer_name = weighin_data.get(
                    'officer_name', weigh_in.officer_name)
                weigh_in.save()

        qc_data = validated_data.pop('quality_control')
        if qc_data is not None:
            qc = instance.quality_control
            if qc is None:
                instance.quality_control = QualityControl.objects.create(
                    **qc_data)
                instance.save()
            else:
                qc.sample_type = qc_data.pop('sample_type', qc.sample_type)
                qc.sample_temperature = qc_data.pop(
                    'sample_temperature', qc.sample_temperature)
                qc.notes = qc_data.pop('notes', qc.notes)
                qc.inspector_name = qc_data.pop(
                    'inspector_name', qc.inspector_name)
                qc.sampler_name = qc_data.pop('sampler_name', qc.sampler_name)
                qc.sampling_time = qc_data.pop(
                    'sampling_time', qc.sampling_time)
                qc.chemist_name = qc_data.pop('chemist_name', qc.chemist_name)
                qc.sample_number = qc_data.pop(
                    'sample_number', qc.sample_number)
                qc.result_time = qc_data.pop('result_time', qc.result_time)
                qc.SMP = qc_data.pop('SMP', qc.SMP)
                qc.MIV = qc_data.pop('MIV', qc.MIV)
                qc.FFA = qc_data.pop('FFA', qc.FFA)
                qc.COLOR_B = qc_data.pop('COLOR_B', qc.COLOR_B)
                qc.COLOR_Y = qc_data.pop('COLOR_Y', qc.COLOR_Y)
                qc.COLOR_R = qc_data.pop('COLOR_R', qc.COLOR_R)
                qc.IV = qc_data.pop('IV', qc.IV)
                qc.result_out = qc_data.pop('result_out', qc.result_out)
                qc.save()

        tankfarm_data = validated_data.pop('tankfarm')
        if tankfarm_data is not None:
            tf = instance.tankfarm
            if tf is None:
                instance.tankfarm = OffloadingBay.objects.create(
                    **tankfarm_data)
                instance.save()
            else:
                tf.time_in = tankfarm_data.get('time_in', tf.time_in)
                tf.time_out = tankfarm_data.get('time_out', tf.time_out)
                tf.notes = tankfarm_data.get('notes', tf.notes)
                tf.operator_name = tankfarm_data.get(
                    'operator_name', tf.operator_name)
                tf.save()

        weighout_data = validated_data.pop('weighbridge_out')
        if weighout_data is not None:
            weigh_out = instance.weighbridge_out
            print("weightout", type(weigh_out))
            if weigh_out is None:
                instance.weighbridge_out = WeighBridgeOut.objects.create(
                    **weighout_data)
                instance.save()
            else:
                weigh_out.last_weight = weighout_data.get(
                    'last_weight', weigh_out.last_weight)
                weigh_out.weight_difference = weighout_data.get(
                    'weight_difference', weigh_out.weight_difference)
                weigh_out.time = weighout_data.get('time', weigh_out.time)
                weigh_out.operator_name = weighout_data.get(
                    'operator_name', weigh_out.operator_name)
                weigh_out.officer_name = weighout_data.get(
                    'officer_name', weigh_out.officer_name)
                weigh_out.save()

        return instance


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError(
                        "User account is disabled.")
            else:
                raise serializers.ValidationError(
                    "Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError(
                "Must include 'username' and 'password'.")

        return data
