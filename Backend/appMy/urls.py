from django.contrib import admin
from django.urls import path,include

from .views import *

urlpatterns = [
    path('get', getEvents, name='get_event'), 
    path('create', createEvent, name='create_event'), 
    path('update/<int:pk>', updateEvent, name='update_event'), 
    path('delete/<int:pk>', deleteEvent, name='delete_event'), 
    path('upcomingEvent',upcomingEvent,name='upcoming_event'), 

]