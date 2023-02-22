import { Method } from "../models";
import { MethodInterface } from "../models/method";

const methods: MethodInterface[] = [
    { name: "Orange Money", description: "Faire un paiement par Orange Money", isActive: true },
    { name: "Cash", description: "Faire un paiement en cash", isActive: true },
]

export default async function methodsSeed() {
    await Method.insertMany(methods)
}