import React from 'react';
import Sidenav from '../Components/Sidenav';
import styled from 'styled-components';
import UserList from './UserList';
import EditUser from './EditUser';
import { Route, Routes } from 'react-router-dom';
import DataList from './DataList';
import UploadFile from './UploadFile';
import AllData from './AllData';

function Dashboard({ isAdmin, setLoggedIn, setIsAdmin }) {
    return <div>
        <Sidenav isAdmin={isAdmin} setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            <BodyWrapper>
                <Routes>
                    { isAdmin && <Route path="/" element={<UserList />} /> }    
                    { isAdmin && <Route path="/user-edit/:id" element={<EditUser />} /> }
                    { !isAdmin && <Route path="/" element={<DataList />} />}
                    { !isAdmin && <Route path="/file/upload" element={<UploadFile />} />}
                    { !isAdmin && <Route path="/file/data/:id" element={<AllData />} />}
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>                
            </BodyWrapper>
        </main>
    </div>;
}

const BodyWrapper = styled.div`
    padding-top: 50px;
    padding-left: 25px;
`

export default Dashboard;
