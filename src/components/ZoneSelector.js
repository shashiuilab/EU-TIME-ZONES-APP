import React from 'react';
import { DEFAULT_SELECT_TEXT } from '../constants';
import styled from 'styled-components';

const TimeZoneSelector = styled.select`
        font-size: 2rem;
    `
function ZoneSelector({ change, refVal, timeZones, selectedZone}) {
    return (
        <TimeZoneSelector value={selectedZone} className="form-select" aria-label="Time Zone Selector" data-testid="zone-selector" name="zone" onChange={ (e) => change(e.target.value) } ref={ refVal }>
            <option data-testid="zone-selector-options" value={ DEFAULT_SELECT_TEXT }>{ DEFAULT_SELECT_TEXT }</option>
            {timeZones.map((timeZone, index) => {
                return <option data-testid="zone-selector-options" key={index} value={timeZone.zoneName}>{ timeZone.zoneName }</option>;
            })}
        </TimeZoneSelector>
    );
}

export default ZoneSelector;