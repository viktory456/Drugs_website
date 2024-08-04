import React, { useContext, useEffect,useState } from 'react'
import {Stack, FormControlLabel, Checkbox, TextField} from '@mui/material'
import { useTheme } from '@mui/material/styles'

export const InputForm = ({setName, setAdress, setPhone, setEmail, setCurrier}) => {
  const theme = useTheme();
  let [nameLocal, setNameLocal] = useState('')
  let [emailLocal, setEmailLocal] = useState('')
  let [phoneLocal, setPhoneLocal] = useState('')
  let [adressLocal, setAdressLocal] = useState('')
  let [currierLocal, setCurrierLocal] = useState(false)
  const onNameChanged = e => {setNameLocal(e.target.value)}
  const onEmailChanged = e => {setEmailLocal(e.target.value)}
  const onPhoneChanged = e => {setPhoneLocal(e.target.value)}
  const onAdressChanged = e => {setAdressLocal(e.target.value)}
  const onCurrierChecked = e => {setCurrierLocal(e.target.checked)}
  useEffect(() => {
      setName(nameLocal)
      setEmail(emailLocal)
      setPhone(phoneLocal)
      setAdress(adressLocal)
      setCurrier(currierLocal)
  }, [nameLocal, emailLocal, phoneLocal, adressLocal, currierLocal])
  return (
    <Stack direction='column' spacing={2} borderRadius={1} padding='25px' sx={{width:{md:'70%', lg:'100%'}, border:`1px solid ${theme.palette.secondary.dark}`, color:`${theme.palette.text.secondary}`}}>

    <TextField id="name" label="Name" variant="standard" value={nameLocal} onChange={onNameChanged}/>
    <TextField id="email" label="Email" variant="standard" value={emailLocal} onChange={onEmailChanged}/>
    <TextField id="phone" label="Phone" variant="standard" value={phoneLocal} onChange={onPhoneChanged}/>
    <TextField id="adress" label="Adress" variant="standard" value={adressLocal} onChange={onAdressChanged}/>
    <FormControlLabel control={<Checkbox color="success"/>} label="Currier delivery" checked={currierLocal} onChange={onCurrierChecked}/>

</Stack>
  )
}
