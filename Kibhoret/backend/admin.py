from django.contrib import admin
from .models import GateEntry, WeighBridgeIn, WeighBridgeOut, QualityControl, OffloadingBay

class GateEntryAdmin(admin.ModelAdmin):
    list_display = ('id', 'truck_registration', 'time_in', 'officer_name')

class WeighBridgeInAdmin(admin.ModelAdmin):
    list_display = ('id', 'truck_registration', 'time_in', 'officer_name')

class QualityControlAdmin(admin.ModelAdmin):
    list_display = ('id', 'truck_registration', 'sampling_time', 'result_time', 'inspector_name', 'sampler_name', 'chemist_name')

class OffloadingBayAdmin(admin.ModelAdmin):
    list_display = ('id', 'truck_registration', 'time_in', 'operator_name')

class WeighBridgeOutAdmin(admin.ModelAdmin):
    list_display = ('id', 'truck_registration', 'time', 'operator_name')


# Register your models here.
admin.site.register(GateEntry, GateEntryAdmin)
admin.site.register(WeighBridgeIn, WeighBridgeInAdmin)
admin.site.register(QualityControl, QualityControlAdmin)
admin.site.register(OffloadingBay, OffloadingBayAdmin)
admin.site.register(WeighBridgeOut, WeighBridgeOutAdmin)

