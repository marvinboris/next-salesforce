import { CogIcon, PencilIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "@/app/contexts/content"
import { resourceIcon } from "@/app/helpers/utils"
import ManagerResourceManageStateType from "@/app/types/account/manager/add-or-edit/state"

import Input from "@/components/backend/ui/form/input"
import * as utility from '@/components/backend/ui/utils'

import ManagerAddOrEdit from "../add-or-edit"

type Props = { edit?: boolean }

const initialState = {
    name: '',
    prefix: '',

    add: false,
}

export default function ManageAddOrEditRoles({ edit }: Props) {
    const resource = 'features'
    const singular = 'feature'
    const icon = resourceIcon(resource)

    const { content } = useContentContext()
    const { cms: { backend: { pages: { [resource]: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)

    return <ManagerAddOrEdit edit={edit} resource={resource} singular={singular} initialState={initialState} state={state} setState={setState}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input icon={icon} onChange={inputChangeHandler} value={state.name as string} name="name" required validation={{ required: true }} label={form.name} />
                    <Input icon={PencilIcon} onChange={inputChangeHandler} value={state.prefix as string} name="prefix" required validation={{ required: true }} label={form.prefix} />
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}