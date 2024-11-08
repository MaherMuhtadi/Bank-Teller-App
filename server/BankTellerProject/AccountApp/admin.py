from django.contrib import admin
from .models import Client, Account, Branch, Product, Schedule, Transaction, Teller
# Register your models here.

admin.site.register(Client)
admin.site.register(Account)
admin.site.register(Branch)
admin.site.register(Product)
admin.site.register(Schedule)
admin.site.register(Transaction)
admin.site.register(Teller)