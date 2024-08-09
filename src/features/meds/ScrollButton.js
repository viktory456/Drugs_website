import React, {useState} from 'react'
import {FaArrowCircleUp} from 'react-icons/fa'
import {Button } from '@mui/material'
import styled from "styled-components"



const Scroll = styled(Button) (function () {
	return {
		border: `none`,
		outline:'none',
		marginTop:'10px',
		'&:hover':{
			outline:'none', border:'none'
		}
	}
  })

const ScrollButton = (visible) =>{ 

const scrollToTop = () =>{ 
	window.scrollTo({ 
	top: 0, 
	behavior: 'smooth'
	}); 
}; 

return ( 
	<Scroll variant='outlined'> 
	    <FaArrowCircleUp onClick={scrollToTop}  style={{display: visible.visible ? 'inline' : 'none'}} /> 
	</Scroll> 
); 
} 

export default ScrollButton; 
