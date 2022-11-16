
from django.urls import path

from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.index, name="index"),
    path("new_post", views.new_post, name="new_post"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes
    path("posts", views.compose_post, name="compose_post"),
    path("follow/<int:id_poster>", views.follow, name="follow"),
    path("pagesposts", views.pagesposts, name="pagesposts"),
    path("edit", views.edit, name="edit"),
    path("edit_profile/", views.edit_profile, name="edit_profile"),
    path("like/<int:id_post>", views.like, name="like"),
    path("<str:filter_view>/<str:data_search>/<int:user_id>/<int:jump_page>", views.postsbox, name="postsbox"),
   
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
