import {makeAutoObservable} from "mobx";
import Papa from "papaparse";

class StationsStore {
    stations: Station[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchStations() {
        if (this.stations.length > 0) {
            return;
        }

        Papa.parse("https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv", {
            download: true,
            header: true,
            delimiter: ";",
            newline: "\r\n",
            complete: (result) => {
                let parsedStations: Station[] = result.data.map((item: any) => ({
                    id: item.HALTESTELLEN_ID,
                    type: item.TYP,
                    diva: item.DIVA,
                    name: item.NAME,
                    gemeinde: item.GEMEINDE,
                    gemeindeId: item.GEMEINDE_ID,
                    latitude: item.WGS84_LAT,
                    longitude: item.WGS84_LON,
                    stand: item.STAND,
                }));
                parsedStations = parsedStations.filter((station) => station.id !== undefined && station.id !== '');

                this.setStations(parsedStations);
            },
        });
    }

    addStation(newStation: Station) {
        this.stations.push(newStation);
    }

    setStations(stations: Station[]) {
        this.stations = stations;
    }

    getStations() {
        return this.stations.slice().sort((a, b) => {
            const nameA = a.name ? a.name.toLowerCase() : '';
            const nameB = b.name ? b.name.toLowerCase() : '';
            return nameA.localeCompare(nameB);
        });
    }
}

export const stationsStore = new StationsStore();
