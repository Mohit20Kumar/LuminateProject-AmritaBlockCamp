import { Box, Typography, Backdrop, CircularProgress, Divider } from '@mui/material'
import React from 'react'
import useEth from '../contexts/EthContext/useEth'
import CustomButton from '../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import bg from "../assets/bg-plus.jpg"


const Home = () => {
  const {
    state: { contract, accounts, role, loading },
    dispatch,
  } = useEth()
  const navigate = useNavigate()

  const registerDoctor = async () => {
    try {
      await contract.methods.addDoctor().send({ from: accounts[0] })
      dispatch({
        type: 'ADD_DOCTOR',
      })
    } catch (err) {
      console.error(err)
    }
  }



  const ActionSection = () => {
    if (!accounts) {
      return (
        <Typography variant='h5' color='white'>
          Open your MetaMask wallet to get connected, then refresh this page
        </Typography>
      )
    } else {
      if (role === 'unknown') {
        return (
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Box mb={2}>
              <CustomButton color="secondary" text='Doctor Register ==>' handleClick={() => registerDoctor()}>
              </CustomButton>
            </Box>
            <Typography variant='h5' color='white'>
              If you are a patient, ask your doctor to register for you
            </Typography>
          </Box>
        )
      } else if (role === 'patient') {
        return (
          <CustomButton background="red" text='Patient Gateway ==>' handleClick={() => navigate('/patient')}>
          </CustomButton>
        )
      } else if (role === 'doctor') {
        return (
          <CustomButton text='Doctor Gateway ==>' handleClick={() => navigate('/doctor')}>
          </CustomButton>
        )
      }
    }
  }

  if (loading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  } else {
    return (
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        width='100vw'
        height='100vh'
        id='background'
        background={bg}
      >
        <Box
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >

        </Box>

        <Box id='home-page-box' display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={5}>
          <Box mt={2} mb={5}>
            <Typography variant='h1' color='white'>
              L.U.M.I.N.A.T.E
            </Typography>
          </Box>
          <Box mt={1} mb={5}>
            <Typography variant='h4' color='white'>
              Health Made Easy
            </Typography>
          </Box>
          <ActionSection />

        </Box>
      </Box>
    )
  }
}

export default Home
