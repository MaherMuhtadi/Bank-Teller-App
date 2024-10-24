from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import random
from .serializers import ClientSerializer, BankAccountSerializer
from .models import Client, BankAccount
# Create your views here.

def account_list(request):
    accounts = BankAccount.objects.all()
    serializer = BankAccountSerializer(accounts, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def create_newClient(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        occupation = data.get('occupation')
        address = data.get('address')
        email = data.get('email')
        phone = data.get('phone')
        nominee = data.get('nominee')

        # Generate a unique 9-digit client ID
        client_id = str(random.randint(100000000000, 999999999999))

        
        # Fetch all existing client IDs
        existing_client_ids = set(Client.objects.values_list('client_id', flat=True))

        # Generate a unique 12-digit client ID
        while True:
            client_id = str(random.randint(100000000000, 999999999999))
            if client_id not in existing_client_ids:
                break

        # Create a new Client object
        client = Client(
            client_id=client_id,
            firstname=firstname,
            lastname=lastname,
            occupation=occupation,
            address=address,
            email=email,
            phone=phone,
            nominee=nominee
        )

        # Save the Client object to the database
        client.save()
        response_data = {
            'client_id': client_id,
            'user_name': f"{firstname} {lastname}"
        }

        return JsonResponse(response_data, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def create_newAccount(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        client = data.get('client')
        account_type = data.get('account_type')
        branch = data.get('branch')

        # Check if the client exists
        try:
            client = Client.objects.get(client_id=client)
        except Client.DoesNotExist:
            return JsonResponse({'error': 'Client does not exist'}, status=404)

        
        # Fetch all existing client IDs
        existing_account_ids = set(BankAccount.objects.values_list('account_no', flat=True))

        # Generate a unique 12-digit client ID
        while True:
            account_no = str(random.randint(100000000, 999999999))
            if account_no not in existing_account_ids:
                break

        # Create a new Client object
        bankAccount = BankAccount(
           account_no=account_no,
            client=client,
            account_type=account_type,
            balance=0,
            branch=branch
        )

        # Save the Client object to the database
        bankAccount.save()
        response_data = {
            'account_no': account_no,
            'nameOfAccount': f"{client.firstname} {client.lastname}"
        }

        return JsonResponse(response_data, status=201)

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
            account = BankAccount.objects.get(account_no=account_no)
        except BankAccount.DoesNotExist:
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
            account = BankAccount.objects.get(account_no=account_no)
        except BankAccount.DoesNotExist:
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