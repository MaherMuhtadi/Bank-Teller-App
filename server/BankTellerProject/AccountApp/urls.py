from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("/", admin.site.urls),
    path("account_list/", views.account_list),
    path("create_newClient/", views.create_newClient),
    path("create_newAccount/", views.create_newAccount),
]