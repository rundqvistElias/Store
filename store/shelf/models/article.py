from django.db import models


class Article(models.Model):
    article_title = models.CharField(max_length=200)
    article_price = models.FloatField()

    def __str__(self):
        return self.article_title
