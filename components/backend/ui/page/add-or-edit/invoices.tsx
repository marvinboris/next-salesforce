import { BanknotesIcon, EyeIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "@/app/contexts/content"
import { resourceIcon } from "@/app/helpers/utils"
import { useAppSelector } from "@/app/hooks"
import { ClientInterface } from "@/app/models/client"
import { InvoiceStatus } from "@/app/models/invoice"
import { MethodInterface } from "@/app/models/method"
import ManagerResourceManageStateType from "@/app/types/account/manager/add-or-edit/state"

import Input from "@/components/backend/ui/form/input"
import Select from "@/components/backend/ui/form/select"
import * as utility from '@/components/backend/ui/utils'

import { selectBackend } from "@/features/backend/backendSlice"

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }

const initialState = {
    client: '',
    method: '',
    amount: '',
    status: InvoiceStatus.Pending.toString(),

    add: false,
}

export default function ManageAddOrEditInvoices({ edit }: Props) {
    const resource = 'invoices'
    const singular = 'invoice'

    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { form: { pending, completed, cancelled } }, pages: { [resource]: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)

    const clients = backend && backend.clients ? (backend.clients as (ClientInterface & { _id: string })[]) : []
    const clientsOptions = clients?.map(client => <option key={JSON.stringify(client)} value={client.id}>{client.name}</option>)
    const methods = backend && backend.methods ? (backend.methods as (MethodInterface & { _id: string })[]) : []
    const methodsOptions = methods?.map(method => <option key={JSON.stringify(method)} value={method.id}>{method.name}</option>)

    return <ManagerAddOrEdit edit={edit} resource={resource} singular={singular} initialState={initialState} state={state} setState={setState}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Select icon={resourceIcon('clients')} label={form.client} onChange={inputChangeHandler} value={state.client as string} name="client" required validation={{ required: true }}>
                        <option>{form.select_client}</option>
                        {clientsOptions}
                    </Select>
                    <Select icon={resourceIcon('methods')} label={form.method} onChange={inputChangeHandler} value={state.method as string} name="method" required validation={{ required: true }}>
                        <option>{form.select_method}</option>
                        {methodsOptions}
                    </Select>
                    <Input icon={BanknotesIcon} onChange={inputChangeHandler} value={state.amount as string} name="amount" required validation={{ required: true, isNumeric: true }} label={form.amount} />
                    <Select icon={EyeIcon} label={form.status} onChange={inputChangeHandler} value={state.status as string} name="status" required validation={{ required: true }}>
                        <option>{form.select_status}</option>
                        <option value={InvoiceStatus.Pending}>{pending}</option>
                        <option value={InvoiceStatus.Completed}>{completed}</option>
                        <option value={InvoiceStatus.Cancelled}>{cancelled}</option>
                    </Select>
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}