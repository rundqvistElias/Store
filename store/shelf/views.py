from rest_framework import viewsets

from .serializer import ArticleSerializer
from .models import Article

class ArticleView(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer