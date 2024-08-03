import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import CardTransition from './CardTransition';
import { BeatLoader } from 'react-spinners';

const inputVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

function ForgetPasswordPage() {

  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Email Address is Required")
      return;
    }
    try {
      console.log("Sending registration request...");
      setLoading(true);
      let response = axios.post('https://urlshortner-backend-08lq.onrender.com/user/forget-password', {
        email: email
      })

      if ((await response).status == 200) {
        toast.success((await response).data)
        setEmail('')
        console.log(response);
      }
      else {
        toast.error('Email Sent failed' || response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <MDBContainer fluid className='p-4 background-radial-gradient'>
      <MDBRow className='d-flex justify-content-center align-items-center mb-10' style={{ height: 'auto' }}>
        <MDBCol md='8' className='text-center justify-content-center'>
          <h4 className="display-5 fw-bold ls-tight px-3 mb-5" style={{ color: 'hsl(218, 81%, 95%)' }}>
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>Forget Password !</span>
          </h4>
        </MDBCol>
        <MDBCol md='6' className='position-relative'>
          <CardTransition>
          <MDBCard style={{paddingLeft:'20px',paddingRight:'20px'}}>
          <img src="https://free-url-shortener.rb.gy/url-shortener.png" alt="" style={{width:'40%',alignSelf:'center',marginBottom:'-17%'}}/>
          <MDBCardBody className='d-flex flex-column justify-content-center'>
              <motion.div variants={inputVariant} initial="hidden" animate="visible" style={{ marginTop: '40px' }}>
                <h5 className="fw-normal my-4 pb-1 text-left" style={{ letterSpacing: '1px', color: '#393f81', lineHeight: '1.5' }}>
                  Enter Your Registered E-mail address. We will send a password reset link to your mail id. Use it to reset your password.
                </h5>
              </motion.div>
              
              <motion.div variants={inputVariant} initial="hidden" animate="visible">
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
              </motion.div>

              <motion.div variants={inputVariant} initial="hidden" animate="visible">
                <MDBBtn className="mb-4 px-5" style={{backgroundColor:'#3B71CA'}} size='lg' onClick={handleSubmit}>
                {loading ? <BeatLoader size={10} color="#ffffff" /> : 'Submit'}
                </MDBBtn>
              </motion.div>

            </MDBCardBody>
            </MDBCard>
          </CardTransition>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </>;
}

export default ForgetPasswordPage;
