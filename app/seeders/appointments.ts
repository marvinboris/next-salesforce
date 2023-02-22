import { Appointment, Client, Shop } from "../models";
import { AppointmentInterface, AppointmentStatus } from "../models/appointment";

const appointments: AppointmentInterface[] = [
    { company: 'Chococam Dla', date: new Date(2023, 10, 18), location: 'DLA - Bonamoussadi, face...', object: 'Stock replenish' },
    { company: 'Fashion Bestifier', date: new Date(2023, 10, 16), location: 'DLA - Bonanjo messapresse...', object: 'Stock replenish', status: AppointmentStatus.Done },
    { company: 'Fashion Bestifier', date: new Date(2023, 10, 14), location: 'DLA - Bonanjo messapresse...', object: 'Stock replenish', status: AppointmentStatus.Cancelled },
    { company: 'Fashion Bestifier', date: new Date(2023, 10, 12), location: 'DLA - Bonanjo messapresse...', object: 'Stock replenish', status: AppointmentStatus.Done },
    { company: 'Fashion Bestifier', date: new Date(2023, 10, 9), location: 'DLA - Bonapriso Orange cm..', object: 'Goods return', status: AppointmentStatus.Done },
    { company: 'Fashion Bestifier', date: new Date(2023, 10, 7), location: 'DLA - Bonaberi Ndobo...', object: 'Business Meeting', status: AppointmentStatus.Cancelled },
    { company: 'SABC', date: new Date(2023, 10, 18), location: 'DLA - Ndokoti Brasserie', object: 'Stock replenish' },
]

export default async function appointmentsSeed() {
    const data = await Promise.all(appointments.map(async (appointment, index) => {
        const client = await Client.findOne({ name: ['Mr Jean Clenon M.', 'Joseph Kamdem', 'James Howare', 'Calisto Miea', 'Joseph Kamdem', 'Calisto Miea', 'Perrera Consalo'][index] })
        const shop = await Shop.findOne({ name: ['Mahima', 'Santa Lucia', 'Sesam Market', 'Carrefour Market', 'Santa Lucia', 'Carrefour Market', 'Meno'][index] })
        return { ...appointment, client, shop }
    }))
    await Appointment.insertMany(data)
}