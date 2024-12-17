import React from 'react';
import Navbar from '../../Navbar/Navbar';

const CollaboratorsPVILION = () => {
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
        <div>
            <div>Collaborators 2011 - 2024 </div>
            <h1>PVILION</h1>
            <div>Design, Structural, Electrical, Fabrication</div>
            <ul >
                {nameArr.map((name, index) => <li key={index}>{name}</li>)}
                </ul>
            <div>Contact Site Administrator for missing names and corrections</div>
        </div>
        </>
    );
};

export default CollaboratorsPVILION;