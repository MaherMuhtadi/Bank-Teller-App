# Bank-Teller-App

A CRM for bank employees to manage clients and accounts, conduct transactions, and detect fraud with machine learning support.

## Table of Contents

- [Bank-Teller-App](#bank-teller-app)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Design](#design)
    - [Relational Database](#relational-database)
  - [Features](#features)
    - [Fraud Detection Model](#fraud-detection-model)
      - [Key features](#key-features)
      - [Data Description](#data-description)
      - [How It Works](#how-it-works)
      - [Code Explanation](#code-explanation)
      - [Expected Output](#expected-output)
  - [Installation](#installation)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Fraud Detection Model](#fraud-detection-model-1)

## Tech Stack

-   **Backend:**
    -   Django (Server)
    -   SQLite (Database)
    -   Postman (API Testing)
-   **Machine Learning Model:**
    -   Scikit Learn
    -   Pandas
    -   NumPy
    -   Matplotlib
-   **Frontend:**
    -   ReactJS (Client)
    -   Tailwind (Styling)
    -   React Router (Component Navigation)
    -   Chart.js (Data Visualizations)

## Design

### Relational Database

![Image](https://github.com/user-attachments/assets/74011f43-2e56-4c78-a56c-eb3eb3aa70cb)

## Features

### Fraud Detection Model

This model uses python to detect fraudulent transactions in the dataset. Using **Isolation Forest** from the `sklearn` library. It mainly identifies outliers in the various data topics and flags unusual transaction behaviors.

#### Key features

- **Isolation Forest for Fraud Detection:** Detects anomalies in transactions based on multiple features.
- **Categorical Encoding:** Handles categorical data (transaction location) by encoding it for model compatibility.
- **Dynamic Feature Selection:** Automatically adjusts feature selection based on data columns.
- **Visualization:** Visualizes fraudulent vs. legitimate transactions in a scatter plot.

#### Data Description

The script uses a sample dataset (for demonstration purposes) with the following fields:

- **transaction_id**: Unique identifier for each transaction.
- **amount**: Transaction amount.
- **transaction_time**: Time of transaction (0-23 hours).
- **transaction_location**: Location of the transaction ('local' or 'foreign').
- **account_balance**: Account balance at the time of the transaction.

#### How It Works

1. **Generate Sample Data**: A synthetic dataset is created with transaction details, including some outliers to simulate fraud.
2. **Encoding Categorical Features**: Converts the categorical 'transaction_location' field into binary features.
3. **Isolation Forest Model**: An **Isolation Forest** model is trained on the data to detect anomalies.
4. **Prediction and Labeling**: Each transaction is classified as either "Fraudulent" or "Legitimate" based on the model's prediction.
5. **Visualization**: The results are plotted, where fraudulent transactions are highlighted in red and legitimate ones in green.

#### Code Explanation

- **Data Simulation**: Generates a synthetic dataset with normal transaction patterns and outliers.
- **Feature Encoding**: Uses `pd.get_dummies()` to encode the `transaction_location` field.
- **Dynamic Feature Selection**: Dynamically selects features based on available columns.
- **Isolation Forest Model**: The `IsolationForest` algorithm is applied to identify potential fraudulent transactions.
- **Visualization**: A scatter plot shows transaction amounts, with fraudulent transactions in red and legitimate ones in green.

#### Expected Output

- **Fraud Detection Results Table**: Lists each transaction with its `transaction_id`, `amount`, `transaction_time`, `transaction_location`, and `is_fraud` status.
- **Scatter Plot**: A scatter plot with each transaction amount. Fraudulent transactions are marked in red, and legitimate transactions are marked in green.

## Installation

### Frontend

**Prerequisites:**

Check if Node.js and npm are installed.

```bash
node -v
npm -v
```

**Installation:**

To install and run the frontend of the app for development, go to the _client_ directory, install the dependencies and then start the development server on your local device.

```bash
cd client
npm install
npm run dev
```

**Credentials:**

The dummy Employee/Teller profile credentials for testing, as saved in `server/BankTellerProject/db.sqlite3`:

- Employee ID: *787713*
- Password: *admin*

Alternatively, you can create a new Teller profile by navigating to the `/admin/create_teller` route. This is temporarily in place for testing purposes.

The dummy Client profile credentials for testing, as saved in `server/BankTellerProject/db.sqlite3`:

- Client ID: *9712826163*
- Password: *client*

**Deployment:**

Use `npm run build` to build the finished project for production.

### Backend

**Prerequisites:**

Ensure you have the following installed:

- [Python](https://www.python.org/downloads/) (Version 3.x)
- [Anaconda](https://www.anaconda.com/products/distribution) or [Miniconda](https://docs.conda.io/en/latest/miniconda.html)
- [pip](https://pip.pypa.io/en/stable/installation/)
- Additional project-specific requirements (specified in `requirements.txt`)

**Setting Up and Running the Backend:**

1. **Create a New Conda Environment**:  
   Create a new isolated environment named `test_env` with Python and the Anaconda distribution installed:

   ```bash
   conda create -n test_env python anaconda
   ```

2. **Activate the Environment**:  
   Switch to the newly created environment:

   ```bash
   conda activate test_env
   ```

3. **Install Dependencies**:  
   Navigate to the backend project directory and install the required dependencies:

   ```bash
   cd server
   pip install -r requirements.txt
   ```

4. **Run the Development Server**:  
   Start the Django server to launch the backend:

   ```bash
   cd 'BankTellerProject'
   python manage.py runserver
   ```

5. **Access the Server**:  
   Open a browser and navigate to the URL provided in the terminal output (typically `http://127.0.0.1:8000/`).
   
   Next, go to the `/admin` route to view all entries stored in the database.
   
   Credentials:
   - Username: *admin*
   - Password: *admin*

### Fraud Detection Model

**Prerequisites:**

Check if all the necessary libraries are installed.

```bash
pip show pandas numpy scikit-learn matplotlib
```

**Installation:**

You can install these libraries using pip:

```bash
pip install pandas numpy scikit-learn matplotlib
```

Run the script `Fraud Detection Model.py` in a Python environment to see the fraud detection results printed to the console.

View the scatter plot to visually assess the detected fraudulent transactions.
