import { Stop } from "../models";
import { StopInterface } from "../models/stop";

const stops: StopInterface[] = [
    { location: 'Rue alfred Saker , 25 Ave...', reason: 'Trafic Jam', startTime: new Date(2023, 9, 12, 14, 9, 12), endTime: new Date(2023, 9, 12, 15, 24, 56) },
    { location: 'Douala, CM, Bonanjo Avenue n...', reason: 'Family reasons', startTime: new Date(2023, 9, 12, 16, 29, 34), endTime: new Date(2023, 9, 12, 16, 56, 23) },
]

export default async function stopsSeed() {
    await Stop.insertMany(stops)
}