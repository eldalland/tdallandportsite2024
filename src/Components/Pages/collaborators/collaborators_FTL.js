import React from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from '../../Navbar/Navbar';
import styles from './collaborators.module.css';

const CollaboratorsFTL = () => {
    const navigate = useNavigate();
    const nameArr = [
        'Luz Amaya',
        'Sam Armijos',
        'Ronn Basquette',
        'Tomer Bengal',
        'Sarah Bonnemaison',
        'David Bott',
        'Vivian Broderick',
        'Megan Brothers',
        'David Burke',
        'Ana Cajiao',
        'Gay Canough',
        'Evelyn Carrion',
        'Andre Chaszar',
        'Judy Choi',
        'Dana Cook',
        'Dirk Cos',
        'Julian Cripps',
        'Tim Culvahouse',
        'Ross Dalland',
        'Arnaud Delugeard',
        'Evangeline Denny',
        'Nicola Derycker',
        'Morgan Fleming',
        'Andrew Formicella',
        'Jane Fu',
        'Sandra Garvin',
        'Tina Geiger',
        'Geza Gergo',
        'Irvin Glassman',
        'Jenny Gonzalez',
        'Mercedes Gonzalez',
        'Ted Happold',
        'Peter Hepple',
        'Matthew Hilyard',
        'Isamu Kanda',
        'Julian King',
        'Mary Korotkova',
        'Sameer Kumar',
        'Tom LaGreca',
        'Ephraim Lazar',
        'Haewon Lee',
        'Bill Lenart',
        'Lilian Leone',
        'Ian Liddell',
        'Sui Ming Louie',
        'Ivan Luk',
        'Emily McDonald',
        'Derrick McDougald',
        'Tamer Onay',
        'Amy Palmer',
        'Angus Palmer',
        'Dawood Pandoor',
        'Sital Patel',
        'Sharon Pell',
        'Amedeo Perlas',
        'Uta Prochnow',
        'Eddie Pugh',
        'Nestor Rave',
        'Ali-Reza Razavi',
        'Wayne Rendely',
        'Robert Riley',
        'Paul Romain',
        'Robin Ross',
        'Joe Schedlebauer',
        'Richard Schoen',
        'Craig Schwitter',
        'David Shih',
        'Eric Smith',
        'Gabriel So',
        'Ashish Soni',
        'Astrid Steinberger',
        'Gisela Stromeyer',
        'Ali Tayar',
        'Leenete Tazhicherry',
        'Lucia Tschen',
        'Maria Vrontissi',
        'Suzanne Waller',
        'Belinda Watts',
        'Marissa Wong',
        'Inson Wood',
        'Numer Ybanez',
        'Irene Yim'
      ];
    return (
        <>
        <Navbar />
        <div className={styles.container}>
            <div className={styles.contentbox}>
            <div>Collaborators 1977 – 2006 </div>
            <div className={styles.company}>FUTURE TENTS LTD, FTL DESIGN ENGINEERING STUDIO, FTL HAPPOLD</div>
            <div>Design, Structural</div>
            <ul className={styles.ul3}>
                {nameArr.map((name, index) => <li key={index}>{name}</li>)}
                </ul>
            <div className={styles.footer}><span onClick={() => navigate("/contact")}>Contact Site Administrator</span> for missing names and corrections</div>
            </div>
        </div>
        </>
    );
};

export default CollaboratorsFTL;