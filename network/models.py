from django.contrib.auth.models import AbstractUser
from django.db import models
from cloudinary.models import CloudinaryField


class User(AbstractUser):
    header_image = CloudinaryField('image')
    pass

class NewPost(models.Model): 
    poster = models.ForeignKey(User, on_delete=models.PROTECT, related_name="posts_posted")
    description = models.TextField(blank=False)
    date_added = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "id": self.id,
            "poster": self.poster,
            "description": self.description,
            "date_added": self.date_added.strftime("%b %d %Y, %H:%M"),
        }

class Followers(models.Model):
    id = models.AutoField(primary_key=True)
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_followed", default=0)
    follower = models.ManyToManyField(User, related_name="user_follower")

    def serialize(self):
        return {
            "id": self.id,
            "followed": self.followed,
            "follower": self.follower,
        }

    def __str__(self):
        return f"{self.id}: The user {self.followed} number {self.followed.id} is followed by {self.follower.all()}."


class Likers(models.Model):
    id = models.AutoField(primary_key=True)
    post = models.ForeignKey(NewPost, on_delete=models.CASCADE, related_name="post_liked", default=0)
    liker = models.ManyToManyField(User, related_name="user_liker", blank=True)

    def serialize(self):
        return {
            "id": self.id,
            "post": self.post,
            "liker": self.liker,
        }

    def __str__(self):
        return f"{self.id}: The post {self.post} liked by {self.liker.all()}."