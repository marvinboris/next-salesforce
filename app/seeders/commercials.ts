import bcrypt from 'bcryptjs';

import { Commercial } from "../models";
import { CommercialInterface } from "../models/commercial";

const commercials: CommercialInterface[] = [
    { name: 'Boris Marvins', username: 'marvinboris', phone: '237655588688', password: '12345' },
]

export default async function commercialsSeed() {
    const data = await Promise.all(commercials.map(async commercial => {
        const password = await bcrypt.hash(commercial.password, 12)
        return { ...commercial, password }
    }))
    await Commercial.insertMany(data)
}