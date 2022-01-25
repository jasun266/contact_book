import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid'
import Switch from '@mui/material/Switch';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb';
import { Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { callApi, routes } from '../routes';

function DataList() {
    const [modalOpen, setModelOpen] = React.useState(false);
    const handleModalOpen = (id) => { 
        setModelOpen(true);
        callApi(routes.allFileGroups(id)).then(response => {
            setGroupRows(response)
        })
    }
    const handleModalClose = () => setModelOpen(false);
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'filename', headerName: 'File Name', width: 250 },
        { field: 'total_uploaded', headerName: 'Total Uploaded', width: 250 },
        { field: 'total_processed', headerName: 'Total Processed', width: 250 },
        {
            field: 'group',
            headerName: 'Group',
            renderCell: (params) => {
                return <Button onClick={() => handleModalOpen(params.row.id)}>Group</Button>
            }
        }
    ];

    const groupColumns = [
        { field: 'id', headerName: 'Id'},
        { field: 'group_name', headerName: 'Group Name'},
        { field: 'total', headerName: 'Total'},
        { 
            field: 'show', 
            headerName: 'Show',
            renderCell: params => {
                return <Link to={`/file/data/${params.row.id}`}><Button>Show</Button></Link>
            }
        },
    ]
    const [groupRows, setGroupRows] = useState([
        { id: 1, group_name: 'simple_1', total: 100 },
        { id: 2, group_name: 'simple_2', total: 8 }
    ])
    const [rows, setRows] = useState([
        { id: 1, filename: "43627342jjfdh.csv", total_uploaded: 110, total_processed: 108},
        { id: 2, filename: "574387294jjdsf.csv", total_uploaded: 110, total_processed: 108},
        { id: 3, filename: "432423543543jlsdfs.csv", total_uploaded: 110, total_processed: 104},
        { id: 4, filename: "4543543543fsifwioerw.csv", total_uploaded: 110, total_processed: 108},
    ])
    useEffect(() => {
        callApi(routes.allFiles).then(response => {
            setRows(response)
        })
    }, [])
    return <div>
        
        <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Group Information
                </Typography>
                <div style={{ height: 300, width: '80%' }}>
                    <DataGrid
                        rows={groupRows}
                        columns={groupColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Box>
        </Modal>
        <h1>Data List</h1>
        <Breadcrumb page="User > List" />
        <div style={{ height: 300, width: '100%', margin: '0 auto' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>

    </div>;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
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

export default DataList;
