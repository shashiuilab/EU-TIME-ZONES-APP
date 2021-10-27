import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetch from 'cross-fetch';
import TimeZone from "./TimeZone";

jest.mock('cross-fetch');
const mockTimeZonesResponse = { 
    status : 'OK',
    message: '',
    zones: [{countryCode: 'AD', countryName: 'Andorra', zoneName: 'Europe/Andorra', gmtOffset: 7200, timestamp: 1635347761},
    {countryCode: 'AL', countryName: 'Albania', zoneName: 'Europe/Tirane', gmtOffset: 7200, timestamp: 1635347761}] 
}
const mockTimeResponse = { 
    "status":"OK","message":"","countryCode":"AD","countryName":"Andorra","zoneName":"Europe\/Andorra","abbreviation":"CEST","gmtOffset":7200,"dst":"1","dstStart":1616893200,"dstEnd":1635641999,"nextAbbreviation":"CET","timestamp":1635351802,"formatted":"2021-10-27 16:23:22"
}
describe("TimeZone Component", () => {
    beforeEach(() => {
        fetch.mockResolvedValue({
            status: 200,
            json: () => (mockTimeZonesResponse),
          });
    });
    afterEach(() => {
        jest.clearAllMocks();
    })
    test('should load Timezone app', async () => {
        const { getByTestId, getByText, getAllByTestId } = render(<TimeZone />);
        expect(getByTestId("zone-selector")).toBeInTheDocument();
        expect(getByTestId("display-time")).toBeInTheDocument();
        expect(getByText(/Please select a time zone/i).selected).toBe(true);
        expect(getByTestId("display-time")).toHaveTextContent("Please select a timezone to see time");
        expect(fetch).toHaveBeenCalledTimes(1);
        await waitFor(() => {
            expect(getAllByTestId("zone-selector-options")).toHaveLength(3);
            expect(getAllByTestId("zone-selector-options")[1]).toHaveTextContent("Europe/Andorra");
        }
        );
    });
    test('should load times', async () => {
        const { getByTestId, getByText, getAllByTestId } = render(<TimeZone />);
        fetch.mockResolvedValue({
            status: 200,
            json: () => (mockTimeResponse),
          });
        await waitFor(() => {
            fireEvent.change(getByTestId('zone-selector'), { target: { value: "Europe/Andorra" } });
            expect(getByText("Europe/Andorra").selected).toBe(true);
            expect(getByTestId("display-time")).toHaveTextContent("2021-10-27 16:23:22");
        }
        );
    });
});