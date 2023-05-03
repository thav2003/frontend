import React,{useEffect} from 'react'
import History from '../History'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPackagesByStatusId,setHistoryMode,getAllOrdersByStatusId } from '../../../../redux/reducers/stationPackageManagementReducer';
export default function HistoryContainer() {
    const dispatch = useDispatch();
    const allPackagesByStatus = useSelector((state) => state.stationPackageMng.allPackagesByStatus)
    const allOrdersByStatus = useSelector((state) => state.stationPackageMng.allOrdersByStatus)

    const historyMode = useSelector((state) => state.stationPackageMng.historyMode)
    useEffect(() => {
        if(historyMode===1){
            dispatch(getAllPackagesByStatusId(8))
        }else if(historyMode===2){

            dispatch(getAllOrdersByStatusId(6))
        }
       
    }, [dispatch,historyMode])

    const handleChangeMode=(mode)=>{
        dispatch(setHistoryMode(mode))
    }

    return (
        <div>
            <History   historyMode={historyMode} ordersByStatus={allOrdersByStatus} packagesByStatus={allPackagesByStatus} changeMode={handleChangeMode}/>
        </div>
    )
}
