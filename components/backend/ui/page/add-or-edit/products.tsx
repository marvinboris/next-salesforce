import { HomeIcon, EyeIcon, BanknotesIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "@/app/contexts/content"
import { resourceIcon } from "@/app/helpers/utils"
import ManagerResourceManageStateType from "@/app/types/account/manager/add-or-edit/state"

import Input from "@/components/backend/ui/form/input"
import Select from "@/components/backend/ui/form/select"
import TextArea from "@/components/backend/ui/form/text-area"
import * as utility from '@/components/backend/ui/utils'

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }

const initialState = {
    title: '',
    price: '',
    promo: '',

    add: false,
}

export default function ManageAddOrEditProducts({ edit }: Props) {
    const resource = 'products'
    const singular = 'product'
    const icon = resourceIcon(resource)

    const { content } = useContentContext()
    const { cms: { backend: { pages: { [resource]: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)

    return <ManagerAddOrEdit edit={edit} resource={resource} singular={singular} initialState={initialState} state={state} setState={setState}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input icon={icon} onChange={inputChangeHandler} value={state.title as string} name="title" required validation={{ required: true }} label={form.title} />
                    <Input icon={BanknotesIcon} onChange={inputChangeHandler} value={state.price as string} name="price" type="number" required validation={{ required: true, isNumeric: true }} label={form.price} />
                    <Select icon={EyeIcon} label={form.promo} onChange={inputChangeHandler} value={state.promo as string} name="promo" required validation={{ required: true }}>
                        <option>{form.select_promo}</option>
                    </Select>
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}