$(function(){
    
    
        console.log('home');
        document.querySelector("#Personal").classList.add("hide");
        document.querySelector("#Prescription").classList.add("hide");
        document.querySelector("#Record").classList.add("hide");
    
        document.querySelector("#Personal-ref").onclick = function(){
            console.log('personal');
            document.querySelector("#Personal").classList.remove("hide");
            document.querySelector("#HOME").classList.add("hide");
            document.querySelector("#Prescription").classList.add("hide");
            document.querySelector("#Record").classList.add("hide");
        }
        document.querySelector("#Prescription-ref").onclick = function(){
            console.log('prescription');
            document.querySelector("#Prescription").classList.remove("hide");
            document.querySelector("#HOME").classList.add("hide");
            document.querySelector("#Personal").classList.add("hide");
            document.querySelector("#Record").classList.add("hide");
        }
        document.querySelector("#Record-ref").onclick = function(){
            console.log('record plots');
            document.querySelector("#Record").classList.remove("hide");
            document.querySelector("#HOME").classList.add("hide");
            document.querySelector("#Personal").classList.add("hide");
            document.querySelector("#Prescription").classList.add("hide");
        }
        document.querySelector("#HOME-ref").onclick = function(){
            console.log('home');
            document.querySelector("#HOME").classList.remove("hide");
            document.querySelector("#Prescription").classList.add("hide");
            document.querySelector("#Personal").classList.add("hide");
            document.querySelector("#Record").classList.add("hide");
        }
        
    
        // document.querySelector("#logout").onclick = function(){
        // 	document.querySelector(".login-register").classList.remove("hide");
        // 	document.querySelector(".index-page").classList.add("hide");
        // 	document.querySelector("#login-form").classList.remove("hide");
        // 	document.querySelector("#registration-form").classList.add("hide");
            
        // }
        
    
    });












































// (function(){

// 	var firebaseConfig = {
//     apiKey: "AIzaSyD-mfkVcrmzst_UOx2ixNBNJAn5XQEl50M",
//     authDomain: "health-care-7c36c.firebaseapp.com",
// 	databaseURL: "https://health-care-7c36c-default-rtdb.firebaseio.com/",
//     projectId: "health-care-7c36c",
//     storageBucket: "health-care-7c36c.appspot.com",
//     messagingSenderId: "103348142996",
//     appId: "1:103348142996:web:13149dd852f7c5fd73c581",
//     measurementId: "G-VHPD0FSFMV"
//   };

//   console.log('Configuring');

// 	firebase.initializeApp(firebaseConfig);

// 	var database = firebase.database();

// 	console.log('Configured	');
// 	const s1 = document.getElementById('ftemp');
// 	const s2 = document.getElementById('fhr');
// 	const s3 = document.getElementById('fspo2');
// 	// const s4 = document.getElementById('sensor');

// 	const s1_ref = database.ref('Person-1/Sensor_data').child('s1');
// 	const s2_ref = database.ref('Person-1/Sensor_data').child('s2');
// 	const s3_ref = database.ref('Person-1/Sensor_data').child('s3');
// console.log(s1_ref);
// 	//sync object changes
// 	s1_ref.limitToLast(1).on('value',function(snapshot){
// 		snapshot.forEach(function(childSnapshot){
// 			var childData = childSnapshot.val();
// 			console.log("Sensor-1: "+childData);
// 			s1.innerText = childData;
// 		});
// 	});

// 	s2_ref.limitToLast(1).on('value',function(snapshot){
// 		snapshot.forEach(function(childSnapshot){
// 			var childData = childSnapshot.val();
// 			console.log("Sensor-2: "+childData);
// 			s2.innerText = childData;
// 		});
// 	});

// 	s3_ref.limitToLast(1).on('value',function(snapshot){
// 		snapshot.forEach(function(childSnapshot){
// 			var childData = childSnapshot.val();
// 			console.log("Sensor-3: "+childData);
// 			s3.innerText = childData;
// 		});
// 	});

	

// }());