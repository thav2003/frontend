import React,{useEffect} from 'react'
import History from '../History'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../../../redux/reducers/userReducer';
export default function HistoryContainer() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.user.orders)
    useEffect(() => {
		dispatch(getOrders());
	}, [dispatch]);
    return (
        <div>
            <History orders={orders}/>
        </div>
    )
}
