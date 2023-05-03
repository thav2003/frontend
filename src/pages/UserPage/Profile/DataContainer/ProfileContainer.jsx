import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfilePage from '../ProfilePage'
import { getUserInforForBooking } from '../../../../redux/reducers/bookingReducer';
import { updateUser } from '../../../../redux/reducers/userReducer';
export default function OrderContainer() {
    const dispatch = useDispatch();
    const accountId = localStorage.getItem('ACCOUNT_ID')
    const accountInfors = useSelector((state) => state.booking.accountInfors)
    useEffect(() => {
        dispatch(getUserInforForBooking(accountId))
    }, [dispatch])
const handleUpdateUser=(data)=>{
  dispatch(updateUser(data)).then(()=>{
    dispatch(getUserInforForBooking(accountId))
  })
}
  return (
    <div>
        <ProfilePage accountInfors={accountInfors} updateUser={handleUpdateUser}/>
    </div>
  )
}