import { useEffect, useState, forwardRef } from'react'
import { TextField, Typography, Button, Grid } from '@mui/material'
import styled from "styled-components"
import { useTheme } from '@mui/material/styles'

const StyledGrid = styled(Grid)(function () {
  const theme = useTheme();
  return{
    [theme.breakpoints.up("mobile")]: {
      gap: 1,
    },
    [theme.breakpoints.up("tablet")]: {
      gap: 3,
    }
  }
});
const CaptchaGrid = styled(Grid)(function () {
  const theme = useTheme();
  return{
    [theme.breakpoints.up("mobile")]: {
      width:'30%'
    }
  }
});
const CaptchaResult = styled(Grid)(function () {
  const theme = useTheme();
  return{
    [theme.breakpoints.up("mobile")]: {
      width:'100%'
    }
  }
});
const StyledButton = styled(Button)(function () {
  const theme = useTheme();
  return{
    [theme.breakpoints.up("mobile")]: {
      maxWidth:'35px'
    },
    [theme.breakpoints.up("tablet")]: {
      maxWidth:'80px'
    },
  }
});
const CaptchaRoot = styled('div', {
  name: 'MuiStat', 
  slot: 'root', 
})(() => ({
  fontWeight: 400,
  textDecoration:'line-through',
  fontStyle: 'italic',
  fontSize: 'x-large',
  border: '#8C9E94 1px solid',
  borderRadius: '5px',
  padding: '5px',
  textAlign: 'center',
  letterSpacing: '-0.025em',
  fontWeight: 600,
}));
const CaptchaValue = styled('div', {
  name: 'MuiStat',
  slot: 'value',
})(() => ({}));
const CaptchaImg = forwardRef(function Stat(props, ref) {
  const { value, ...other } = props;
  return (
    <CaptchaRoot ref={ref} {...other}>
      <CaptchaValue>{value}</CaptchaValue>
    </CaptchaRoot>
  );
});

export const Captcha = ({setButtonStatus}) => {
  const theme = useTheme();

  let [keyText, setKeyText] = useState('');
  let [captcha, setCaptcha] = useState('');
  let [captchaCode, setCaptchaCode] = useState('');

  useEffect(() => { Generate()}, [])
  function Generate() {
      setCaptchaCode("")
      let uniquechar = "";
      const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 1; i < 5; i++) {
          uniquechar += randomchar.charAt(Math.random() * randomchar.length)
      }
      setCaptcha(uniquechar)
  }
  const captchaChange = (e) => { setCaptchaCode(e.target.value)}
    function Printmsg() {
      const usr_input = captchaCode;
      if (usr_input == captcha) {
          setKeyText("Matched");
          setButtonStatus(false)
          Generate();
      }
      else {
          setKeyText("not Matched");
          Generate();
      }
  }
  return (
    <StyledGrid container direction='row' justifyContent='center' alignItems='center'>
        <CaptchaGrid item><CaptchaImg value={captcha}/></CaptchaGrid>
        <CaptchaGrid item>
          <TextField id="standard-helperText" label="Type captcha code" helperText="to unblock submitting" variant="standard" onChange={captchaChange} />
        </CaptchaGrid>
        <CaptchaGrid item><StyledButton variant="contained" onClick={Printmsg}>Submit</StyledButton></CaptchaGrid>
        <CaptchaResult item><Typography sx={{color: (keyText === 'Matched') ? `${theme.palette.success.light}` : `${theme.palette.error.light}`, paddingRight:'60px'}}>{keyText}</Typography></CaptchaResult>
    </StyledGrid>
  )
}

