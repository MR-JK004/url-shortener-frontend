import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader
} from 'mdb-react-ui-kit';
import Navbar from './NavBar';
import { toast } from 'react-toastify';
import useLogout from '../hooks/useLogout'
import CardTransition from './CardTransition'

function UrlCountDisplay() {
  const [dailyCount, setDailyCount] = useState(0);
  const [monthlyCount, setMonthlyCount] = useState(0);
  const [error, setError] = useState('');
  const logout = useLogout();

  const fetchCounts = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const email = sessionStorage.getItem('email');
      const dailyResponse = await axios.get('https://urlshortner-backend-08lq.onrender.com/url/daily-count',{
          params: { email },
          headers:{
            Authorization:`Bearer ${token}`
          }
      });
      const monthlyResponse = await axios.get('https://urlshortner-backend-08lq.onrender.com/url/monthly-count',{
          params: { email },
          headers:{
            Authorization:`Bearer ${token}`
        }
      });
      
      setDailyCount(dailyResponse.data.count);
      setMonthlyCount(monthlyResponse.data.count);
      setError('');

    } catch (err) {
      if(err.response.status === 401){
        toast.error("Session Expired");
        logout();
    }
      console.error('Error fetching counts:', err);
      setError('Error fetching counts');
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return <>
    <Navbar />
    <MDBContainer fluid className='p-4 background-radial-gradient'>
      <MDBRow className='d-flex justify-content-center align-items-center' style={{ height: '100%',marginTop:'-5%' }}>
        <MDBCol md='12' className='text-center'>
          <h3 className="display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
            URL Statistics
            <br />
            <span className='text-muted'>View Daily and Monthly Counts</span>
          </h3>
        </MDBCol>

        <MDBCol md='6'>
        <CardTransition>
          <MDBCard className='bg-glass shadow-lg' style={{ width: '100%'}}>
            <MDBCardBody className='p-4'>
              <MDBCardHeader className='text-center'>
                <h4>Statistics Overview</h4>
              </MDBCardHeader>
              <div className='text-center' style={{marginTop:'20px'}}>
                <h5 className='mb-4'>Daily <span className='fw-bold'> URL </span> Count:</h5>
                <h3 className='mb-4'>{dailyCount}</h3>
                <h5 className='mb-4'>Monthly <span className='fw-bold'> URL </span> Count:</h5>
                <h3 className='mb-4'>{monthlyCount}</h3>
                {error && <p className='text-danger'>{error}</p>}
              </div>
            </MDBCardBody>
          </MDBCard>
          </CardTransition>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </>
}

export default UrlCountDisplay;
