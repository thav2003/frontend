import React, { useEffect, useState } from 'react';
import './Success.scss';
import { useParams } from 'react-router-dom';
import { getAuthUserAPI } from '../../api/apis';
import { isInteger, isNumber, set } from 'lodash';

function VerificationSuccess(props) {
    const { id } =useParams();
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState("")
    console.log(id)
    useEffect(()=>{
       
        const fetchApi=async()=>{
                const res=await getAuthUserAPI(id);
                return res.data;
        }
        if(!Number.isInteger(Number(id))){
            setLoading(true)
            setError("Id is not valid")
            setLoading(false)
        }else{
            setError("")
            setLoading(true)
            fetchApi()
                .then(res=>{
                console.log(res)})
                .catch(e=>{
                    setError(e.response.data.error)
                })
                .finally(()=>setLoading(false))
        }
    },[id])
    console.log(error)
    if(loading){
        return(
            <div className='SuccessPage'>
                <div className="VerificationSuccess">
                    <div className="spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
    if(error){
        return(

        
            <div className='SuccessPage'>
                <div className="VerificationSuccess">
                    <div className="tick">❌</div>
                    <p>Something wrong</p>
                </div>
            </div>
        )
    }
    return (
        <div className='SuccessPage'>
            <div className="VerificationSuccess">
                <div className="tick">&#10004;</div>
                <p>Your account has been successfully verified!</p>
            </div>
        </div>
    
    );
}

export default VerificationSuccess;