import React from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from '../../Navbar/Navbar';
import styles from './collaborators.module.css';

const CollaboratorsEZ = () => {
    const navigate = useNavigate();
    const nameArr = ['Todd Dalland', 'Nic Goldsmith', ' Denis Hector', ' Alexandr Neratoff'];
    return (
        <>
        <Navbar />
        <div className={styles.container}>
            <div className={styles.contentbox}>
            <div>Collaborators 1971 – 1977 </div>
            <h1>E-Z BUILDERS</h1>
            <div>Design, Fabrication, Installation</div>
            <ul className={styles.ul1}>
                {nameArr.map((name, index) => <li key={index}>{name}</li>)}
                </ul>
            <div className={styles.footer}>Contact<span onClick={() => navigate("/contact")}> Site Administrator</span> for additional names and corrections</div>
            </div>
        </div>
        </>
    );
};

export default CollaboratorsEZ;