import React from 'react'
import HistoryTable from './HistoryTable'
import './assets/History.scss'

export default function History() {
    return (
        <div className='container-fluid historyPage'>
            <h1 className='py-5 historyTitle'>Lịch sử</h1>
            <HistoryTable />
        </div>
    )
}
