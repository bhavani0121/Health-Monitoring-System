import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
from pandas import datetime
from tensorflow.keras.models import model_from_json
from sklearn.preprocessing import MinMaxScaler

def call_model():
    # load json and create model
    json_file = open('model/model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    # load weights into new model
    loaded_model.load_weights("model/model_hr.h5")
    print("Loaded model from disk")
    return loaded_model

def do_work(name):
    temps = data1[["Time and date", name]]
    temps.index = temps['Time and date']
    temps = temps.drop(columns='Time and date')
    data = temps
    upsampled = temps.resample('10S').mean()
    interpolated = upsampled.interpolate(method='linear')
    data = interpolated
    training_set = data.iloc[:, [0]].values
    endval = int(data.shape[0]*0.8)
    print(endval)
    print(int(data.shape[0]))
    training_set_scaled = sc.fit_transform(training_set)
    X_test = []
    y_test  = []
    for i in range(endval, int(data.shape[0])):
        X_test.append(training_set_scaled[i-60:i, 0])
        y_test.append(training_set_scaled[i,0])
    X_test = np.array(X_test)
    #print(X_test[0])
    print("lenth = ", len(X_test[0]))
    X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))
    print(len(X_test),len(y_test))
    return X_test, y_test


def parser(t):
    return datetime.strptime(t,"\'[%H:%M:%S %d/%m/%Y]\'")


sc = MinMaxScaler(feature_range = (0, 1))

df = pd.read_csv("model/samples.csv",header=0,index_col=0,parse_dates=['Time and date'] , date_parser = parser,squeeze=True) 
for i in range(1,len(df)):
  if df[i]==0:
    df[i]=df[i-1]

data1 = df.reset_index()

val_t,yt = do_work('PULSE')

regr = call_model()
regr.predict(val_t)

predicted_data = regr.predict(val_t)
predicted_data = sc.inverse_transform(predicted_data)




# import firebase_admin
# from firebase_admin import credentials,db

# cred = credentials.Certificate('firebase-sdk.json')

# firebase_admin.initialize_app(cred,{
#     'databaseURL': "https://health-care-7c36c-default-rtdb.firebaseio.com/"
# })

# ref = db.reference('/Person-1/Sensor_data')
# d = ref.order_by_key().limit_to_last(1).get()
# print(d)
# for key, val in d.items():
#     print('The {0} dinosaur\'s score is {1}'.format(key, val))

#     s1 = val['sensor-1']
#     s2 = val['sensor-2']
#     s3 = val['sensor-3']

# print(s1)
# print(s2)
# print(s3)
