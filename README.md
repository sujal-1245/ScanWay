# 🚧 ScanWay – Road Pavement Condition Predictor

**ScanWay** is a web application designed to predict the Pavement Condition Index (PCI %) using machine learning models. It features a lightweight React frontend and a Flask backend with a custom preprocessing pipeline. Built for simplicity and accuracy, it allows users to input key road metrics and get real-time PCI predictions.

---

![image](https://github.com/user-attachments/assets/60787b8a-1701-4c7f-9fd5-334d2b3b3ca3)


---
## 🧠 Features

* 🔢 **Form-Based PCI Prediction** – Input values like cracking, patching, potholes, etc.
* ⚙️ **ML-Powered Backend** – Flask server with trained regression models.
* 🔄 **Preprocessing Step** – Transforms raw input into clean features before prediction.
* 💻 **React Frontend** – Fast, responsive UI built with Vite.
* 📊 **Real-Time Output** – Instant prediction with no page reloads.

---

## 🛠️ Tech Stack

* **Frontend**: React, Vite, JavaScript
* **Backend**: Flask (Python)
* **ML & Data Processing**: Scikit-learn, Pandas
* **Others**: npm, pip, Axios

---

## 🚀 Getting Started

### 🔧 Prerequisites

* Python 3.7+
* Node.js and npm

---

### ⚙️ Run the Backend (Flask + ML)

```bash
cd Backend
python preprocess.py     # One-time preprocessing and model prep
python app.py            # Launch the Flask API server
```

This starts the backend server at `http://localhost:5000/`.

---

### 🌐 Run the Frontend (React + Vite)

In a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:3000/`.

---

## 📸 Screenshots

### 🔹 Input Form UI

![image](https://github.com/user-attachments/assets/717f7f4c-9dbf-4585-9ae3-3fb66d4dd8f4)


### 🔹 PCI Prediction Result

![image](https://github.com/user-attachments/assets/00e0424b-eb7c-4f00-a03d-c0ef51919bde)

![image](https://github.com/user-attachments/assets/5332c8a7-b7d5-4823-abb7-4af6ef996403)


### 🔹 Error Comparison and R^2 Score Chart 

![image](https://github.com/user-attachments/assets/07008408-228b-423a-b30f-2d3703826e24)


---

## 📂 Project Structure

```
ScanWay/
├── Backend/
│   ├── app.py                # Flask server
│   ├── preprocess.py         # Prepares data, trains model
│   ├── model.pkl             # Saved ML model
│   └── requirements.txt
├── Frontend/
│   ├── src/
│   ├── assets/
│   │   └── screenshots/
│   ├── public/
│   └── package.json
└── README.md
```

---

## 👥 Contributors

* [@sujal-1245](https://github.com/sujal-1245) (Sujal Bhagat)
* [@ArbaazShaikh07](https://github.com/ArbaazShaikh07) (Arbaaz Shaikh)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

