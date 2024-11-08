from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import random
from .serializers import ClientSerializer, AccountSerializer, BranchSerializer, BranchDropDownSerializer, ProductDropDownSerializer
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