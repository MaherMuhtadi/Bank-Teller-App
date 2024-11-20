from django.db import models

# Create your models here.
class Client(models.Model):
    client_id = models.CharField(max_length=50, primary_key=True)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    
    occupation = models.CharField(max_length=50)
    address = models.CharField(max_length=250)
    email = models.EmailField(max_length=50)
    phone = models.CharField(max_length=50)
    nominee = models.CharField(max_length=50)

    def __str__(self):
        return self.firstname + " " + self.lastname

class BankAccount(models.Model):
    account_no = models.CharField(max_length=50, primary_key=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    account_type = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    branch = models.CharField(max_length=50)
#Transaction model for the ml model
class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    amount = models.FloatField()
    transaction_time = models.IntegerField()  # Hours of the day (0-23)
    transaction_location = models.CharField(max_length=10, choices=[('local', 'Local'), ('foreign', 'Foreign')])
    account_balance = models.FloatField()

    def __str__(self):
        return f"Transaction {self.transaction_id} - Amount: {self.amount}" self.account_no

