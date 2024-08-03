import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import Navbar from './NavBar';
import { toast } from 'react-toastify';
import useLogout from '../hooks/useLogout'
import CardTransition from './CardTransition'
import { BeatLoader } from 'react-spinners';
import { motion } from 'framer-motion';

const inputVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [title, setTitle] = useState('');
  const logout = useLogout();
  const [loading, setLoading] = React.useState(false);

  const handleShorten = async (e) => {
    e.preventDefault();

    if (!originalUrl || !originalUrl.startsWith('http')) {
      toast.error('Please enter a valid URL starting with http or https.');
      return;
    }
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('https://urlshortner-backend-08lq.onrender.com/url/shorten', {
        originalUrl: originalUrl.trim(),
        title: title.trim() || undefined
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setShortUrl(response.data.shortUrl);

    } catch (err) {
      if (err.response.status === 401) {
        toast.error("Session Expired");
        logout();
      }
      const message = err.response?.data?.error || 'Error shortening URL';
      toast.error(message)
      setShortUrl('');
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Navbar />
      <MDBContainer fluid className='p-4 background-radial-gradient'>
        <MDBRow className='d-flex justify-content-center align-items-center' style={{ height: '100%', marginTop: '-10%' }}>
          <MDBCol md='12' className='text-center mb-5'>
            <h3 className="display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
              URL Shortener
              <br />
              <span className='text-muted'>Shorten your links effortlessly</span>
            </h3>
          </MDBCol>

          <MDBCol md='6' className='d-flex justify-content-center' style={{ marginTop: '-10%' }}>
            <CardTransition>
              <MDBCard className='bg-glass shadow-lg' style={{ width: '100%', maxWidth: '600px' }}>
                <MDBCardBody className='p-4'>
                  <motion.div variants={inputVariant} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                    <h3 className="mb-4 text-center">Paste the <span className='fw-bold'>URL</span> to be shortened</h3>
                    <form onSubmit={handleShorten}>
                      <MDBInput
                        label='Enter the URL'
                        type='url'
                        className='mb-4'
                        style={{ width: '100%' }}
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        required
                      />
                      <MDBInput
                        label='Title (Optional)'
                        type='text'
                        className='mb-4'
                        style={{ width: '100%' }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      {shortUrl && (
                        <div className='d-flex align-items-center md-5'>
                          <h5 className='me-2'>Shortened URL:</h5>
                          <a href={shortUrl} style={{ fontSize: '20px', marginTop: '-8px' }} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                        </div>
                      )}
                      <MDBBtn
                        color='dark'
                        block
                        className='mt-2 mb-4'
                        type="submit"
                      >
                        {loading ? <BeatLoader size={10} color="#ffffff" /> : 'Generate Short Url'}
                      </MDBBtn>
                      <p className='text-center mt-4'>
                        ShortURL is a free tool to shorten URLs and generate short links. It makes sharing links easier and more manageable.
                      </p>
                    </form>
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

export default UrlShortener;
