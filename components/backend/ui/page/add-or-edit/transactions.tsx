import { ChangeEvent, useEffect, useState } from "react"

import { useContentContext } from "@/app/contexts/content"
import { resourceIcon } from "@/app/helpers/utils"
import { useAppSelector } from "@/app/hooks"
import { ClientInterface } from "@/app/models/client"
import { ProductInterface } from "@/app/models/product"
import ManagerResourceManageStateType from "@/app/types/account/manager/add-or-edit/state"

import Input from "@/components/backend/ui/form/input"
import Select from "@/components/backend/ui/form/select"
import * as utility from '@/components/backend/ui/utils'

import { selectBackend } from "@/features/backend/backendSlice"

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }

const initialState = {
    client: '',

    add: false,
}

export default function ManageAddOrEditSubscribers({ edit }: Props) {
    const resource = 'transactions'
    const singular = 'transaction'

    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { pages: { [resource]: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)

    const clients = backend && backend.clients ? (backend.clients as (ClientInterface & { _id: string })[]) : []
    const clientsOptions = clients?.map(client => <option key={JSON.stringify(client)} value={client._id}>{client.name}</option>)
    
    const products = backend && backend.products ? (backend.products as (ProductInterface & { _id: string })[]) : []
    const productsOptions = products?.map(product => <option key={JSON.stringify(product)} value={product._id}>{product.title}</option>)

    return <ManagerAddOrEdit edit={edit} resource={resource} singular={singular} initialState={initialState} state={state} setState={setState}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Select icon={resourceIcon('clients')} label={form.client} onChange={inputChangeHandler} value={state.client as string} name="client" required validation={{ required: true }}>
                        <option>{form.select_client}</option>
                        {clientsOptions}
                    </Select>
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}