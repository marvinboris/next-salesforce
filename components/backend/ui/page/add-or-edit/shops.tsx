import { EyeIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "@/app/contexts/content"
import { resourceIcon } from "@/app/helpers/utils"
import { ShopStatus } from "@/app/models/shop"
import ManagerResourceManageStateType from "@/app/types/account/manager/add-or-edit/state"

import Input from "@/components/backend/ui/form/input"
import InputImage from "@/components/backend/ui/form/input-image"
import Select from "@/components/backend/ui/form/select"
import * as utility from '@/components/backend/ui/utils'

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }

const initialState = {
    name: '',
    phone: '',
    photo: '',
    email: '',
    password: '',
    password_confirmation: '',
    category: '',

    add: false,
}

export default function ManageAddOrEditPublications({ edit }: Props) {
    const resource = 'shops'
    const singular = 'shop'
    const icon = resourceIcon(resource)

    const { content } = useContentContext()
    const { cms: { backend: { components: { form: { active, inactive } }, pages: { [resource]: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)
    const fileUpload = (id: string) => utility.add.component.fileUpload(id)

    return <ManagerAddOrEdit edit={edit} resource={resource} singular={singular} initialState={initialState} state={state} setState={setState} staticChild={<>
        <input type="file" id="photo" name="photo" className="hidden" onChange={inputChangeHandler} accept=".png,.jpg,.jpeg" />
    </>}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input icon={icon} onChange={inputChangeHandler} value={state.name as string} name="name" required validation={{ required: true }} label={form.name} />
                    <Input icon={resourceIcon('commercials')} onChange={inputChangeHandler} value={state.manager as string} name="manager" required validation={{ required: true }} label={form.manager} />
                    <Input icon={EnvelopeIcon} onChange={inputChangeHandler} value={state.email as string} name="email" type="email" required validation={{ required: true, isEmail: true }} label={form.email} />
                    <Input icon={PhoneIcon} onChange={inputChangeHandler} value={state.phone as string} name="phone" type="tel" required validation={{ required: true }} label={form.phone} />
                    <Input icon={MapPinIcon} onChange={inputChangeHandler} value={state.location as string} name="location" required validation={{ required: true }} label={form.location} />
                    <Select icon={EyeIcon} label={form.status} onChange={inputChangeHandler} value={state.status as string} name="status" required validation={{ required: true }}>
                        <option>{form.select_status}</option>
                        <option value={ShopStatus.Active}>{active}</option>
                        <option value={ShopStatus.Inactive}>{inactive}</option>
                    </Select>
                </div>
            </div>

            <div>
                <InputImage label={form.photo} name="photo" value={state.photo as string} onClick={() => fileUpload('photo')} />
            </div>
        </div>
    </ManagerAddOrEdit>
}