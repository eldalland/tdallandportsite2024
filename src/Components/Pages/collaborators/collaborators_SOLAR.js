import React from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from '../../Navbar/Navbar';
import styles from './collaborators.module.css';
const CollaboratorsSOLAR = () => {
    const navigate = useNavigate();
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
        <div className={styles.container}>
            <div className={styles.contentbox}>
            <div>Collaborators 2006 - 2011 </div>
            <h1>FTL SOLAR</h1>
            <div>Design, Structural, Electrical, Fabrication</div>
            <ul className={styles.ul1} >
                {nameArr.map((name, index) => <li key={index}>{name}</li>)}
                </ul>
            <div className={styles.footer}><span onClick={() => navigate("/contact")}>Contact Site Administrator</span> for additional names and corrections</div>
            </div>
        </div>
        </>
    );
};

export default CollaboratorsSOLAR;