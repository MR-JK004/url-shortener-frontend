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

const inputVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

function UrlListDisplay() {
  const [urlList, setUrlList] = useState([]);
  const [error, setError] = useState('');
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
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <>
      <Navbar />
      <MDBContainer fluid className='p-4 background-radial-gradient'>
        <MDBRow className='d-flex justify-content-center align-items-center' style={{ height: 'auto' }}>
          <MDBCol md='12' className='text-center mb-5' style={{ margin: '-5%' }}>
            <h3 className="display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)', margin: '-20px' }}>
              Created URLs
              <br />
              <span className='text-muted'>View Your Shortened URLs</span>
            </h3>
          </MDBCol>

          <MDBCol md='12' className='d-flex justify-content-center'>
            <CardTransition>
              <MDBCard className='bg-glass shadow-lg' style={{ width: 'auto', maxWidth: 'auto', marginTop: '10px' }}>
                <MDBCardBody className='p-4'>
                  <motion.div variants={inputVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                    <div style={{ maxHeight: '350px', overflowY: 'scroll' }}>
                      <Table striped bordered hover>
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
                              <td>{url.originalUrl}</td>
                              <td>
                                <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                                  {`http://localhost:8000/url/${url.shortCode}`}
                                </a>
                              </td>
                              <td>{new Date(url.date).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
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
