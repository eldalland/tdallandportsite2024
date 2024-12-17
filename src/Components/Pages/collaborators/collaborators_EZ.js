import React from 'react';
import Navbar from '../../Navbar/Navbar';

const CollaboratorsEZ = () => {
    const nameArr = ['Todd Dalland', 'Nic Goldsmith', ' Denis Hector', ' Alexandr Neratoff'];
    return (
        <>
        <Navbar />
        <div>
            <div>Collaborators 1971 – 1977 </div>
            <h1>E-Z BUILDERS</h1>
            <div>Design, Fabrication, Installation</div>
            <ul >
                {nameArr.map((name, index) => <li key={index}>{name}</li>)}
                </ul>
            <div>Contact Site Administrator for missing names and corrections</div>
        </div>
        </>
    );
};

export default CollaboratorsEZ;