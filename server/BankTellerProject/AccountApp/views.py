from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
import json
import random
from .serializers import ClientSerializer, AccountSerializer, BranchSerializer, BranchDropDownSerializer, ProductDropDownSerializer, CreateClientSerializer
from .models import Client, Account, Branch, Product, Transaction, Teller, Schedule
# Create your views here.

@csrf_exempt
def get_branch_list(request):
    branches = Branch.objects.all()
    serializer = BranchDropDownSerializer(branches, many=True)
    return JsonResponse(serializer.data, safe=False)
@csrf_exempt
def get_product_list(request):
    products = Product.objects.all()
    serializer = ProductDropDownSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def create_new_client(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CreateClientSerializer(data=data)
        if serializer.is_valid():
            # Generate a unique 10-digit client_id
            while True:
                client_id = str(random.randint(1000000000, 9999999999))
                if not Client.objects.filter(client_id=client_id).exists():
                    break
            serializer.save(client_id=client_id)
            response_data = {
            'client_id': client_id
        }
            return JsonResponse(response_data, status=201)
        return JsonResponse(serializer.errors, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def get_client_details(request):
    if request.method == 'GET':
        data = JSONParser().parse(request)
        client_id = data.get('client_id')
        password = data.get('password')

        try:
            client = Client.objects.get(client_id=client_id, password=password)
        except Client.DoesNotExist:
            return JsonResponse({'error': 'Invalid client_id or password'}, status=400)

        serializer = ClientSerializer(client)
        return JsonResponse(serializer.data, safe=False, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def create_new_account(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        client_id = data.get('client_id')
        product_id = data.get('product_id')

        # Check if the client and product exist
        try:
            client = Client.objects.get(client_id=client_id)
            product = Product.objects.get(product_id=product_id)
        except (Client.DoesNotExist, Product.DoesNotExist):
            return JsonResponse({'error': 'Invalid client_id or product_id'}, status=400)
        # Generate a unique 9-digit account_id
        while True:
            account_id = str(random.randint(100000000, 999999999))
            if not Account.objects.filter(account_id=account_id).exists():
                break

        # Create a new Account object
        account = Account(
            account_id=account_id,
            client_id=client,
            product_id=product,
            balance=0
        )

        # Save the Account object to the database
        account.save()

        # Prepare the JSON response
        response_data = {
            'account_id': account.account_id
        }

        return JsonResponse(response_data, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def get_account_list_for_a_client(request):
    if request.method == 'GET':
        data = JSONParser().parse(request)
        client_id = data.get('client_id')
        password = data.get('password')

        try:
            client = Client.objects.get(client_id=client_id, password=password)
        except Client.DoesNotExist:
            return JsonResponse({'error': 'Invalid client_id or password'}, status=400)

        accounts = Account.objects.filter(client_id=client)
        serializer = AccountSerializer(accounts, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


def calculate_balance_after_transaction(current_balance, amount, transaction_type):
    if transaction_type=='credit':
        return current_balance + amount
    elif transaction_type=='debit':
        return current_balance - amount
 
@csrf_exempt
def depositMoney(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        clientId = data.get('client_id')
        account_no = data.get('account_no')
        amount = data.get('amount')

        # Check if the account exists
        try:
            account = Account.objects.get(account_no=account_no)
        except Account.DoesNotExist:
            return JsonResponse({'error': 'Account does not exist'}, status=404)

        # Add the amount to the account balance
        account.balance = calculate_balance_after_transaction(current_balance=account.balance, amount=amount,
                                                              transaction_type='credit')

        # Save the updated account balance
        account.save()

        # Return a JSON response with the updated balance
        response_data = {
            'account_no': account_no,
            'updated_balance': account.balance
        }

        return JsonResponse(response_data, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def withdrawMoney(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        clientId = data.get('client_id')
        account_no = data.get('account_no')
        amount = data.get('amount')

        # Check if the account exists
        try:
            account = Account.objects.get(account_no=account_no)
        except Account.DoesNotExist:
            return JsonResponse({'error': 'Account does not exist'}, status=404)

        # Check if the account has sufficient balance
        if account.balance < amount:
            return JsonResponse({'error': 'Insufficient balance'}, status=400)

        # Deduct the amount from the account balance
        account.balance = calculate_balance_after_transaction(current_balance=account.balance, amount=amount,
                                                              transaction_type='debit')

        # Save the updated account balance
        account.save()

        # Return a JSON response with the updated balance
        response_data = {
            'account_no': account_no,
            'updated_balance': account.balance
        }

        return JsonResponse(response_data, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=400)