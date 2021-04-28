import React from 'react';
import '../assets/css/square.css';

const Square = (props) => {
    return(
        <div className='square'  onMouseEnter={props.handleHover} id={props.id}></div>
    )
 }

 export default Square;