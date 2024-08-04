import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBSpinner } from 'mdb-react-ui-kit';
import axios from 'axios'; 
import { toast } from 'react-toastify';

const ActivationPage = () => {
  const { token } = useParams();
  const [activationStatus, setActivationStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivationStatus = async () => {
      try {
        const response = await axios.post('https://urlshortner-backend-08lq.onrender.com/user/activation-link', { token });

        if (response.status === 200) {
          toast.success('Account Activated');
          setActivationStatus(true);
        } else {
          toast.error(response.data.message);
          setActivationStatus(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'An error occurred');
        setActivationStatus(false);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchActivationStatus();
    }
  }, [token]);

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient'>
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol xs='12' sm='20' md='8' lg='10' style={{width:'100%'}}>
          <MDBCard className='my-5 bg-glass shadow-lg custom-card' style={{ width: '100%', margin: '0 auto' }}>
            <MDBCardBody className='p-4 text-center'>
              {loading && (
                <>
                  <MDBSpinner color='primary' style={{ width: '3rem', height: '3rem' }} />
                  <p className='mt-3'>Activating your account...</p>
                </>
              )}
              {!loading && activationStatus === true && (
                <>
                  <div style={{ fontSize: '3rem', color: 'green' }}>
                    <i className='fas fa-check-circle'></i>
                  </div>
                  <h2 className='my-4'>Account Activated Successfully!</h2>
                  <p>Your account has been successfully activated.</p>
                </>
              )}
              {!loading && activationStatus === false && (
                <>
                  <div style={{ fontSize: '3rem', color: 'red' }}>
                    <i className='fas fa-times-circle'></i>
                  </div>
                  <h2 className='my-4'>Activation Failed!</h2>
                  <p>There was an error activating your account. Please try again later.</p>
                </>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ActivationPage;
