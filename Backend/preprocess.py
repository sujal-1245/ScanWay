import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer  # For imputing missing values
from catboost import CatBoostRegressor
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.linear_model import LinearRegression
from sklearn.svm import SVR
import pickle
import xgboost as xgb

# Load the dataset
df = pd.read_csv('pci_data_50.csv')

# Preprocess the data
# Handle categorical columns (e.g., Severity_Rating, Maintenance_History)
df['Severity_Rating'] = df['Severity_Rating'].map({'Low': 0, 'Medium': 1, 'High': 2})
df['Maintenance_History'] = df['Maintenance_History'].map({'None': 0, 'Minor repairs': 1, 'Major repairs': 2})

# Define the feature columns and target column
X = df.drop(['PCI (%)'], axis=1)
y = df['PCI (%)']



# Initialize the SimpleImputer to handle missing values
imputer = SimpleImputer(strategy='median')  # Fill missing values with the median of each column

# Apply the imputer to the feature data
X_imputed = imputer.fit_transform(X)  # This replaces NaNs with the median value

# Split the data into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X_imputed, y, test_size=0.2, random_state=42)

# Initialize StandardScaler for feature scaling
scaler = StandardScaler()

# Fit and transform the training data and transform the test data
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Initialize models
catboost_model = CatBoostRegressor(iterations=1000, depth=6, learning_rate=0.1, loss_function='RMSE', cat_features=[])
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
xgboost_model = xgb.XGBRegressor(n_estimators=1000, learning_rate=0.1, max_depth=6)
gradient_boosting_model = GradientBoostingRegressor(n_estimators=1000, learning_rate=0.1, max_depth=6)
decision_tree_model = DecisionTreeRegressor(random_state=42)
linear_regression_model = LinearRegression()
svr_model = SVR()

# Train CatBoost model
catboost_model.fit(X_train_scaled, y_train)

# Train RandomForest model
rf_model.fit(X_train_scaled, y_train)

# Train XGBoost model
xgboost_model.fit(X_train_scaled, y_train)

# Train GradientBoosting model
gradient_boosting_model.fit(X_train_scaled, y_train)

# Train DecisionTree model
decision_tree_model.fit(X_train_scaled, y_train)

# Train LinearRegression model
linear_regression_model.fit(X_train_scaled, y_train)

# Train SVR model
svr_model.fit(X_train_scaled, y_train)

from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

# Helper function to print evaluation metrics
def print_metrics(name, model, X_test, y_test):
    predictions = model.predict(X_test)
    r2 = r2_score(y_test, predictions)
    mae = mean_absolute_error(y_test, predictions)
    mse = mean_squared_error(y_test, predictions)
    rmse = np.sqrt(mse)

    print(f"{name} Model Evaluation:")
    print(f"  R² Score: {r2:.4f}")
    print(f"  MAE     : {mae:.4f}")
    print(f"  MSE     : {mse:.4f}")
    print(f"  RMSE    : {rmse:.4f}")
    print("-" * 40)

# Evaluate and print metrics for all models
print_metrics("CatBoost", catboost_model, X_test_scaled, y_test)
print_metrics("RandomForest", rf_model, X_test_scaled, y_test)
print_metrics("XGBoost", xgboost_model, X_test_scaled, y_test)
print_metrics("GradientBoosting", gradient_boosting_model, X_test_scaled, y_test)
print_metrics("DecisionTree", decision_tree_model, X_test_scaled, y_test)
print_metrics("LinearRegression", linear_regression_model, X_test_scaled, y_test)
print_metrics("SVR", svr_model, X_test_scaled, y_test)

# Save the models, scaler, and imputer
with open('models/catboost_model.pkl', 'wb') as f:
    pickle.dump(catboost_model, f)

with open('models/random_forest_model.pkl', 'wb') as f:
    pickle.dump(rf_model, f)

with open('models/xgboost_model.pkl', 'wb') as f:
    pickle.dump(xgboost_model, f)

with open('models/gradient_boosting_model.pkl', 'wb') as f:
    pickle.dump(gradient_boosting_model, f)

with open('models/decision_tree_model.pkl', 'wb') as f:
    pickle.dump(decision_tree_model, f)

with open('models/linear_regression_model.pkl', 'wb') as f:
    pickle.dump(linear_regression_model, f)

with open('models/svr_model.pkl', 'wb') as f:
    pickle.dump(svr_model, f)

with open('models/scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

# Save the imputer as well, in case we need to handle missing values during prediction
with open('models/imputer.pkl', 'wb') as f:
    pickle.dump(imputer, f)

with open("models/X_test_scaled.pkl", 'wb') as f:
    pickle.dump(X_test_scaled, f)

with open("models/y_test.pkl", 'wb') as f:
    pickle.dump(y_test, f)


# Assuming this is your preprocessing logic
def preprocess_input(data):
    # Convert the input data to a pandas DataFrame
    df = pd.DataFrame([data])
    
    # Handle categorical columns (example: Severity_Rating and Maintenance_History)
    df['Severity_Rating'] = df['Severity_Rating'].map({'Low': 0, 'Medium': 1, 'High': 2})
    df['Maintenance_History'] = df['Maintenance_History'].map({'None': 0, 'Minor repairs': 1, 'Major repairs': 2})
    
    # Initialize the SimpleImputer to handle missing values
    imputer = SimpleImputer(strategy='median')  # Replace NaNs with the median of each column
    df_imputed = imputer.fit_transform(df)  # Apply imputer
    
    # Initialize the StandardScaler for scaling features
    scaler = StandardScaler()
    df_scaled = scaler.fit_transform(df_imputed)  # Apply scaling
    
    return df_scaled

print("Models, scaler, and imputer have been saved!")
