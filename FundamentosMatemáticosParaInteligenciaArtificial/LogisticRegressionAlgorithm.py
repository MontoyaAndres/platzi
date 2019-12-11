from sklearn.linear_model import LogisticRegression
import numpy as np

x = np.array([0.5, 0.75, 1, 1.25, 1.5, 1.75, 1.75, 2, 2.25, 2.5,
              2.75, 3, 3.25, 3.5, 4, 4.25, 4.5, 4.75, 5, 5.5]).reshape(-1, 1)

y = np.array([0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1])


logistic_regression = LogisticRegression()

# Training the data

logistic_regression.fit(x, y)

# new results to test

x_new = np.array([1, 2, 3, 4, 5, 6]).reshape(-1, 1)

prediction = logistic_regression.predict(x_new)
print("prediction:\n", prediction)

prediction_probabilities = logistic_regression.predict_proba(x_new)
print("prediction_probabilities:\n", prediction_probabilities)
print(prediction_probabilities[:, 1])
