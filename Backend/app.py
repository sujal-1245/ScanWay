from flask import Flask, request, jsonify
from flask_cors import CORS
import matplotlib
matplotlib.use('Agg')  # Use non-GUI backend suitable for servers

import matplotlib.pyplot as plt
import pandas as pd
import io
import base64
import joblib
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from preprocess import preprocess_input  # Import your actual preprocessing function

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load pre-trained models
models = {
    "catboost": joblib.load("models/catboost_model.pkl"),
    "random_forest": joblib.load("models/random_forest_model.pkl"),
    "xgboost": joblib.load("models/xgboost_model.pkl"),
    "gradient_boosting": joblib.load("models/gradient_boosting_model.pkl"),
    "decision_tree": joblib.load("models/decision_tree_model.pkl"),
    "linear_regression": joblib.load("models/linear_regression_model.pkl"),
    "svr": joblib.load("models/svr_model.pkl")
}

# Generate base64 chart image
import matplotlib.pyplot as plt
import matplotlib.ticker as mtick
import numpy as np
import io
import base64

# Use clean modern style
plt.style.use('seaborn-v0_8-whitegrid')

def generate_chart(predictions):
    filtered_predictions = {k: v for k, v in predictions.items() if v is not None}
    if not filtered_predictions:
        return None

    model_names = list(filtered_predictions.keys())
    values = list(filtered_predictions.values())

    fig, ax = plt.subplots(figsize=(10, 6))

    # Use smooth gradient color map (viridis looks slick and modern)
    colors = plt.cm.viridis(np.linspace(0.3, 0.9, len(values)))

    bars = ax.bar(model_names, values, color=colors, linewidth=0)

    # Smooth rounded top bars (by redrawing)
    for bar in bars:
        bar.set_linewidth(0)
        bar.set_alpha(0.9)
        bar.set_zorder(3)

    # Background & grid
    ax.set_facecolor('#f9f9f9')
    ax.grid(axis='y', linestyle='--', alpha=0.4, zorder=0)

    # Titles and labels
    ax.set_title("Model Comparison: PCI Prediction", fontsize=18, fontweight='bold', pad=20)
    ax.set_ylabel("Predicted PCI (%)", fontsize=14, labelpad=10)
    ax.set_ylim(0, 100)
    ax.yaxis.set_major_formatter(mtick.PercentFormatter())

    ax.set_xticks(range(len(model_names)))
    ax.set_xticklabels(model_names, rotation=30, ha="right", fontsize=12)
    ax.tick_params(axis='y', labelsize=12)

    # Annotate bars with values
    for bar in bars:
        height = bar.get_height()
        ax.annotate(f"{height:.1f}%",
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 6),
                    textcoords="offset points",
                    ha='center', va='bottom',
                    fontsize=10, fontweight='bold', color='#333')

    # Layout and save
    plt.tight_layout()
    buf = io.BytesIO()
    plt.savefig(buf, format="png", bbox_inches='tight', dpi=150)
    plt.close(fig)
    buf.seek(0)
    return base64.b64encode(buf.read()).decode("utf-8")

@app.route('/api/error-chart')
def error_chart():
    # Load models
    models = {
        "CatBoost": joblib.load("models/catboost_model.pkl"),
        "Random Forest": joblib.load("models/random_forest_model.pkl"),
        "XGBoost": joblib.load("models/xgboost_model.pkl"),
        "Gradient Boosting": joblib.load("models/gradient_boosting_model.pkl"),
        "Decision Tree": joblib.load("models/decision_tree_model.pkl"),
        "Linear Regression": joblib.load("models/linear_regression_model.pkl"),
        "SVR": joblib.load("models/svr_model.pkl")
    }

    # Load test data (already preprocessed)
    X_test_scaled = joblib.load("models/X_test_scaled.pkl")
    y_test = joblib.load("models/y_test.pkl")

    # Calculate metrics
    mae_scores = []
    mse_scores = []
    model_names = []

    for name, model in models.items():
        y_pred = model.predict(X_test_scaled)
        model_names.append(name)
        mae_scores.append(mean_absolute_error(y_test, y_pred))
        mse_scores.append(mean_squared_error(y_test, y_pred))

    # Plotting
    plt.style.use('seaborn-v0_8-darkgrid')
    fig, ax = plt.subplots(figsize=(10, 6))

    ax.plot(model_names, mae_scores, marker='o', label='MAE', linewidth=2.5)
    ax.plot(model_names, mse_scores, marker='s', label='MSE', linewidth=2.5)

    ax.set_title("Model Error Comparison", fontsize=18, fontweight='bold', pad=20)
    ax.set_ylabel("Error", fontsize=14)
    ax.set_xlabel("Model", fontsize=14)
    ax.tick_params(axis='x', rotation=30)
    ax.legend()
    ax.grid(True, linestyle='--', alpha=0.6)

    plt.tight_layout()

    # Convert to base64
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', dpi=150)
    plt.close(fig)
    buf.seek(0)
    chart_base64 = base64.b64encode(buf.read()).decode('utf-8')

    return jsonify({'chart': chart_base64})


@app.route("/api/v1/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # Extract selected model name and remove it from input data
    selected_model_key = data.pop("model", "catboost").lower()

    # Preprocess input
    try:
        processed_input = preprocess_input(data)
    except Exception as e:
        return jsonify({"error": f"Preprocessing failed: {str(e)}"}), 400

    # Predict using all models
    predictions = {}
    for key, model in models.items():
        try:
            prediction = model.predict(processed_input)[0]
            predictions[key.replace("_", " ").title()] = round(float(prediction), 2)
        except Exception as e:
            predictions[key.replace("_", " ").title()] = None

    chart_image = generate_chart(predictions)

    return jsonify({
        "predictions": predictions,
        "image_base64": chart_image
    })

if __name__ == "__main__":
    app.run(debug=True)
