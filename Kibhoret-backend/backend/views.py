from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
# Create your views here.

def index(request):
    return HttpResponse("Hello backend")

def weigh1(request):
    return HttpResponse('Weigh your truck')

def qualitycontrol(request):
    return HttpResponse('Allow us to sample and test your truckload')

def offloading(request):
    return HttpResponse('We shall now offload your tanker')

def weigh2(request):
    return HttpResponse('Finding second weight to calculate net load weight')

def trucks(request):
    return HttpResponse('We shall now offload your tanker')