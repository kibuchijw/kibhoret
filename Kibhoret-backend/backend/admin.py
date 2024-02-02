from django.contrib import admin
from .models import GeneralInfo, WeighBridgeIn, WeighBridgeOut, QualityControl, OffloadingBay, Truck


class TruckAdmin(admin.ModelAdmin):
    list_display = ('id', 'driver', 'cab_plate')

class GeneralInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'truck', 'time_in', 'officer_name')

class WeighBridgeInAdmin(admin.ModelAdmin):
    list_display = ('id', 'truck', 'time_in', 'officer_name')

class QualityControlAdmin(admin.ModelAdmin):
    list_display = ('id', 'truck', 'sampling_time', 'result_time', 'inspector_name', 'sampler_name', 'chemist_name')

class OffloadingBayAdmin(admin.ModelAdmin):
    list_display = ('id', 'truck', 'time_in', 'operator_name')

class WeighBridgeOutAdmin(admin.ModelAdmin):
    list_display = ('id', 'truck', 'time', 'operator_name')



# Register your models here.
admin.site.register(Truck, TruckAdmin)
admin.site.register(GeneralInfo, GeneralInfoAdmin)
admin.site.register(WeighBridgeIn, WeighBridgeInAdmin)
admin.site.register(QualityControl, QualityControlAdmin)
admin.site.register(OffloadingBay, OffloadingBayAdmin)
admin.site.register(WeighBridgeOut, WeighBridgeOutAdmin)

