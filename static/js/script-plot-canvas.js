// $(document).ready(function () {

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
const nbOfElts = 4;
    

    
firebase.database().ref('/'+userID+'/Sensor_data/').orderByKey().limitToLast(nbOfElts).on('value', ts_measures => {
     
    let timestamps = [];
    let values_hr = [];
    let values_spo2 = [];
    ts_measures.forEach(ts_measure => {
        //console.log(ts_measure.val().timestamp, ts_measure.val().value);
        timestamps.push(moment(ts_measure.val().timestamp).format('YYYY-MM-DD HH:mm:ss'));
        values_hr.push(ts_measure.val().hr);
        values_spo2.push(ts_measure.val().spo2);
    });
    
    
    const config = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "Random Dataset",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false,
            }],
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Creating Real-Time Charts with Flask'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    };

    // console.log('111');

    const context = document.getElementById('myPlot_hr').getContext('2d');
    const lineChart = new Chart(context, config);

    // console.log('111');
    config.data.labels = timestamps;
    config.data.datasets[0].data = values_hr;

    // console.log('111');

    if (config.data.labels.length === 60) {
        config.data.labels.shift();
        config.data.datasets[0].data.shift();
    }
    // config.data.labels.push(data.time);
    // config.data.datasets[0].data.push(data.value);
    lineChart.update();
    
});
// });