import dotenv from 'dotenv'
import mongoose from "mongoose";

import { Appointment, Commercial, Client, Feature, Invoice, Method, Product, Role, Shop, Stop, Transaction, User } from './app/models';

import appointmentsSeed from './app/seeders/appointments';
import clientsSeed from './app/seeders/clients';
import commercialsSeed from './app/seeders/commercials';
import featuresSeed from "./app/seeders/features";
import invoicesSeed from './app/seeders/invoices';
import methodsSeed from './app/seeders/methods';
import productsSeed from './app/seeders/products';
import rolesSeed from "./app/seeders/roles";
import shopsSeed from "./app/seeders/shops";
import stopsSeed from "./app/seeders/stops";
import transactionsSeed from './app/seeders/transactions';
import usersSeed from "./app/seeders/users";

dotenv.config({ path: './.env.local' })

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI!)
    .catch(error => {
        console.log(error.message)
        process.exit(1)
    })
    .then(async () => {
        console.log('Connected for seeding DB.')

        if (process.argv[2] === '-d') await destroyData()
        else await importData()

        mongoose.disconnect()
    })

const importData = async () => {
    try {
        console.log('Shop: deleting...')
        await Shop.deleteMany()
        console.log('Shop: seeding...')
        await shopsSeed()

        console.log('Method: deleting...')
        await Method.deleteMany()
        console.log('Method: seeding...')
        await methodsSeed()

        console.log('Client: deleting...')
        await Client.deleteMany()
        console.log('Client: seeding...')
        await clientsSeed()

        console.log('Appointment: deleting...')
        await Appointment.deleteMany()
        console.log('Appointment: seeding...')
        await appointmentsSeed()

        console.log('Feature: deleting...')
        await Feature.deleteMany()
        console.log('Feature: seeding...')
        await featuresSeed()

        console.log('Commercial: deleting...')
        await Commercial.deleteMany()
        console.log('Commercial: seeding...')
        await commercialsSeed()

        console.log('Invoice: deleting...')
        await Invoice.deleteMany()
        console.log('Invoice: seeding...')
        await invoicesSeed()

        console.log('Product: deleting...')
        await Product.deleteMany()
        console.log('Product: seeding...')
        await productsSeed()

        console.log('Role: deleting...')
        await Role.deleteMany()
        console.log('Role: seeding...')
        await rolesSeed()

        console.log('Stop: deleting...')
        await Stop.deleteMany()
        console.log('Stop: seeding...')
        await stopsSeed()

        console.log('Transaction: deleting...')
        await Transaction.deleteMany()
        console.log('Transaction: seeding...')
        await transactionsSeed()

        console.log('User: deleting...')
        await User.deleteMany()
        console.log('User: seeding...')
        await usersSeed()

        console.log("DB seeded")
        process.exit(0)
    } catch (error) {
        console.log("DB not seeded", error)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Appointment.deleteMany()
        await Client.deleteMany()
        await Feature.deleteMany()
        await Commercial.deleteMany()
        await Invoice.deleteMany()
        await Method.deleteMany()
        await Product.deleteMany()
        await Shop.deleteMany()
        await Role.deleteMany()
        await Stop.deleteMany()
        await Transaction.deleteMany()
        await User.deleteMany()

        console.log("Data destroyed")
        process.exit(0)
    } catch (error) {
        console.log("Data not destroyed", error)
        process.exit(1)
    }
}