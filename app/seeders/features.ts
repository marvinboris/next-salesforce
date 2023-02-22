import { Feature } from "../models";
import { FeatureInterface } from "../models/feature";

const features: FeatureInterface[] = [
    { name: 'CMS', prefix: 'cms' },
    { name: 'Users', prefix: 'users' },
    { name: 'Roles', prefix: 'roles' },
    { name: 'Images', prefix: 'images' },
    { name: 'Features', prefix: 'features' },
    { name: 'Appointments', prefix: 'appointments' },
    { name: 'Clients', prefix: 'clients' },
    { name: 'Commercials', prefix: 'commercials' },
    { name: 'Invoices', prefix: 'invoices' },
    { name: 'Products', prefix: 'products' },
    { name: 'Methods', prefix: 'methods' },
    { name: 'Shops', prefix: 'shops' },
    { name: 'Stops', prefix: 'stops' },
    { name: 'Transactions', prefix: 'transactions' },
]

export default async function featuresSeed() {
    await Feature.insertMany(features)
}