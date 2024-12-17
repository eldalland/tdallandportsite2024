import React from 'react';
import Navbar from '../../Navbar/Navbar';

const CollaboratorsSOLAR = () => {
    const nameArr = [
        'Cree Crawford',
        'Jack Crosby',
        'Todd Dalland',
        'Bill Kirksey',
        'Robert Lerner',
        'Dana Panzer',
        'Shiree Sanchez',
        'Jeremy Saxton',
        'Tony Saxton'
    ];
    return (
        <>
        <Navbar />
        <div>
            <div>Collaborators 2006 - 2011 </div>
            <h1>FTL SOLAR</h1>
            <div>Design, Structural, Electrical, Fabrication</div>
            <ul >
                {nameArr.map((name, index) => <li key={index}>{name}</li>)}
                </ul>
            <div>Contact Site Administrator for missing names and corrections</div>
        </div>
        </>
    );
};

export default CollaboratorsSOLAR;