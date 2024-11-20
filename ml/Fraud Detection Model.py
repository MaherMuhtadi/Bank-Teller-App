#!/usr/bin/env python
#coding: utf-8
#Libraries
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest

def detect_fraud(transaction_data):
    # Features to train on
    features = ['amount', 'transaction_time', 'account_balance']
    
    if not all(feature in transaction_data.columns for feature in features):
        raise ValueError(f"Transaction data must contain {features} columns")
    
    # Train a new IsolationForest model
    model = IsolationForest(n_estimators=100, random_state=42)
    model.fit(transaction_data[features])
    
    # Predict fraud
    transaction_data['fraud'] = model.predict(transaction_data[features])
    transaction_data['fraud'] = transaction_data['fraud'].apply(lambda x: 1 if x == -1 else 0)  # -1 indicates fraud
    
    return transaction_data
