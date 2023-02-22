import { EventInterface } from "../models/event"
import { MinistryInterface } from "../models/ministry"

export default interface ContentType {
    cms: {
        global: {
            app_name: string, company_name: string, company_logo: string, favicon: string
            logo: { big?: string, dark?: string, default: string, light?: string }
            contact: {
                social_networks: { [key: string]: string }
                email: string,
                phone: string,
                map: string
            }
        }
        general: { date: string, time: string, home: string, days: string[], months: string[] }
        auth: {
            footer: { copyrights: string, all_rights: string }
            messages: {
                admin: { not_found: string, invalid: string, sent: string }
                user: { inactive: string, unauthorized: string, sent: string, reset: string, failure: string }
            }
            pages: {
                user: { login: { title: string, sign_in: string, email_address: string, password: string } }
                admin: {
                    login: { sign_in_to: string, sign_in: string, admin_panel: string, email_address: string, password: string, sms: string, email: string, otp_method: string }
                    verify: { enter: string, verification_code: string, continue: string, didnt_receive_code: string, resend: string }
                }
            }
        }
        backend: {
            header: { id: string, sign_out: string, no_message: string, no_notification: string, logout: string, close: string, sure_logout: string, you_have: string, messages: string, unread_message: string, unread_notification: string, unread_messages: string, unread_notifications: string, view_all_messages: string, view_all_notifications: string }
            footer: { copyright: string, all_rights: string }
            sidebar: {
                admin: string
                user: string
                menu: {
                    dashboard: { title: string }
                    notifications: { title: string }
                    admins: { title: string, add: string, index: string }
                    users: { title: string, add: string, index: string }
                    roles: { title: string, add: string, index: string }
                    features: { title: string, add: string, index: string }
                    appointments: { title: string, add: string, index: string }
                    clients: { title: string, add: string, index: string }
                    commercials: { title: string, add: string, index: string }
                    invoices: { title: string, add: string, index: string }
                    products: { title: string, add: string, index: string }
                    shops: { title: string, add: string, index: string }
                    stops: { title: string, add: string, index: string }
                    methods: { title: string, add: string, index: string }
                    transactions: { title: string, add: string, index: string }
                    cms: { title: string, global: string, general: string, auth: string, backend: string, frontend: string }
                    settings: { title: string, cms: string, language: string }
                }
            }
            components: {
                form: { save: string, save_add: string, selected_file: string, active: string, inactive: string, incoming: string, done: string, cancelled: string, pending: string, completed: string }
                list: {
                    action: string, all: string, first: string, last: string, loading: string, print: string, pdf: string, csv: string, excel: string, search: string, see: string, show: string, sl: string, showing: string, from: string
                    entries: { singular: string, plural: string }
                }
            }
            messages: {
                admins: { not_found: string, created: string, updated: string, deleted: string }
                users: { not_found: string, created: string, updated: string, deleted: string }
                subjects: { not_found: string, created: string, updated: string, deleted: string }
                roles: { not_found: string, created: string, updated: string, deleted: string }
                features: { not_found: string, created: string, updated: string, deleted: string }
                clients: { not_found: string, created: string, updated: string, deleted: string }
                commercials: { not_found: string, created: string, updated: string, deleted: string }
                invoices: { not_found: string, created: string, updated: string, deleted: string }
                products: { not_found: string, created: string, updated: string, deleted: string }
                shops: { not_found: string, created: string, updated: string, deleted: string }
                stops: { not_found: string, created: string, updated: string, deleted: string }
                methods: { not_found: string, created: string, updated: string, deleted: string }
                transactions: { not_found: string, created: string, updated: string, deleted: string }
                appointments: { not_found: string, created: string, updated: string, deleted: string }
                notifications: { not_found: string }
                cms: { not_found: string, updated: string }
            }
            pages: {
                dashboard: {
                    admin: {
                        icon: string, title: string, subtitle: string
                        blocks: { users: string, transactions: string, clients: string, products: string }
                    }
                    user: {
                        icon: string, title: string, subtitle: string
                        blocks: { users: string, transactions: string, clients: string, products: string }
                        general_report: { title: string, subtitle: string, appointments: string, total_appointments: string }
                    }
                }
                cms: {
                    title: string, global: string, general: string, messages: string, frontend: string, components: string, backend: string, auth: string
                    form: { logo: string, app_name: string, company_name: string, company_logo: string }
                }
                admins: {
                    title: string, add: string, edit: string, index: string
                    form: { name: string, full_name: string, phone: string, password: string, password_confirmation: string, email: string, admin_photo: string, photo: string }
                }
                users: {
                    title: string, add: string, edit: string, index: string
                    form: { name: string, full_name: string, phone: string, password: string, password_confirmation: string, email: string, role: string, select_role: string, user_photo: string, photo: string }
                }
                roles: {
                    title: string, add: string, edit: string, index: string
                    form: { name: string, description: string, features: string, created_at: string, create: string, update: string, delete: string }
                }
                features: {
                    title: string, add: string, edit: string, index: string
                    form: { name: string, prefix: string, created_at: string }
                }
                clients: {
                    title: string, add: string, edit: string, index: string
                    form: { name: string, location: string, phone: string, email: string, photo: string, client_photo: string, status: string, select_status: string, joined_at: string, created_at: string }
                }
                commercials: {
                    title: string, add: string, edit: string, index: string
                    form: { name: string, username: string, password: string, password_confirmation: string, photo: string, commercial_photo: string, phone: string, locale: string, created_at: string }
                }
                invoices: {
                    title: string, add: string, edit: string, index: string
                    form: { client: string, select_client: string, number: string, shop: string, items: string, amount: string, method: string, select_method: string, status: string, select_status: string, created_at: string }
                }
                products: {
                    title: string, add: string, edit: string, index: string
                    form: { title: string, price: string, promo: string, select_promo: string, created_at: string }
                }
                shops: {
                    title: string, add: string, edit: string, index: string
                    form: { manager: string, name: string, location: string, phone: string, email: string, photo: string, shop_photo: string, status: string, select_status: string, created_at: string }
                }
                methods: {
                    title: string, add: string, edit: string, index: string
                    form: { name: string, description: string, logo: string, method_logo: string, is_active: string, select_status: string, created_at: string }
                }
                transactions: {
                    title: string, add: string, edit: string, index: string
                    form: { client: string, select_client: string, product: string, qty: string, created_at: string }
                }
                stops: {
                    title: string, add: string, edit: string, index: string
                    form: { location: string, reason: string, start_time: string, end_time: string, created_at: string }
                }
                notifications: {
                    title: string, show: string, index: string
                    form: { you_have_no_notification: string }
                }
                settings: {
                    title: string, subtitle: string
                    language: {
                        title: string
                        form: { select_language: string }
                    }
                }
                appointments: {
                    title: string, add: string, edit: string, index: string
                    form: { client: string, select_client: string, shop: string, select_shop: string, date: string, object: string, location: string, company: string, status: string, select_status: string, created_at: string }
                }
            }
        }
    }
}