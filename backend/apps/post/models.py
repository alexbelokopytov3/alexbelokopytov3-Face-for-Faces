from django.db import models
from django.conf import settings
from django.utils import timezone

def url_directory(instance, filename):
        return 'posts/{0}/{1}/{2}'.format(instance.create_date, instance.id, filename)

class Post(models.Model):

    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(upload_to=url_directory, blank=True, null=True)
    text = models.CharField(max_length=200)
    create_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return 'Post {}'.format(self.create_date)


class Comment(models.Model):

    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    text = models.CharField(max_length=200)
    create_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return 'Post {}'.format(self.post, self.author)