from django.db import models

# Create your models here.


class eventRecord(models.Model):
    Name = models.CharField(max_length=100)
    Location = models.CharField(max_length=30)
    Date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.Name + ' ' + self.Location