"""assignment app URL Configuration"""

from .views import EventViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'events', EventViewSet, basename= 'app')
urlpatterns = router.urls