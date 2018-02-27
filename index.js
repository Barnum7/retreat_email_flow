// var appointments = document.getElementById("appointments");

var appointmentDataRef = firebase.database().ref("Appointments").orderByKey();

appointmentDataRef.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var appointment_status = childSnapshot.val().Appointment_Status;
      var service = childSnapshot.val().Service;
      document.getElementById("appointments").innerHTML = key;
      document.getElementById("service").innerHTML = service;
      document.getElementById("appointment_status").innerHTML = appointment_status;
  });
});

  $("#book").click(() => {

    var currentStatus = $("#appointment_status").text();
    var email = $("#email").val();

    if(email  === ""){
      alert('Please insert email address')
      return false;
    }
    if( currentStatus == "PENDING" ||  currentStatus =="CLOSED" || currentStatus == "") {
      alert('This appointment is not currently available');
      return false;
    }
    db.ref("Appointments").update({ appointment: "PENDING", email:email });
    alert('Thank you for your interest. Your appointment request is currently pending')
  })