import React from 'react';
import '../assets/css/infoBlock.css';

const InfoBlock = (props) => {
    return(
        <div className='info-block' id={props.id}>
            <span>{props.text}</span>
        </div>
    )
 }

 export default InfoBlock;