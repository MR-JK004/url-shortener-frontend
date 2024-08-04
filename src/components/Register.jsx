import React, { useState ,useEffect} from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password must be the same');
      return;
    }
    if (!firstName || !lastName || !email || !password) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://urlshortner-backend-08lq.onrender.com/user/register', {
        firstName,
        lastName,
        email,
        password
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFirstName('');
        setLastName('');
      } else {
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during registration');
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient'>
      <MDBRow className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Simplify Your Links <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>with Our URL Shortener</span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            Transform your long, unwieldy URLs into short, manageable links with ease.
            Enhance your marketing efforts, track performance, and improve user experience
            with our efficient and reliable URL shortener.
          </p>
        </MDBCol>
        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className=" shadow-5-strong" style={{marginRight:'15%',width:'40%'}}></div>
          <CardTransition>
            <MDBCard className='my-5 bg-glass'>
              <MDBCardBody className='p-5'>
                <MDBRow>
                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </MDBCol>
                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </MDBCol>
                  
                </MDBRow>

                <motion.div variants={inputVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  showPassword={showPassword}
                  togglePassword={() => setShowPassword(!showPassword)}
                />
                <PasswordInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  showPassword={showConfirmPassword}
                  togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                />
                </motion.div>
                <motion.div variants={inputVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <MDBBtn className='w-100 mb-4' size='md' color='dark' onClick={handleRegister}>{loading ? <BeatLoader size={10} color="#ffffff" /> : 'Sign Up'}</MDBBtn>
                <p className="mb-5 pb-lg-2" style={{ color: '#393f81', textAlign: 'center' }}>Already have an account? <Link to='/login' style={{ color: '#393f81' }}>Login here</Link></p>
                </motion.div>
              </MDBCardBody>
            </MDBCard>
          </CardTransition>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
