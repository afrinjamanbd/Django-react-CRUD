"""assignment URL Configuration"""

from django.contrib import admin
from django.urls import path, include, re_path
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('app.urls')),
]
