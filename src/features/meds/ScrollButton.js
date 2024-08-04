import React, {useState} from 'react'
import {FaArrowCircleUp} from 'react-icons/fa'
import {Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const ScrollButton = (visible) =>{ 

const scrollToTop = () =>{ 
	window.scrollTo({ 
	top: 0, 
	behavior: 'smooth'
	}); 
}; 

return ( 
	<Button variant='outlined' sx={{border:'none', '&:hover':{outline:'none', border:'none'}}}> 
	    <FaArrowCircleUp onClick={scrollToTop}  style={{display: visible.visible ? 'inline' : 'none'}} /> 
	</Button> 
); 
} 

export default ScrollButton; 
