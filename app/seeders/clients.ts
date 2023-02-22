import { Client } from "../models";
import { ClientInterface, ClientStatus } from "../models/client";

const clients: ClientInterface[] = [
    { email: 'demo@contact.com', location: 'Santa Lucia - DLA, Cite Cic', name: 'Joseph Kamdem', phone: '(237) 698 90 11 22 33', joinedAt: new Date(2023, 3, 10), photo: 'joseph-kamdem.png' },
    { email: 'demo@contact.com', location: 'Santa Lucia - DLA, Cite Cic', name: 'Chisela Mariolena', phone: '(237) 698 90 11 22 33', joinedAt: new Date(2023, 3, 10), photo: 'chisela-mariolena.png', status: ClientStatus.Inactive },
    { email: 'demo@contact.com', location: 'Santa Lucia - DLA, Cite Cic', name: 'Minetosina Bond', phone: '(237) 698 90 11 22 33', joinedAt: new Date(2023, 3, 10), photo: 'minetosina-bond.png' },
    { email: 'demo@contact.com', location: 'Santa Lucia - DLA, Cite Cic', name: 'Mr Jean Clenon M.', phone: '(237) 698 90 11 22 33', joinedAt: new Date(2023, 3, 10) },
    { email: 'demo@contact.com', location: 'Santa Lucia - DLA, Cite Cic', name: 'James Howare', phone: '(237) 698 90 11 22 33', joinedAt: new Date(2023, 3, 10) },
    { email: 'demo@contact.com', location: 'Santa Lucia - DLA, Cite Cic', name: 'Calisto Miea', phone: '(237) 698 90 11 22 33', joinedAt: new Date(2023, 3, 10) },
    { email: 'demo@contact.com', location: 'Santa Lucia - DLA, Cite Cic', name: 'Perrera Consalo', phone: '(237) 698 90 11 22 33', joinedAt: new Date(2023, 3, 10) },
    { email: 'demo@contact.com', location: 'Santa Lucia - DLA, Cite Cic', name: 'Mr. John Doe', phone: '(237) 698 90 11 22 33', joinedAt: new Date(2023, 3, 10) },
    { email: 'demo@contact.com', location: 'Santa Lucia - DLA, Cite Cic', name: 'Alvina Doniato', phone: '(237) 698 90 11 22 33', joinedAt: new Date(2023, 3, 10) },
    { email: 'demo@contact.com', location: 'Santa Lucia - DLA, Cite Cic', name: 'Kamdem Geraldo', phone: '(237) 698 90 11 22 33', joinedAt: new Date(2023, 3, 10) },
    { email: 'demo@contact.com', location: 'Santa Lucia - DLA, Cite Cic', name: 'Mme Hernestine H', phone: '(237) 698 90 11 22 33', joinedAt: new Date(2023, 3, 10) },
    { email: 'demo@contact.com', location: 'Santa Lucia - DLA, Cite Cic', name: 'Eulice Camrelo', phone: '(237) 698 90 11 22 33', joinedAt: new Date(2023, 3, 10) },
    { email: 'demo@contact.com', location: 'Santa Lucia - DLA, Cite Cic', name: 'Jarius Delamarei', phone: '(237) 698 90 11 22 33', joinedAt: new Date(2023, 3, 10) },
]

export default async function clientsSeed() {
    await Client.insertMany(clients)
}