const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth: {
        user:"gmail",
        pass:"password"
    }
})
exports.index = functions.database.ref("Appointments").onUpdate(event => {
    const val = event.data.val();
    const from = "support@gmail.com";
    const subject = "Appointment Status";
    var text = "";
    return event.data.adminRef.parent.child('email').once('value',(snapshots)=>{
        const to = snapshots.val();
        if(val === "PENDING") {
            text = "Thank you. Your current status is Pending. We'll let you know when that changes";
            transporter.sendMail({
                from:from,
                to:to,
                subject:subject,
                text:text
            })
        } else if(val === "CLOSED") {
            text = "Thank you. Your current status is booked. Thanks for using Retreat.";
            transporter.sendMail({
                from:from,
                to:to,
                subject:subject,
                text:text
            })
        } else {
            text = "Unfotunately, your appointment was cancelled. Hopefully we can see you around soon.";
            transporter.sendMail({
                from:from,
                to:to,
                subject:subject,
                text:text
            })
        }
    });
    
})