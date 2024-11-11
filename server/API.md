branch_id: 101, 102, 103
product: 801, 802, 803
<!-- new field for credit account, in product schema, field balance -->

post create_new_client:
    <!-- client_id -->
    first_name 
    last_name
    email 
    phone 
    password 
    dob  
    client_identification_document_type  
    client_identification_document_number 
    residency 
    address  
    occupation 
    nominee_name 
    nominee_identification_document_type  
    nominee_identification_document_number  
    nominee_relation  
    branch_id 

    response:
        ClientId

get client info:
    client id, password;
    return all details

post create_account:
    <!-- account_id = models.CharField(max_length=50, primary_key=True) -->
    client_id = models.ForeignKey(Client, on_delete=models.CASCADE, null=True, blank=True)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)

return account_id

get account_details:
    client id, password
    return all_details of all accounts


Transaction:
    <!-- transaction_id = models.CharField(max_length=50, primary_key=True) -->
    transaction_type = models.CharField(max_length=50)
    from_account_id = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='from_account', null=True, blank=True)
    to_account_id = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='to_account', null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    <!-- timestamp = models.DateTimeField() #timestamp is the time of the transaction -->

return new balance for from accounts and its details, transaction_id

get all_transactions:
    return all_transactions from Transaction table 
    

get all_branch:
    id, name: json
get all_products:
    id, name: json


