import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody
} from 'mdb-react-ui-kit';
import { Table } from 'react-bootstrap';
import Navbar from './NavBar';
import { toast } from 'react-toastify';
import useLogout from '../hooks/useLogout';
import CardTransition from './CardTransition';
import { motion } from 'framer-motion';
import { BeatLoader } from 'react-spinners'; // Import the spinner

const inputVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

function UrlListDisplay() {
  const [urlList, setUrlList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // State to track loading status
  const logout = useLogout();

  const fetchUrls = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const email = sessionStorage.getItem('email');

      const response = await axios.get('https://urlshortner-backend-08lq.onrender.com/url/url-list', {
        params: { email },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUrlList(response.data.list);
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session Expired");
        logout();
      }
      setError('Error fetching URLs');
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <>
      <Navbar />
      <MDBContainer fluid className='p-4 background-radial-gradient custom-colour'>
        <MDBRow className='d-flex justify-content-center align-items-start' style={{ height: '100vh', overflow: 'hidden' }}>
          <MDBCol md='12' className='text-center mb-5 custom-heading-container'>
            <h3 className="display-5 fw-bold ls-tight custom-heading" style={{ color: 'hsl(218, 81%, 95%)' ,marginTop:'60px'}}>
              Url List
              <br />
              <span className='text-muted'>View Your Shortened URLs</span>
            </h3>
          </MDBCol>

          <MDBCol md='12' className='d-flex justify-content-center'>
            <CardTransition>
              <MDBCard className='bg-glass shadow-lg custom-card' style={{ width: '80%', marginLeft: '10%' }}>
                <MDBCardBody className='p-4'>
                  <motion.div variants={inputVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                    {loading ? (
                      <div className='d-flex justify-content-center align-items-center' style={{ height: '300px' }}>
                        <BeatLoader size={15} color="#007bff" />
                      </div>
                    ) : (
                      <>
                        {urlList.length === 0 ? (
                          <p>No URLs found</p>
                        ) : (
                          <div className="table-responsive d-none d-md-block" >
                            <Table striped bordered hover responsive>
                              <thead>
                                <tr className='text-center'>
                                  <th>S.No</th>
                                  <th>Original URL</th>
                                  <th>Short URL</th>
                                  <th>Date Created</th>
                                </tr>
                              </thead>
                              <tbody>
                                {urlList.map((url, index) => (
                                  <tr key={url._id}>
                                    <td>{index + 1}</td>
                                    <td style={{ wordBreak: 'break-word' }}>{url.originalUrl}</td>
                                    <td style={{ wordBreak: 'break-word' }}>
                                      <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                                        {`https://urlshortner-backend-08lq.onrender.com/${url.shortCode}`}
                                      </a>
                                    </td>
                                    <td>{new Date(url.date).toLocaleDateString()}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        )}
                        <div className="d-block d-md-none">
                          {urlList.map((url, index) => (
                            <MDBCard key={url._id} className="mb-3 card-container">
                              <MDBCardBody>
                                <h5>S.No: {index + 1}</h5>
                                <p><strong>Original URL:</strong> <span style={{ wordBreak: 'break-word' }}>{url.originalUrl}</span></p>
                                <p><strong>Short URL:</strong> 
                                  <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                                    {`https://urlshortner-backend-08lq.onrender.com/${url.shortCode}`}
                                  </a>
                                </p>
                                <p><strong>Date Created:</strong> {new Date(url.date).toLocaleDateString()}</p>
                              </MDBCardBody>
                            </MDBCard>
                          ))}
                        </div>
                      </>
                    )}
                    {error && <p className='text-danger'>{error}</p>}
                  </motion.div>
                </MDBCardBody>
              </MDBCard>
            </CardTransition>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default UrlListDisplay;
