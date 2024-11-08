#!/usr/bin/env python
# coding: utf-8

# In[15]:


#libraries
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest

# sample data need to change for actual data set
np.random.seed(42)  # For reproducibility

data = {
    'transaction_id': range(1, 21),
    'amount': np.random.normal(loc=500, scale=50, size=20), 
    'transaction_time': np.random.randint(0, 24, 20),  
    'transaction_location': np.random.choice(['local', 'foreign'], 20),  
    'account_balance': np.random.normal(loc=3000, scale=500, size=20)  
}

# simulate fraud using outliers
data['amount'][[2, 7, 15]] = [5000, 8000, 12000]  # outliers
data['transaction_location'][[2, 7, 15]] = ['foreign', 'foreign', 'foreign'] 

df = pd.DataFrame(data)

# Encode categorical features to avoid undefind data columns
df_encoded = pd.get_dummies(df, columns=['transaction_location'], drop_first=True)

# Select features dynamically
features = ['amount', 'transaction_time', 'account_balance']
if 'transaction_location_foreign' in df_encoded.columns:
    features.append('transaction_location_foreign')

# Extract the selected features
X = df_encoded[features]

# Use the isolation forest model
isolation_forest = IsolationForest(n_estimators=100, contamination=0.1, random_state=42)
df['fraud_score'] = isolation_forest.fit_predict(X)

# Find which ones are fraud or not
df['is_fraud'] = df['fraud_score'].apply(lambda x: 'Fraudulent' if x == -1 else 'Legitimate')

# Results
print("Fraud Detection Results:")
print(df[['transaction_id', 'amount', 'transaction_time', 'transaction_location', 'is_fraud']])

#Plot the result
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))
colors = df['is_fraud'].apply(lambda x: 'red' if x == 'Fraudulent' else 'green')
plt.scatter(df['transaction_id'], df['amount'], c=colors, s=100)
plt.title('Transaction Amounts with Fraud Detection')
plt.xlabel('Transaction ID')
plt.ylabel('Transaction Amount')
plt.show()

