import React, { useState } from 'react'
import { copyCoupon, selectCouponById } from '../api/couponsSlice'
import { useSelector, useDispatch } from "react-redux"

export const Coupon = (couponId) => {

    const dispatch = useDispatch()
    const [buttonText, setButtonText] = useState(false)
    const couponSelected = useSelector((state) => selectCouponById(state, Number(couponId.couponId)))

    const copyCouponFunc = () => {
        setButtonText(!buttonText)
        if (couponSelected.copied === true) {
            dispatch(copyCoupon(couponSelected)).unwrap()
        } else {
            dispatch(copyCoupon(couponSelected)).unwrap()
        }
    }

  return (
    <li className='coupon'>
        <div>{couponSelected.name}</div>
        <div>{couponSelected.code}</div>
        <button onClick={copyCouponFunc}>{couponSelected.copied ? 'Remove' : 'Copy'}</button>
    </li>
  )
}
