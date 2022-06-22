from django.urls import path, include
from .views import ArticleView
from .models import Article
from rest_framework import routers

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'articles', ArticleView, 'articles')


urlpatterns = [
    path('',  include(router.urls)),
    path('api/', include('rest_framework.urls', namespace='rest_framework'))
]