import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid'
import Switch from '@mui/material/Switch';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb';
import { callApi, routes, postValue } from '../routes';

function UserList() {
    useEffect(() => {
        callApi(routes.allUsers).then(result => {
            console.log(result)
            setRows(result.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    status: item.status
                }                
            }))
        })
    },[])

    const handleUserStatus = (id, event) => {
        const status = event.target.checked ? 1 : 0
        postValue(routes.changeActiveStatus, { id, status })
    }
    const handleUserDelete = (id) => {
        postValue(routes.deleteUser, { id })
        setRows(rows.filter(item => item.id !== id ))
    }
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'email', headerName: 'Email', width: 250  },
        { 
            field: 'status', 
            headerName: 'Status',
            renderCell: (params) => {
                return params.row.status === 1 ? <Switch defaultChecked onChange={e => handleUserStatus(params.row.id, e)} /> : <Switch onChange={e => handleUserStatus(params.row.id, e)}/>
                
            }
        },
        { 
            field: 'edit', 
            headerName: 'Edit',
            renderCell: (params) => {
                return <Link to={`/user-edit/${params.row.id}`}><Button>Edit</Button></Link>
            }
        },
        { 
            field: 'delete', 
            headerName: 'Delete',
            renderCell: (params) => {
                return <Button color="red" onClick={() => handleUserDelete(params.row.id)}>Delete</Button>
            } 
        }
    ];
    const [rows, setRows] = useState([
        { id: 1, name: "Shah Ul Jasun", email: "shahjasun@gmail.com", status: true, edit: "Edit", delete: "Delete" },
        { id: 2, name: "Jisun Abedin", email: "jisunabedin@gmail.com", status: false, edit: "Edit", delete: "Delete" }
    ])
      
  return <div>
      <h1>User List</h1>
      <Breadcrumb page="User > List" />
      <div style={{ height: 300, width: '80%' }}>
        <DataGrid 
            rows={rows}
            columns={columns}   
            pageSize={5}
            rowsPerPageOptions={[5]}     
        />
      </div>
      
  </div>;
}

const Button = styled.button`
    padding: 5px 10px;
    background-color: ${props => props.color ? props.color : '#63B3ED'};
    min-width: 70px;
    color: white;
    border: none;
    outline: none;
    border-radius: 9px;
    &:hover {
        filter: brightness(70%);
    }
`

export default UserList;
