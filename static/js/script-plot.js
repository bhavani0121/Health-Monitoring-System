const config = {
    
    
    apiKey: "AIzaSyD-mfkVcrmzst_UOx2ixNBNJAn5XQEl50M",
    authDomain: "health-care-7c36c.firebaseapp.com",
    databaseURL: "https://health-care-7c36c-default-rtdb.firebaseio.com/",
    projectId: "health-care-7c36c",
    storageBucket: "health-care-7c36c.appspot.com",
    messagingSenderId: "103348142996",
    appId: "1:103348142996:web:13149dd852f7c5fd73c581",
    measurementId: "G-VHPD0FSFMV"
  };

firebase.initializeApp(config);



// Number of last elements to work with, in the 'timestamped_measures' node of the database: 
const nbOfElts = 200;
// user_ID = document.getElementById('');
console.log(userID);


firebase.database().ref('/'+userID+'/Sensor_data/').orderByKey().limitToLast(nbOfElts).on('value', ts_measures => {

    let timestamps = [];
    let values_hr = [];
    let values_spo2 = [];
        
    ts_measures.forEach(ts_measure => {
        //console.log(ts_measure.val().timestamp, ts_measure.val().value);
        // timestamps.push(moment(ts_measure.val().timestamp).format('YYYY-MM-DD HH:mm:ss'));
        timestamps.push(ts_measure.val().timestamp);
        values_hr.push(ts_measure.val().hr);
        values_spo2.push(ts_measure.val().spo2);
    });

    myPlotDiv_hr = document.getElementById('myPlot_hr');
    myPlotDiv_spo2 = document.getElementById('myPlot_spo2');

    const data_hr = {
        x: timestamps,
        y: values_hr,
        name: 'Heart Rate'
    };
    const data_pred_hr = {
        x: pred_ts,
        y: pred_hr,
        name: 'Heart Rate'
    };
    const data_spo2 = {
        x: timestamps,
        y: values_spo2,
        name: 'SpO2'
    };
    const data_pred_spo2 = {
        x: pred_ts,
        y: pred_spo2,
        name: 'SpO2'
    };

    const layout_hr = {
        title: ' Heart Rate ',
        showlegend: false,
        titlefont: {
            
            family: 'Comic Sans MS, monospace',
            size: 25,
            color: '#000'
        },
        xaxis: {
            linecolor: 'black',
            linewidth: 2
        },
        yaxis: {
            title: '<b>Pulse</b>',
            titlefont: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#000'
            },
            linecolor: 'black',
            linewidth: 0.5,
        },
        height:500,
        margin: {
            r: 0,
            pad: 0
        },
        
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)'

    };

    const layout_spo2 = {
        title: ' SpO2 ',
        showlegend: false,
        titlefont: {
            family: 'Comic Sans MS, monospace',
            size: 25,
            color: '#000'
        },
        xaxis: {
            linecolor: 'black',
            linewidth: 2
        },
        yaxis: {
            title: '<b>SpO2</b>',
            titlefont: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#000'
            },
            linecolor: 'black',
            linewidth: 0.5,
        },
        // autosize:false,
        // width:750,
        height:500,
        margin: {
            r:0,
            pad: 0
        },
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)'
    };
    // At last we plot data :-)
    var data_hr_final = [data_hr, data_pred_hr];
    var data_spo2_final = [data_spo2, data_pred_spo2];
    Plotly.newPlot(myPlotDiv_hr, data_hr_final, layout_hr, { responsive: true ,displayModeBar:false});
    Plotly.newPlot(myPlotDiv_spo2, data_spo2_final, layout_spo2, { responsive: true ,displayModeBar:false});

});



