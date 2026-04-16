import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import IsolationForest

# --- STEP 1: Simulate "Normal" Network Traffic ---
# Imagine 100 packets with small sizes and low frequency (Normal behavior)
normal_traffic = np.random.normal(loc=100, scale=20, size=(100, 2)) 

# --- STEP 2: Simulate an "Attack" ---
# Imagine 10 packets with huge sizes or very high frequency (The Anomaly)
attack_traffic = np.random.uniform(low=200, high=300, size=(10, 2))

# Combine them into one dataset
X = np.vstack([normal_traffic, attack_traffic])
df = pd.DataFrame(X, columns=['Packet_Size', 'Frequency'])

# --- STEP 3: The AI Engine (Isolation Forest) ---
# This is where Nova "learns" the pattern
model = IsolationForest(contamination=0.1, random_state=42)
model.fit(df)

# Predict: 1 = Normal, -1 = Anomaly (Attack)
df['Result'] = model.predict(df[['Packet_Size', 'Frequency']])

# --- STEP 4: Visualize for the Team ---
plt.figure(figsize=(10, 6))
colors = {1: 'blue', -1: 'red'}
plt.scatter(df['Packet_Size'], df['Frequency'], 
            c=df['Result'].map(colors), label='Blue=Normal, Red=Attack')

plt.title("Nova AI: Anomaly Detection Proof of Concept")
plt.xlabel("Packet Size (KB)")
plt.ylabel("Request Frequency (per sec)")
plt.legend()
plt.show()

print("Nova Intelligence Report:")
print(f"Total packets analyzed: {len(df)}")
print(f"Potential threats detected: {len(df[df['Result'] == -1])}")