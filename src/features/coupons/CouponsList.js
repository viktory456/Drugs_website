import { selectAllCoupons } from '../api/couponsSlice'
import { useSelector } from "react-redux"
import { Coupon } from './Coupon'
import Grid from '@mui/material/Grid'
import styled from "styled-components"
import { useTheme } from '@mui/material/styles'

const StyledGrid = styled(Grid)(function () {
  const theme = useTheme();
  return{
    [theme.breakpoints.up("mobile")]: {
      justifyContent:'flex-start'
    },
  }
});

export const CouponsList = () => {
  const coupons = useSelector(selectAllCoupons)
  let couponsList = coupons.map(id => <Coupon key={id.id} couponId={id.id}/>)

  return (
    <StyledGrid container>{couponsList}</StyledGrid>
  )
}
