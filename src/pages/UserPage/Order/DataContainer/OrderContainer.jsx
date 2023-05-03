import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getUserInforForBooking,getLocations } from '../../../../redux/reducers/bookingReducer';
import OrderPage from '../OrderPage'

export default function OrderContainer() {
    const dispatch = useDispatch();
    const accountId = localStorage.getItem('ACCOUNT_ID')
    const accountInfors = useSelector((state) => state.booking.accountInfors)
    const products = useSelector((state) => state.booking.products)
    const locations = useSelector((state) => state.booking.locations)

    useEffect(() => {
        dispatch(getUserInforForBooking(accountId))
        dispatch(getProducts())
        dispatch(getLocations())
    }, [dispatch])

  return (
    <div>
        <OrderPage accountInfors={accountInfors} products={products} locations={locations}/>
    </div>
  )
}
