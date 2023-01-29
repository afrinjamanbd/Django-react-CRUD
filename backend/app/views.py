from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from app.models import eventRecord
from .serializers import EventSerializer
from rest_framework.decorators import action,api_view


#Django REST CRUD API
class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = eventRecord.objects.all()

    #overriding get_queryset method for querystring url pattern
    def get_queryset(self):        
        if self.request.query_params.get('page[number]') != None and self.request.query_params.get('page[size]') is not None:
            number = int(self.request.query_params.get('page[number]'))
            size = int(self.request.query_params.get('page[size]'))
            start = (number - 1) * size 
            end = (number - 1) * size + size
            serializer_class = EventSerializer
            queryset = eventRecord.objects.all()[start:end]
            return queryset
        return self.queryset
        
