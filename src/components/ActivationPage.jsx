import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import axios from 'axios'; // Import axios for HTTP requests
import { toast } from 'react-toastify'; // Import toast for notifications

const ActivationPage = () => {
  const { token } = useParams();
  const [activationStatus, setActivationStatus] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading

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
        toast.error(error.response.data.message);
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
      <MDBRow className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <MDBCol md='6'>
          <MDBCard className='my-5 bg-glass' style={{ width: '200%', marginLeft: '-25%' }}>
            <MDBCardBody className='p-5 text-center'>
              {loading && <p>Activating your account...</p>}
              {!loading && activationStatus === true && (
                <>
                  <div style={{ fontSize: '4rem', color: 'green' }}>
                    <i className='fas fa-check-circle'></i> {/* Big tick mark icon */}
                  </div>
                  <h2 className='my-4'>Account Activated Successfully!</h2>
                  <p>Your account has been successfully activated.</p>
                </>
              )}
              {!loading && activationStatus === false && (
                <>
                  <div style={{ fontSize: '4rem', color: 'red' }}>
                    <i className='fas fa-times-circle'></i> {/* Big x mark icon */}
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
