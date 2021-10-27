import React from 'react';
import styled from 'styled-components';

const Timer = styled.p`
        color: #ffffff;
        font-weight: bold;
        margin: 2rem;
        font-size: 2rem;
    `
    
function DisplayTime( { zoneTime }) {
    return (
        <Timer data-testid="display-time">{ zoneTime }</Timer>
    );
}

export default DisplayTime;