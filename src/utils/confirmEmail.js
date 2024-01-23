import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'



// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });


  const welcomeEmail = (email) => {
    try {
  

        // Send the email
        jwt.sign(
            {
                 email : email ,
            },
            process.env.EMAIL_SECRET,
            {
              expiresIn: '1d',
            },
            async (err, emailToken) => {
              const url = `http://localhost:3000/confirmation/${emailToken}`;
        
             await transporter.sendMail({
                from: `${process.env.EMAIL}`,
                to: `${email}`,
                subject: 'Confirm Email',
                html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
              });
            },
          );

          
    
        // res.status(200).send('Email sent successfully!');
      } catch (error) {
        console.error(error);
        // res.status(500).send('Internal Server Error');
      }
  }

  export default welcomeEmail