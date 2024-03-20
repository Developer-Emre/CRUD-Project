from django.db import models

# Create your models here.

class Event(models.Model):
    eventName = models.CharField(max_length=255,null=True,blank=True)
    description = models.TextField(blank=True, null=True)
    date = models.DateTimeField(null=True,blank=True)
    category = models.CharField(max_length=100)
    time = models.TimeField()

    def __str__(self):
        return self.title

