import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeUp, faBullseye } from '@fortawesome/free-solid-svg-icons';


const ToolBar = ({ audioRef }) => {
    const audioOn = () => {
        audioRef.current.muted = false;
    };

    const audioOff = () => {
        audioRef.current.muted = true;
    };

    return (
        <div className='ToolBar'>
            {audioRef.current.muted ? <FontAwesomeIcon icon={faVolumeMute} onClick={audioOn} /> : <FontAwesomeIcon icon={faVolumeUp} onClick={audioOff} />}
            <Link to='/scores' ><FontAwesomeIcon icon={faBullseye} /></Link>
        </div>
    );
}


export default ToolBar;