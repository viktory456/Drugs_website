import { useEffect, useState, forwardRef } from'react'
import { TextField, Typography, Button, Grid } from '@mui/material'
import styled from "styled-components"
import { useTheme } from '@mui/material/styles'


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
    <Grid container direction='row' justifyContent='center' alignItems='center' spacing={{xs:'3px', sm:3}}>
        <Grid item xs={4}><CaptchaImg value={captcha}/></Grid>
        <Grid item xs={4}>
          <TextField id="standard-helperText" label="Type captcha code" helperText="to unblock submitting" variant="standard" onChange={captchaChange}/>
        </Grid>
        <Grid item xs={4}><Button variant="contained" onClick={Printmsg} sx={{maxWidth:{xs:'35px', sm:'80px'}}}>Submit</Button></Grid>
        <Grid xs={12} item><Typography sx={{color: (keyText === 'Matched') ? `${theme.palette.success.light}` : `${theme.palette.error.light}`, paddingRight:'60px'}}>{keyText}</Typography></Grid>
    </Grid>
  )
}
