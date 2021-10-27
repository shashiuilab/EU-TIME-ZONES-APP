export const getTimeZones = async () => {
    try {
        const res = await fetch('http://api.timezonedb.com/v2.1/list-time-zone?key=XWSLLPX5RMIZ&format=json&zone=Europe/*');
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        const timeZoneList = await res.json();
        const { zones } = timeZoneList;
        return zones;
      } catch (err) {
        console.error(err);
      }
}

export const getTimeForTimeZone = async (zone) => {
    try {
        const res = await fetch(`http://api.timezonedb.com/v2/get-time-zone?key=XWSLLPX5RMIZ&format=json&by=zone&zone=${zone}`);
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        const zoneTime = await res.json();
        return zoneTime;
      } catch (err) {
        console.error(err);
      }
}