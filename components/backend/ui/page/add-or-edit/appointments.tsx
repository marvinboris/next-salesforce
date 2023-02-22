import { BuildingOffice2Icon, ClipboardDocumentListIcon, EyeIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useEffect, useState } from "react"

import { useContentContext } from "@/app/contexts/content"
import { resourceIcon } from "@/app/helpers/utils"
import { useAppSelector } from "@/app/hooks"
import { AppointmentStatus } from "@/app/models/appointment"
import { ClientInterface } from "@/app/models/client"
import { ShopInterface } from "@/app/models/shop"
import ManagerResourceManageStateType from "@/app/types/account/manager/add-or-edit/state"

import Input from "@/components/backend/ui/form/input"
import Select from "@/components/backend/ui/form/select"
import * as utility from '@/components/backend/ui/utils'

import { selectBackend } from "@/features/backend/backendSlice"

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }

const initialState = {
    client: '',
    shop: '',
    date: '',
    object: '',
    location: '',
    company: '',
    status: '',

    add: false,
}

export default function ManageAddOrEditAppointments({ edit }: Props) {
    const resource = 'appointments'
    const singular = 'appointment'
    const icon = resourceIcon(resource)

    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { form: { incoming, done, cancelled } }, pages: { [resource]: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)

    const clients = backend && backend.clients ? (backend.clients as (ClientInterface & { _id: string })[]) : []
    const clientsOptions = clients?.map(client => <option key={JSON.stringify(client)} value={client.id}>{client.name}</option>)

    const client = clients?.find(client => client.id === state.client as string)
    const shopsOptions = (client || { shops: [] }).shops?.map(shop => <option key={JSON.stringify(shop)} value={shop!.id}>{(shop as ShopInterface).name}</option>)

    return <ManagerAddOrEdit edit={edit} resource={resource} singular={singular} initialState={initialState} state={state} setState={setState}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Select icon={resourceIcon('clients')} label={form.client} onChange={inputChangeHandler} value={state.client as string} name="client" required validation={{ required: true }}>
                        <option>{form.select_client}</option>
                        {clientsOptions}
                    </Select>
                    <Select icon={resourceIcon('shops')} label={form.shop} onChange={inputChangeHandler} value={state.shop as string} name="shop" required validation={{ required: true }}>
                        <option>{form.select_shop}</option>
                        {shopsOptions}
                    </Select>
                    <Input icon={icon} onChange={inputChangeHandler} value={state.date as string} name="date" type="date" required validation={{ required: true }} label={form.date} />
                    <Input icon={ClipboardDocumentListIcon} onChange={inputChangeHandler} value={state.object as string} name="object" required validation={{ required: true }} label={form.object} />
                    <Input icon={MapPinIcon} onChange={inputChangeHandler} value={state.location as string} name="location" required validation={{ required: true }} label={form.location} />
                    <Input icon={BuildingOffice2Icon} onChange={inputChangeHandler} value={state.company as string} name="company" required validation={{ required: true }} label={form.company} />
                    <Select icon={EyeIcon} label={form.status} onChange={inputChangeHandler} value={state.status as string} name="status" required validation={{ required: true }}>
                        <option>{form.select_status}</option>
                        <option value={AppointmentStatus.Incoming}>{incoming}</option>
                        <option value={AppointmentStatus.Done}>{done}</option>
                        <option value={AppointmentStatus.Cancelled}>{cancelled}</option>
                    </Select>
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}