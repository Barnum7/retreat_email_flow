const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth: {
        user:"gmail",
        pass:"password"
    }
})
exports.index = functions.database.ref("test/appointment").onUpdate(event => {
    const val = event.data.val();
    const from = "support@gmail.com";
    const subject = "APPOINTMENT STATUS";
    var text = "";
    return event.data.adminRef.parent.child('email').once('value',(snapshots)=>{
        console.log('eamil address is',snapshots.val())
        const to = snapshots.val();
        if(val === "PENDING") {
            console.log("Appointment is pending")
            text = "Thank you. current status is PENDING. please wait for our reply";
            transporter.sendMail({
                from:from,
                to:to,
                subject:subject,
                text:text
            })
        } else if(val === "CLOSED") {
            console.log('Appointment is approved')
            text = "Thank you. current status is BOOKED. thank you for booking.";
            transporter.sendMail({
                from:from,
                to:to,
                subject:subject,
                text:text
            })
        } else {
            console.log('Appointment is canceled.')
            text = "Unfotunately, current status is CANCELLED. please try again later";
            transporter.sendMail({
                from:from,
                to:to,
                subject:subject,
                text:text
            })
        }
    });
    
})