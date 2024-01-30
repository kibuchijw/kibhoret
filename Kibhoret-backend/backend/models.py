from django.db import models
from django.utils import timezone

# Create your models here.

class GateEntry(models.Model):
    truck_registration = models.CharField(max_length=30)
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
    cleanliness = models.CharField(max_length=50)
    leakages = models.BooleanField()
    time_in = models.DateTimeField(default=timezone.now)
    time_out = models.DateTimeField(default=timezone.now)
    officer_name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Gate Entry"

    #other methods
    def __str__(self):
        return self.truck_registration
    

class WeighBridgeIn(models.Model):
    truck_registration = models.CharField(max_length=30)
    delivery_number = models.CharField(max_length=20)
    first_weight = models.DecimalField(max_digits=10, decimal_places=2)
    time_in = models.DateTimeField(auto_now_add=True)
    time_out = models.DateTimeField()
    operator_name = models.CharField(max_length=100)
    officer_name = models.CharField(max_length=100)

    gate_entry = models.ForeignKey(GateEntry, on_delete=models.CASCADE, related_name='weigh_bridge_ins')
    class Meta:
        verbose_name_plural = "Weigh Bridge In"

    def __str__(self):
        return self.truck_registration
    


class QualityControl(models.Model):
    truck_registration = models.CharField(max_length=30)
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

    # weigh_bridge_in = models.ForeignKey(WeighBridgeIn, on_delete=models.CASCADE, related_name='quality_controls')

    class Meta:
        verbose_name_plural = "Quality Control"

    def __str__(self):
        return self.truck_registration


class OffloadingBay(models.Model):
    truck_registration = models.CharField(max_length=30)
    time_in = models.DateTimeField(default=timezone.now)
    time_out = models.DateTimeField()
    notes = models.TextField()
    operator_name = models.CharField(max_length=100)

    # quality_control = models.ForeignKey(QualityControl, on_delete=models.CASCADE, related_name='offloading_bays')

    class Meta:
        verbose_name_plural = "Tank Farm"

    def __str__(self):
        return self.truck_registration
    

class WeighBridgeOut(models.Model):
    truck_registration = models.CharField(max_length=30)
    last_weight = models.DecimalField(max_digits=10, decimal_places=2)
    weight_difference = models.DecimalField(max_digits=10, decimal_places=2)
    time = models.DateTimeField(default=timezone.now)
    operator_name = models.CharField(max_length=100)
    officer_name = models.CharField(max_length=100)

    # offloading_bay = models.ForeignKey(OffloadingBay, on_delete=models.CASCADE, related_name='weigh_bridge_outs')

    class Meta:
        verbose_name_plural = "Weigh Bridge Out"

    def __str__(self):
        return self.truck_registration