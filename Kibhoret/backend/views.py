from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import GateEntry
# Create your views here.

def index(request):
    return HttpResponse("Hello backend")

def truck_list(request):
    trucks = GateEntry.objects.all()
    output = ', '.join([t.truck_registration for t in trucks])
    return HttpResponse(output)

def weigh1(request):
    return HttpResponse('Weigh your truck')

def qualitycontrol(request):
    return HttpResponse('Allow us to sample and test your truckload')

def offloading(request):
    return HttpResponse('We shall now offload your tanker')

def weigh2(request):
    return HttpResponse('Finding second weight to calculate net load weight')

def detail(request, gate_id):
    truck = get_object_or_404(GateEntry, pk=gate_id) # could also use id in place of pk
    reg_no = truck.truck_registration
    return HttpResponse(f"Registration Number of Truck {gate_id}: {reg_no}")