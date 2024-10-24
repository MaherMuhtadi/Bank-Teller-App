from django.test import TestCase
from .views import calculate_balance_after_transaction
# Create your tests here.
class TransactionTestDebit(TestCase):
    def setUp(self):
        print("Setting up transaction test")
    
    def test_transaction_debit1(self):
        self.assertEqual(calculate_balance_after_transaction(1000, 500, 'debit'), 500)
    
    def test_transaction_debit2(self):
        self.assertEqual(calculate_balance_after_transaction(1000, 1000, 'debit'), 0)

    # def test_transaction_debit3(self):
    #     self.assertEqual(calculate_balance_after_transaction(1000, 440, 'debit'), 660)

class TransactionTestCredit(TestCase):
    def setUp(self):
        print("Setting up transaction test")
    
    def test_transaction_credi1(self):
        self.assertEqual(calculate_balance_after_transaction(1000, 500, 'credit'), 1500)
    
    # def test_transaction_credit2(self):
    #     self.assertEqual(calculate_balance_after_transaction(1000, 1000, 'credit'), 1999)

    def test_transaction_credit3(self):
        self.assertEqual(calculate_balance_after_transaction(1000, 440, 'credit'), 1440)

    
