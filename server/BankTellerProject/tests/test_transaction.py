def calculate_balance_after_transaction(current_balance, amount, transaction_type):
    if transaction_type=='credit':
        return current_balance + amount
    elif transaction_type=='debit':
        return current_balance - amount
def test_transaction_debit():
    calculated_amount = calculate_balance_after_transaction(1000, 500, 'debit')
    assert calculated_amount == 400

def test_transaction_debit2():
    calculated_amount = calculate_balance_after_transaction(800, 500, 'debit')
    assert calculated_amount == 300

def test_transaction_credit():
    calculated_amount = calculate_balance_after_transaction(1000, 500, 'credit')
    assert calculated_amount == 1500

def test_transaction_credit2():
    calculated_amount = calculate_balance_after_transaction(10, 500, 'credit')
    assert calculated_amount == 510
