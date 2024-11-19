from django.db import models
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.

class Branch(models.Model):
    branch_id = models.CharField(max_length=50, primary_key=True)
    branch_name = models.CharField(max_length=50)
    branch_location = models.CharField(max_length=250)
    def __str__(self):
        return self.branch_name
    
class Client(models.Model):
    client_id = models.CharField(max_length=50, primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    phone = models.CharField(max_length=50)
    password = models.CharField(max_length=50, null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    client_identification_document_type = models.CharField(max_length=50, null=True, blank=True)
    client_identification_document_number = models.CharField(max_length=50, null=True, blank=True)
    residency = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=250, null=True, blank=True)
    occupation = models.CharField(max_length=50)
    nominee_name = models.CharField(max_length=50, null=True, blank=True)  #nominee information
    nominee_identification_document_type = models.CharField(max_length=50, null=True, blank=True)
    nominee_identification_document_number = models.CharField(max_length=50, null=True, blank=True)
    nominee_relation = models.CharField(max_length=50, null=True, blank=True)
    branch_id = models.ForeignKey(Branch, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.first_name + " " + self.last_name

class Product(models.Model):
    product_id = models.CharField(max_length=50, primary_key=True)
    product_name = models.CharField(max_length=50)  # product_name is the name of the product
    description = models.TextField(max_length=250)
    transaction_limit = models.DecimalField(max_digits=15, decimal_places=6)
    interest_rate = models.DecimalField(max_digits=15, decimal_places=6)
    monthly_fee = models.DecimalField(max_digits=15, decimal_places=6)
    def __str__(self):
        return self.product_name
    
class Account(models.Model):
    account_id = models.CharField(max_length=50, primary_key=True)
    client_id = models.ForeignKey(Client, on_delete=models.CASCADE, null=True, blank=True)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    balance = models.DecimalField(max_digits=15, decimal_places=6)
    def __str__(self):
        return self.account_id
    
class Teller(models.Model):
    employee_id = models.CharField(max_length=50, primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    phone = models.CharField(max_length=50)
    password = models.CharField(max_length=256)
    dob = models.DateField()
    address = models.CharField(max_length=250)
    branch_id = models.ForeignKey(Branch, on_delete=models.CASCADE, null=True, blank=True)

    def save(self, *args, **kwargs):
        # Only hash the password if it hasn't already been hashed
        if self.pk is None or not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.first_name + " " + self.last_name

    def check_password(self, raw_password):
        # A helper method to compare the raw password with the hashed one
        return check_password(raw_password, self.password)
    
class Schedule(models.Model):
    schedule_id = models.CharField(max_length=50, primary_key=True)
    employee_id = models.ForeignKey(Teller, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=250)
    date = models.DateField()
    start_time = models.TimeField()

    def __str__(self):
        return self.title
    
class Transaction(models.Model):
    transaction_id = models.CharField(max_length=50, primary_key=True)
    transaction_type = models.CharField(max_length=50)
    from_account_id = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='from_account', null=True, blank=True)
    to_account_id = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='to_account', null=True, blank=True)
    amount = models.DecimalField(max_digits=15, decimal_places=6)
    timestamp = models.DateTimeField() #timestamp is the time of the transaction
    def __str__(self):
        return self.transaction_id
