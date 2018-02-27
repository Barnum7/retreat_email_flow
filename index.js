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