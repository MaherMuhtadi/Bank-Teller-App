from rest_framework import serializers
from .models import Client, Account, Branch, Product, Teller, Schedule, Transaction

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"
class CreateClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            'first_name', 'last_name', 'email', 'phone', 'password', 'dob',
            'client_identification_document_type', 'client_identification_document_number',
            'residency', 'address', 'occupation', 'nominee_name',
            'nominee_identification_document_type', 'nominee_identification_document_number',
            'nominee_relation', 'branch_id'
        ]
        
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"
    
class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = "__all__"

class BranchDropDownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['branch_id', 'branch_name']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class ProductDropDownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_id', 'product_name']

class TellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teller
        fields = "__all__"

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = "__all__"

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"