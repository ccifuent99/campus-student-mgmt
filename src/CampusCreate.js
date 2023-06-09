import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { _createCampus } from './store';
import { useNavigate } from 'react-router-dom';


const CampusCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // testing
    
    const [name, newName] = useState('');
    const [address, newAddress] = useState('');
    const [detail, newDetail] = useState('');
    // const [rank, newRank] = useState('');
    const [imageURL, newImage] = useState('');
    const [campusId, updatedCampus] = useState('');
    
        
    
    
    const save = (ev) => {
        ev.preventDefault();
        dispatch(_createCampus({name, address,detail}, navigate));
    };
    
    return (
            <div id = 'col2'>
                <h1> New Campus Registration </h1>
                <form onSubmit={save}>
                    <input
                        placeholder= 'Campus Name'
                        value = {name}
                        onChange={ev => newName(ev.target.value)}
                        required ={true}
                    />
                    <input
                        placeholder= 'Address'
                        value = {address}
                        onChange={ev => newAddress(ev.target.value)}
                        required ={true}
                    />
                    <input
                        placeholder= 'Description'
                        value = {detail}
                        onChange={ev => newDetail(ev.target.value)}
                    />
                    <input
                        placeholder= 'Upload a Photo! Paste URL.'
                        value = {imageURL}
                        onChange={ev => newImage(ev.target.value)}
                    />
                    <button disabled={!name || !address}> Register </button>
                </form>
            </div>
        );
};

export default CampusCreate;