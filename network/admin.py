from django.contrib import admin
from .models import User, NewPost, Followers, Likers
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(NewPost)
admin.site.register(Followers)
admin.site.register(Likers)