import { Model, model, models } from 'mongoose'

import { AdminInterface, AdminSchema } from './admin'
import { AppointmentInterface, AppointmentSchema } from './appointment'
import { ClientInterface, ClientSchema } from './client'
import { CommercialInterface, CommercialSchema } from './commercial'
import { FeatureInterface, FeatureSchema } from './feature'
import { InvoiceInterface, InvoiceSchema } from './invoice'
import { MethodInterface, MethodSchema } from './method'
import { ProductInterface, ProductSchema } from './product'
import { RoleInterface, RoleSchema } from './role'
import { ShopInterface, ShopSchema } from './shop'
import { StopInterface, StopSchema } from './stop'
import { TransactionInterface, TransactionSchema } from './transaction'
import { UserInterface, UserSchema } from './user'

export const Shop = models.Shop as Model<ShopInterface> || model<ShopInterface>("Shop", ShopSchema)
export const Method = models.Method as Model<MethodInterface> || model<MethodInterface>("Method", MethodSchema)
export const Client = models.Client as Model<ClientInterface> || model<ClientInterface>("Client", ClientSchema)
export const Appointment = models.Appointment as Model<AppointmentInterface> || model<AppointmentInterface>("Appointment", AppointmentSchema)
export const Feature = models.Feature as Model<FeatureInterface> || model<FeatureInterface>("Feature", FeatureSchema)
export const Commercial = models.Commercial as Model<CommercialInterface> || model<CommercialInterface>("Commercial", CommercialSchema)
export const Invoice = models.Invoice as Model<InvoiceInterface> || model<InvoiceInterface>("Invoice", InvoiceSchema)
export const Product = models.Product as Model<ProductInterface> || model<ProductInterface>("Product", ProductSchema)
export const Role = models.Role as Model<RoleInterface> || model<RoleInterface>("Role", RoleSchema)
export const Stop = models.Stop as Model<StopInterface> || model<StopInterface>("Stop", StopSchema)
export const Transaction = models.Transaction as Model<TransactionInterface> || model<TransactionInterface>("Transaction", TransactionSchema)
export const User = models.User as Model<UserInterface> || model<UserInterface>("User", UserSchema)
export const Admin = models.Admin as Model<AdminInterface> || model<AdminInterface>("Admin", AdminSchema)
