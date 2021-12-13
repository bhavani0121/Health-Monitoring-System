import numpy as np
from tensorflow.keras.models import model_from_json
from sklearn.preprocessing import MinMaxScaler
from dateutil.relativedelta import relativedelta

sc = MinMaxScaler(feature_range = (0, 1))

def call_model():
    # load json and create model
    json_file = open('model/model_hr.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    # load weights into new model
    loaded_model.load_weights("model/model_hr.h5")
    print("Loaded model from disk")
    return loaded_model

def do_work(data1):
    
    temps = data1[["Time and date", "PULSE"]]
    # print(temps)
    temps.index = temps['Time and date']
    temps = temps.drop(columns='Time and date')
    data = temps
    # print(data)
    # upsampled = temps.resample('10S').mean()
    # interpolated = upsampled.interpolate(method='linear')
    # data = interpolated
    # print(data)

    training_set = data.iloc[:, [0]].values
    # print(training_set)
    endval = int(data.shape[0]*0.8)
    # print(endval)
    # print(int(data.shape[0]))
    training_set_scaled = sc.fit_transform(training_set)
    X_test = []
    y_test  = []
    for i in range(endval, int(data.shape[0])):
        X_test.append(training_set_scaled[i-60:i, 0])
        y_test.append(training_set_scaled[i,0])
    X_test = np.array(X_test)
    #print(X_test[0])
    # print("lenth = ", len(X_test[0]))
    X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))
    # print(len(X_test),len(y_test))
    return X_test, y_test



def main(data):
    val_t,yt = do_work(data)

    regr = call_model()
    regr.predict(val_t)

    predicted_data = regr.predict(val_t)
    predicted_data = sc.inverse_transform(predicted_data)
    pred_data = []
    for i in predicted_data:
        pred_data.append(i[0])

    data1 = data['Time and date']
    date = data1.iloc[data1.index[-1]]
    ts_list = []
    for i in range(len(predicted_data)):
        date += relativedelta(seconds=60)
        ts_list.append(str(date))


    return pred_data,ts_list




