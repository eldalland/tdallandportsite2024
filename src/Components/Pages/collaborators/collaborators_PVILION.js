import React from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from '../../Navbar/Navbar';
import styles from './collaborators.module.css';

const CollaboratorsPVILION = () => {
    const navigate = useNavigate();
    const nameArr = [
        'Henry Black',
        'Tim Burke',
        'Akim Chase',
        'Raymond Choi',
        'Bjork Christensen',
        'Joe Corsi',
        'Erik Dalland',
        'Todd Dalland',
        'Charlotte D’Augustine',
        'Cassidy Exum',
        'Doka Eze',
        'Julia Fowler',
        'Anthony Grigalunas',
        'Justina Johnson',
        'Cody Kubenik',
        'Kyu Chan Kwak',
        'Jordan Lerner',
        'Robert Lerner',
        'Liat Levin',
        'Hannah Lupico',
        'C’iera Morales',
        'Mike Ronca',
        'Nick Ross',
        'Sean Russo',
        'Alex Scheurman',
        'Colin Touhey',
        'Vera Voropaeva',
        'Alvin Watson',
        'Zach Wu'
    ];
    return (
        <>
        <Navbar />
        <div className={styles.container}>
            <div className={styles.contentbox}>
            <div>Collaborators 2011 - 2024 </div>
            <h1>PVILION</h1>
            <div>Design, Structural, Electrical, Mechanical, Fabrication</div>
            <ul className={styles.ul2}>
                {nameArr.map((name, index) => <li key={index}>{name}</li>)}
                </ul>
            <div className={styles.footer}><span onClick={() => navigate("/contact")}>Contact Site Administrator</span> for additional names and corrections</div>
            </div>
        </div>
        </>
    );
};

export default CollaboratorsPVILION;