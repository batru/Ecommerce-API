import request from "request";


const stkPush = (async (req,res) => {
    const amount = req.body.amount;
    const phone = req.body.phone;
    const date = new Date();
    const Timestamp =
      date.getFullYear() +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      ('0' + (date.getDate() + 1)).slice(-2) +
      ('0' + (date.getHours() + 1)).slice(-2) +
      ('0' + (date.getMinutes() + 1)).slice(-2) +
      ('0' + (date.getSeconds() + 1)).slice(-2);
  
    
    const password = new Buffer.from('174379' + process.env.PASS_KEY + Timestamp).toString(
      'base64'
    );
  
  
    let endPoint =
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    let auth = "Bearer " + req.token;
  
   
  
    request(
      {
        url: endPoint,
        method: "POST",
        headers: {
          Authorization: auth,
        },
        json: {
          BusinessShortCode: '174379',
          Password: password,
          Timestamp: Timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: `254${phone}`,
          PartyB: '174379',
          PhoneNumber: `254${phone}`,
          CallBackURL: 'https://a371-105-163-35-133.ngrok-free.app/api/callback',
          AccountReference: `254${phone}`,
          TransactionDesc: 'Test',
        },
      },
      function (error, response, body) {
        if (error) {
          console.log(error);
        } else {
         
          res.status(200).json(body);
        }
      }
    );
})
const stkCallback = (req,res) => {
    console.log("------stk push-------");
    console.log(req.body.Body.stkCallback.CallbackMetadata);
}


export {stkPush, stkCallback}