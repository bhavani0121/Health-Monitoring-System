$(function(){

// 	var firebaseConfig = {
    // apiKey: "AIzaSyD-mfkVcrmzst_UOx2ixNBNJAn5XQEl50M",
    // authDomain: "health-care-7c36c.firebaseapp.com",
    // projectId: "health-care-7c36c",
    // storageBucket: "health-care-7c36c.appspot.com",
    // messagingSenderId: "103348142996",
    // appId: "1:103348142996:web:13149dd852f7c5fd73c581",
    // measurementId: "G-VHPD0FSFMV"
//   };

// 	firebase.initializeApp(firebaseConfig);


	document.querySelector("#registration-form").classList.add("hide");
	// document.querySelector(".index-page").classList.add("hide");

	//------------------------------------------------------
	document.querySelector("#register-here").onclick = function(){
		document.querySelector("#login-form").classList.add("hide");
		document.querySelector("#registration-form").classList.remove("hide");
	}
	document.querySelector("#login-here").onclick = function(){
		document.querySelector("#login-form").classList.remove("hide");
		document.querySelector("#registration-form").classList.add("hide");
	}
	//----------------------------------------------
	document.querySelector("#register-button").onclick = function(){
		console.log("1");
		var email = document.getElementById("id").value;
		var password = document.getElementById("psswd").value;
		var name = document.getElementById("name").value;
		console.log("1");
		
		firebase.auth().createUserWithEmailAndPassword(email,password)
			.then(function(){
				console.log("1");
				var id=firebase.auth().currentUser.uid;
				firebase.database().ref('Users/'+id).set({
					Name:name,
					Email:email,
				});
				console.log("1");
			});
			// .catch(funciton(error){
			// 	var errcode = error.code;
   //  			var errormsg=error.message;
			// });
			console.log("1");
		document.querySelector("#login-form").classList.remove("hide");
		document.querySelector("#registration-form").classList.add("hide");
	}
	//-------------------------------------

	document.querySelector("#login-button").onclick = function(){

		// function login(event){
			// this.textContent = "Logging in..."
			var id = document.getElementById("id").value;
			var psswd = document.getElementById("psswd").value;

			document.querySelector(".login-register").classList.add("hide");
			
			// $ajaxUtils.sendGetRequest('/data/details.json',
			// 	function(res){
			// 		var msg="hii..!"
			// 		if(id == res.ids){
			// 			if(psswd == res.psswds){
			// 				window.location = "index.html";
			// 			}
			// 			else{
			// 				msg+="Incorrect psswd";
			// 			}
			// 		}
			// 		else{
			// 			msg+="Invalid user id";
			// 		}

			// 		document.querySelector("#content").innerHTML
			// 			= "<h3>"+msg+"</h3>";		
			// 	}
			// );
	}

	// document.querySelector("#logout").onclick = function(){
	// 	document.querySelector(".login-register").classList.remove("hide");
	// 	document.querySelector(".index-page").classList.add("hide");
	// 	document.querySelector("#login-form").classList.remove("hide");
	// 	document.querySelector("#registration-form").classList.add("hide");
		
	// }
	

});