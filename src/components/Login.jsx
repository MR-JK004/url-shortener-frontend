import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  sessionStorage.clear();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post('https://urlshortner-backend-08lq.onrender.com/user/login', {
        email,
        password
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('email', response.data.email);

        setEmail('');
        setPassword('');
        navigate('/url-shortner');
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during Login');
    }
    finally {
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
                <motion.div variants={inputVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                  <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </motion.div>

                <motion.div variants={inputVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                  <PasswordInput
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    showPassword={showPassword}
                    togglePassword={() => setShowPassword(!showPassword)}
                  />
                </motion.div>

                <motion.div variants={inputVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                  <MDBBtn className='w-100 mb-4' size='md' color='dark' onClick={handleLogin}>{loading ? <BeatLoader size={10} color="#ffffff" /> : 'Sign In'}</MDBBtn>
                </motion.div>

                <motion.div variants={inputVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                  <Link className="small text-muted" to='/forget-password'>Forgot password?</Link>
                  <p className="mb-5 pb-lg-2" style={{ color: '#393f81', marginTop: '10px' }}>Don't have an account? <Link to='/' style={{ color: '#393f81' }}>Register here</Link></p>
                </motion.div>
              </MDBCardBody>
            </MDBCard>
          </CardTransition>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
