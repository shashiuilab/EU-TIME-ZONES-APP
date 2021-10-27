import React, { useState, useEffect , useRef } from 'react';
import fetch from 'cross-fetch';
import ZoneSelector from './ZoneSelector';
import DisplayTime from './DisplayTime';
import { DEFAULT_DISPLAY_TEXT } from  '../constants';
import styled from 'styled-components';

const TimeZoneContainer = styled.div`
        display: flex;
        flex-direction: column;
        width: 50%;
        margin: 2rem auto;
    `

function TimeZone(props) {
    const [timeZones, setTimeZones] = useState([]);
    const [selectedZone, setSelectedZone] = useState(undefined);
    const [zoneTime, setZoneTime] = useState(undefined);
    const selectRef = useRef();
    useEffect(() => {
        (async () => {
            try {
              const res = await fetch('http://api.timezonedb.com/v2.1/list-time-zone?key=XWSLLPX5RMIZ&format=json&zone=Europe/*');
              if (res.status >= 400) {
                throw new Error("Bad response from server");
              }
              const timeZoneList = await res.json();
              const { zones } = timeZoneList;
              setTimeZones(zones);
            } catch (err) {
              console.error(err);
            }
          })();
          return () => {
            setTimeZones([]);
          }
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            if(selectRef.current.value !== "Please select a time zone") {
                getTimeForTimeZone(selectRef.current.value);
            }
         }, 5000);
         return () => {
            clearInterval(interval);
            setZoneTime(undefined);
          }
    }, []);
    const getTimeForTimeZone = async (zone) => {
        setSelectedZone(zone);
        try {
            const res = await fetch(`http://api.timezonedb.com/v2/get-time-zone?key=XWSLLPX5RMIZ&format=json&by=zone&zone=${zone}`);
            if (res.status >= 400) {
              throw new Error("Bad response from server");
            }
            const zoneTime = await res.json();
            setZoneTime(zoneTime.formatted);
          } catch (err) {
            console.error(err);
          }
    };
    return (
        <TimeZoneContainer>
            <h1>EU-TIMEZONES</h1>
            <ZoneSelector change={ getTimeForTimeZone } refVal={ selectRef } timeZones={ timeZones } selectedZone={selectedZone}/>
            <DisplayTime zoneTime={ zoneTime ? zoneTime :  DEFAULT_DISPLAY_TEXT }/>
        </TimeZoneContainer>
    );
}

export default TimeZone;