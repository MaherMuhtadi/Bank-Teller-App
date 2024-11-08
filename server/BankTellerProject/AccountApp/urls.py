from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("/", admin.site.urls),
    path("get_branch_list/", views.get_branch_list),
    path("get_product_list/", views.get_product_list),
    path("create_new_client/", views.create_new_client),
    path("get_client_details/", views.get_client_details),
    path("create_new_account/", views.create_new_account),
    path("account_list_for_client/",views.get_account_list_for_a_client),
    path("transaction/", views.create_transaction),

    path("deposite/", views.depositMoney),
    path("withdraw/", views.withdrawMoney),
]