import axios from "axios";

//middleware function to generate token
const safaricomToken = async (req, res, next) => {
    
    const auth = new Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.SECRET_KEY}`).toString(
      'base64'
    );
  
    await axios
      .get(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      )
      .then((response) => {
        //console.log(response.data.access_token);
        req.token = response.data.access_token;
  
       // console.log(req.token);
  
        next();
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json(error.message);
      });
  };

  export {safaricomToken}