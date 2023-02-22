import { Shop } from "../models";
import { ShopInterface } from "../models/shop";

const shops: ShopInterface[] = [
    { email: 'demo@contact.com', location: 'DLA, Cite Cic', manager: 'Joseph Kamdem', name: 'Santa Lucia', phone: '(237) 698 90 11 22 33', photo: 'fikri-rasyid-ezeC8-clZSs-unsplash.jpg' },
    { email: 'demo@contact.com', location: 'DLA, Bonamoussadi', manager: 'Joseph Kamdem', name: 'Santa Lucia', phone: '(237) 698 90 11 22 33', photo: 'nrd-D6Tu_L3chLE-unsplash.jpg' },
    { email: 'demo@contact.com', location: 'DLA, Bonamoussadi', manager: 'Joseph Kamdem', name: 'Mahima', phone: '(237) 698 90 11 22 33', photo: 'nrd-D6Tu_L3chLE-unsplash.jpg' },
    { email: 'demo@contact.com', location: 'DLA, Bonamoussadi', manager: 'Joseph Kamdem', name: 'Sesam Market', phone: '(237) 698 90 11 22 33', photo: 'nrd-D6Tu_L3chLE-unsplash.jpg' },
    { email: 'demo@contact.com', location: 'DLA, Bonamoussadi', manager: 'Joseph Kamdem', name: 'Carrefour Market', phone: '(237) 698 90 11 22 33', photo: 'nrd-D6Tu_L3chLE-unsplash.jpg' },
    { email: 'demo@contact.com', location: 'DLA, Bonamoussadi', manager: 'Joseph Kamdem', name: 'Meno', phone: '(237) 698 90 11 22 33', photo: 'nrd-D6Tu_L3chLE-unsplash.jpg' },
]

export default async function shopsSeed() {
    await Shop.insertMany(shops)
}