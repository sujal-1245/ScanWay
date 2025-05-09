import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from catboost import CatBoostRegressor
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.linear_model import LinearRegression
from sklearn.svm import SVR
import pickle
import xgboost as xgb
import os

# Load dataset
df = pd.read_csv('pci_data_50.csv')

# Encode categorical features
df['Severity_Rating'] = df['Severity_Rating'].map({'Low': 0, 'Medium': 1, 'High': 2})
df['Maintenance_History'] = df['Maintenance_History'].map({'None': 0, 'Minor repairs': 1, 'Major repairs': 2})

# Define target and features
X = df.drop(['PCI (%)'], axis=1)
y = df['PCI (%)']


# Impute missing values
imputer = SimpleImputer(strategy='median')
X_imputed = imputer.fit_transform(X)

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_imputed)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Initialize models
models = [
    (CatBoostRegressor(iterations=1000, depth=6, learning_rate=0.1, loss_function='RMSE', verbose=False), "catboost_model.pkl"),
    (RandomForestRegressor(n_estimators=100, random_state=42), "random_forest_model.pkl"),
    (xgb.XGBRegressor(n_estimators=1000, learning_rate=0.1, max_depth=6), "xgboost_model.pkl"),
    (GradientBoostingRegressor(n_estimators=1000, learning_rate=0.1, max_depth=6), "gradient_boosting_model.pkl"),
    (DecisionTreeRegressor(random_state=42), "decision_tree_model.pkl"),
    (LinearRegression(), "linear_regression_model.pkl"),
    (SVR(), "svr_model.pkl")
]

os.makedirs("models", exist_ok=True)

# Train models and save them
for model, filename in models:
    model.fit(X_train, y_train)
    print(f"{filename.split('_')[0].capitalize()} R²: {model.score(X_test, y_test):.4f}")
    with open(f'models/{filename}', 'wb') as f:
        pickle.dump(model, f)

# Save preprocessing tools
with open('models/scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

with open('models/imputer.pkl', 'wb') as f:
    pickle.dump(imputer, f)

print("Training complete. Models and preprocessing tools saved.")
