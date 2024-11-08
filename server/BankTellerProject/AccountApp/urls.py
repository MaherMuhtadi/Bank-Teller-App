from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("/", admin.site.urls),
    path("get_branch_list/", views.get_branch_list),
    path("get_product_list/", views.get_product_list),
    
    path("deposite/", views.depositMoney),
    path("withdraw/", views.withdrawMoney),
]