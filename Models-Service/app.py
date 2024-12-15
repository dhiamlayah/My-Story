from flask import Flask
from predict import predict
import py_eureka_client.eureka_client as eureka_client
from flask_cors import CORS  

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

EUREKA_SERVER_URL = "http://localhost:8761/eureka"
PREDICTION_SERVER_PORT = 5000  
PREDICTION_SERVER_NAME = "prediction-service"

# # Register the service to Eureka
eureka_client.init(
    eureka_server=EUREKA_SERVER_URL,
    app_name=PREDICTION_SERVER_NAME,
    instance_port=PREDICTION_SERVER_PORT
)

# Register the prediction blueprint
app.register_blueprint(predict)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PREDICTION_SERVER_PORT)
