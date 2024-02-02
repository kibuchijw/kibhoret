from django.db import models
from django.utils import timezone

# Create your models here.

class GeneralInfo(models.Model):
    delivery_number = models.CharField(max_length=20)
    loading_date = models.DateField()
    FUEL_CHOICES = [('empty', 'Empty'), ('half', 'Half'), ('full', 'Full')]
    fuel_gauge = models.CharField(max_length=10, choices=FUEL_CHOICES)  
    WATER_CHOICES = [('empty', 'Empty'), ('half', 'Half'), ('full', 'Full')]
    water_reservoir = models.CharField(max_length=10, choices=WATER_CHOICES)
    number_of_seals = models.IntegerField()
    seals_condition = models.CharField(max_length=50)
    sealing_condition = models.CharField(max_length=50)
    seals_identification = models.TextField()
    time_in = models.DateTimeField(default=timezone.now)
    time_out = models.DateTimeField(default=timezone.now)
    officer_name = models.CharField(max_length=100)

    #other methods
    def __str__(self):
        return " GateEntry"
    

class WeighBridgeIn(models.Model):
    delivery_number = models.CharField(max_length=20)
    first_weight = models.DecimalField(max_digits=10, decimal_places=2)
    time_in = models.DateTimeField(auto_now_add=True)
    time_out = models.DateTimeField()
    operator_name = models.CharField(max_length=100)
    officer_name = models.CharField(max_length=100)

    def __str__(self):
        return " WB-In"
    


class QualityControl(models.Model):
    sample_type = models.CharField(max_length=10, choices=[('CPO', 'CPO'), ('CPKO', 'CPKO'), ('stearin', 'Stearin'), ('water', 'Water'), ('sludge', 'Sludge'), ('caustic', 'Caustic')])
    sample_temperature = models.DecimalField(max_digits=5, decimal_places=2)
    notes = models.TextField()
    inspector_name = models.CharField(max_length=100)
    sampler_name = models.CharField(max_length=100, null=True)
    sampling_time = models.DateTimeField(auto_now_add=True)

    chemist_name = models.CharField(max_length=100)
    sample_number = models.CharField(max_length=50)
    result_time = models.DateTimeField(default=timezone.now)
    SMP = models.DecimalField(max_digits=5, decimal_places=2)
    MIV = models.DecimalField(max_digits=5, decimal_places=2)
    FFA = models.DecimalField(max_digits=5, decimal_places=2)
    COLOR_B = models.IntegerField()
    COLOR_Y = models.IntegerField()
    COLOR_R = models.IntegerField()
    IV = models.IntegerField()
    result_out = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return " QC"


class OffloadingBay(models.Model):
    time_in = models.DateTimeField(default=timezone.now)
    time_out = models.DateTimeField()
    notes = models.TextField()
    operator_name = models.CharField(max_length=100)

    def __str__(self):
        return " offloadBay"
    

class WeighBridgeOut(models.Model):
    last_weight = models.DecimalField(max_digits=10, decimal_places=2)
    weight_difference = models.DecimalField(max_digits=10, decimal_places=2)
    time = models.DateTimeField(default=timezone.now)
    operator_name = models.CharField(max_length=100)
    officer_name = models.CharField(max_length=100)

    def __str__(self):
        return " WB-OUT"
    
class Truck(models.Model):
    driver = models.CharField(max_length=50)
    cab_plate = models.CharField(max_length=20)
    trailer_plate = models.CharField(max_length=20)
    general_info = models.ForeignKey(GeneralInfo, on_delete=models.CASCADE, null=True, related_name='truck')
    weighbridge_in = models.ForeignKey(WeighBridgeIn, on_delete=models.CASCADE, null=True, related_name='truck')
    quality_control = models.ForeignKey(QualityControl, on_delete=models.CASCADE, null=True, related_name='truck')
    tankfarm = models.ForeignKey(OffloadingBay, on_delete=models.CASCADE, null=True, related_name='truck')
    weighbridge_out = models.ForeignKey(WeighBridgeOut, on_delete=models.CASCADE, null=True, related_name='truck')


    def __str__(self):
        return self.cab_plate
