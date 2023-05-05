import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { grey, teal, lightGreen, green } from '@mui/material/colors'

const CustomButton = ({ text, handleClick, disabled = false, children }) => {
  return (
    <Button
      startIcon={children}
      style={{
        backgroundColor: disabled ? grey[400] : green["900"],
        textTransform: 'none',
        padding: '10px 20px',
      }}
      onClick={handleClick}
      disabled={disabled}
    >
      <Typography variant='h5' color='white'>
        {text}
      </Typography>
    </Button>
  )
}

export default CustomButton
