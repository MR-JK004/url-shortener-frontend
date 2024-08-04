import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import axios from 'axios';
import CardTransition from './CardTransition';
import { BeatLoader } from 'react-spinners';
import { motion } from 'framer-motion';

const inputVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const PasswordInput = ({ label, value, onChange, showPassword, togglePassword }) => (
  <div className="position-relative">
    <MDBInput
      wrapperClass='mb-4'
      label={label}
      type={showPassword ? 'text' : 'password'}
      size="lg"
      value={value}
      onChange={onChange}
    />
    <MDBBtn
      className="position-absolute top-50 end-0 translate-middle-y"
      color="link"
      onClick={togglePassword}
      style={{ backgroundColor: 'transparent', border: 'none' }}
    >
      <MDBIcon icon={showPassword ? 'eye-slash' : 'eye'} />
    </MDBBtn>
  </div>
);

function ResetPasswordPage() {
  const {token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
        toast.error('Both fields are required');
        return;
    }
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
    }
    setLoading(true);
    try {
        const response = await axios.post('https://urlshortner-backend-08lq.onrender.com/user/reset-password',{token,password});

        if (response.status === 200) {
            toast.success('Password reset successfully');
            navigate('/login');
        } else {
            toast.error(response.data.message || 'Password reset failed');
        }
    } catch (error) {
        toast.error(error.response.data.message || 'Password reset failed');
    }
    finally{
        setLoading(false);
    }
};

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient'>
      <MDBRow className='d-flex justify-content-center align-items-center mb-10' style={{ height: 'auto' }}>
        <MDBCol md='8' className='text-center justify-content-center'>
          <h4 className="display-5 fw-bold ls-tight px-3 mb-5" style={{ color: 'hsl(218, 81%, 95%)' }}>
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>Reset Password !</span>
          </h4>
        </MDBCol>
        <MDBCol md='6' className='position-relative'>
          <CardTransition>
          <MDBCard style={{paddingLeft:'20px',paddingRight:'20px'}}>
          <img src="https://free-url-shortener.rb.gy/url-shortener.png" alt="" style={{width:'40%',alignSelf:'center',marginBottom:'-17%'}}/>
          <MDBCardBody className='d-flex flex-column justify-content-center'>
              <motion.div variants={inputVariant} initial="hidden" animate="visible" style={{ marginTop: '40px' }}>
                <h5 className="fw-normal my-4 pb-1 text-center" style={{ letterSpacing: '1px', color: '#393f81', lineHeight: '1.5' }}>
                  Enter Your New Password
                </h5>
              </motion.div>
    
              <motion.div variants={inputVariant} initial="hidden" animate="visible">
                <PasswordInput
                  label="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                />
              </motion.div>

              <motion.div variants={inputVariant} initial="hidden" animate="visible">
                <PasswordInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  showPassword={showConfirmPassword}
                  togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </motion.div>

              <motion.div variants={inputVariant} initial="hidden" animate="visible">
                <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit} disabled={loading}>
                {loading ? <BeatLoader size={10} color="#ffffff" /> : 'Reset Password'}
                </MDBBtn>
              </motion.div>
            </MDBCardBody>
            </MDBCard>
        </CardTransition>
      </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ResetPasswordPage;
