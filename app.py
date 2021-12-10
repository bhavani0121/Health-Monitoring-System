from flask import Flask, redirect,url_for,render_template, request
import firebase_admin
from firebase_admin import credentials,db,auth
from firebase import firebase
import pickle
import sklearn
import random
import pandas as pd
import timeseries,timeseries_spo2
import time
from datetime import datetime
# from pandas import datetime
# pyryptodome




with open('model/classifier.pkl', 'rb') as file:  
    model = pickle.load(file)

cred = credentials.Certificate('firebase-sdk.json')

firebase_admin.initialize_app(cred,{
    'databaseURL': "https://health-care-7c36c-default-rtdb.firebaseio.com/"
})

firebase = firebase.FirebaseApplication("https://health-care-7c36c-default-rtdb.firebaseio.com/",None)

app = Flask(__name__)



@app.route('/')
def initial():
    return render_template('login.html')
    # print('OK')
    # return render_template('index.html')

@app.route('/login',methods=['POST','GET'])
def login():
    if request.method=='POST':
        email = request.form['id']
        psswd = request.form['psswd']
        
        
        user=auth.get_user_by_email(email)
        if(psswd!=user.uid):
            return render_template('login.html')

        user_id = user.uid
        print(user_id)

        return redirect(url_for('home',userID=user_id))
    

@app.route('/register',methods=['POST','GET'])
def reg():
    if request.method=='POST':
        name = request.form['name']
        age = request.form['age']
        gender = request.form['gender']
        height = request.form['height']
        weight = request.form['weight']
        email = request.form['id']
        psswd = request.form['psswd']
        mobile = request.form['mobile']

        data = {
            'name': name,
            'age' : age,
            'gender' : gender,
            'height' : height,
            'weight' : weight,
            'mobile' : mobile,
            'user-id' : mobile
        }

        # if (!(user = auth.get_user_by_email(email))):
        #     return render_template('login.html')

        user = auth.create_user(uid=mobile,email=email,password=psswd)
        # print('user created {}'.format(user.uid))

        
        result = firebase.post('/'+mobile+'/Details',data)

        

    return render_template('login.html')
    
@app.route('/logout',methods=['POST','GET'])
def logout():
    return redirect(url_for('initial'))
    

@app.route('/home/<userID>')
def home(userID): #take id as argument

    ref = db.reference('/'+userID+'/Sensor_data')
    d = ref.order_by_key().limit_to_last(1).get()
    if(bool(d)):
        for key, val in d.items():
            temp = val['temp']
            hr = val['hr']
            SpO2 = val['spo2']
            ax = val['ax']
            ay = val['ay']
            az = val['az']
    else:
        temp=0;hr=0;SpO2=0;ax=0;ay=0;az=0

    ref = db.reference('/'+userID+'/Details')
    d = ref.order_by_key().limit_to_last(1).get()
    for key, val in d.items():
        name = val['name']
        # age = val['age']
        gender_str = val['gender']
        height = int(val['height'])
        weigth = int(val['weight'])
        mobile = val['mobile']
        age = int(val['age'])

    EDA=0.26 #fixed
    bmi=(weigth/height)*100
    if(gender_str=='M'):
        gender=0
    else:
        gender=1

    input_val = pd.DataFrame([[ax,ay,az,EDA,SpO2,hr,age,gender,height,weigth,bmi]], columns = ['ax','ay','az','EDA','SpO2','hr','age','gender','height','weigth','bmi'])
    
    prediction = model.predict(input_val)[0]
    result=''
    if prediction==1:
        result='PHYSICAL STRESS'
    elif prediction==2:
        result='COGNITIVE STRESS'
    elif prediction==3:
        result='EMOTIONAL STRESS'
    else:
        result='REST'
    # prediction=40

    ref = db.reference('/'+userID+'/Sensor_data')
    d = ref.order_by_key().get()
    Data = []
    if(bool(d)):
        for key, val in d.items():
            data = []
            # print(type(val['timestamp']))
            strng = val['timestamp']
            ts = datetime.strptime(strng,"%Y-%m-%dT%H:%M:%S.%f")
            data.append(ts)
            data.append(int(val['hr']))
            data.append(int(val['spo2']))
            Data.append(data)

    # print(Data) # [[5, 6, 7], [5, 6, 7]]
    df = pd.DataFrame(Data, columns = ['Time and date', 'PULSE','SpO2'])
    predicted_hr,ts_list = timeseries.main(df)
    predicted_spo2,ts_list = timeseries_spo2.main(df)
    # print(predicted_hr)
    print(ts_list)

    return render_template('index.html', \
        ftemp=str(temp),fhr=str(hr),fspo2=str(SpO2),pred = result, \
        fname=name,fmobile=mobile, fgender=gender_str, fage=str(age), \
        fheight=str(height),fweight=str(weigth),fbmi=int(bmi), \
        labels=ts_list, values_hr=predicted_hr, values_spo2=predicted_spo2)
    # return render_template('login.html')





if __name__=='__main__':
    app.run()


# https://colab.research.google.com/drive/1U7d4ThVROzuEIXd433FuN0tPnfpq0xvH#scrollTo=K8b_fqVZA6f-

# https://console.firebase.google.com/u/1/project/health-care-7c36c/database/health-care-7c36c-default-rtdb/data

# https://blog.cambridgespark.com/deploying-a-machine-learning-model-to-the-web-725688b851c7

# https://levelup.gitconnected.com/deploy-a-predictive-model-with-flask-33c1976293cc

# sweet.viz

# p
