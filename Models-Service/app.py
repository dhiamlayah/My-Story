from flask import Flask
from predict import predict
import py_eureka_client.eureka_client as eureka_client

app = Flask(__name__)

EUREKA_SERVER_URL = "http://localhost:8761/eureka"
SCHOOL_SERVER_PORT = 5000  
PREDICTION_SERVER_NAME = "prediction-service"

# # Register the service to Eureka
eureka_client.init(
    eureka_server=EUREKA_SERVER_URL,
    app_name=PREDICTION_SERVER_NAME,
    instance_port=SCHOOL_SERVER_PORT
)

# Register the prediction blueprint
app.register_blueprint(predict)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=SCHOOL_SERVER_PORT)
