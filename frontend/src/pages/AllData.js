import React, { useState, useEffect } from 'react';
import Breadcrumb from '../Components/Breadcrumb';
import { DataGrid } from '@mui/x-data-grid'
import { routes, callApi } from '../routes';
import { useParams } from 'react-router-dom';

function AllData() {
    const { id } = useParams()
    useEffect(() => {
        callApi(routes.allGroupData(id)).then(result => { 
            setRows(result)
        })       
        
    }, [])
    const columns = [
        { field: 'number', headerName: 'Number' },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'address', headerName: 'Address', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'gender', headerName: 'Gender', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'date', headerName: 'Date', width: 150 }
    ]
    const [rows, setRows] = useState([
        {id: 1, number: 132443543, name: 'Gareth G.', address: 'Chawkbazar', email: 'shahjasun@gmail.com', gender: 'male', status: 0, date: '2018-08-1622:17:45'},
        {id: 2, number: 432543543, name: 'Gareth G.', address: 'Chawkbazar', email: 'shahjasun@gmail.com', gender: 'male', status: 0, date: '2018-08-1622:17:45'},
        {id: 3, number: 876744654, name: 'Gareth G.', address: 'Chawkbazar', email: 'shahjasun@gmail.com', gender: 'male', status: 0, date: '2018-08-1622:17:45'},
        {id: 4, number: 211321344, name: 'Gareth G.', address: 'Chawkbazar', email: 'shahjasun@gmail.com', gender: 'male', status: 0, date: '2018-08-1622:17:45'}
    ])
    return <div>
        <h1>All Data</h1>
        <Breadcrumb page="File > Data" />
        <div style={{ height: 500, width: '90%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[5]}
            />
        </div>
    </div>;
}

export default AllData;
