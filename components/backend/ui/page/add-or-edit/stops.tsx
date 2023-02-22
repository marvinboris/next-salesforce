import { ClockIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useState } from "react"

import { useContentContext } from "@/app/contexts/content"
import { resourceIcon } from "@/app/helpers/utils"
import ManagerResourceManageStateType from "@/app/types/account/manager/add-or-edit/state"

import Input from "@/components/backend/ui/form/input"
import * as utility from '@/components/backend/ui/utils'

import ManagerAddOrEdit from "."

type Props = { edit?: boolean }

const initialState = {
    location: '',
    reason: '',
    startTime: '',
    endTime: '',

    add: false,
}

export default function ManageAddOrEditStops({ edit }: Props) {
    const resource = 'stops'
    const singular = 'stop'
    const icon = resourceIcon(resource)

    const { content } = useContentContext()
    const { cms: { backend: { pages: { [resource]: { form } } } } } = content!

    const [state, setState] = useState<ManagerResourceManageStateType>({ ...initialState })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => utility.add.component.inputChangeHandler(setState)(e)

    return <ManagerAddOrEdit edit={edit} resource={resource} singular={singular} initialState={initialState} state={state} setState={setState}>
        <div className='grid md:grid-cols-3 gap-4'>
            <div className="md:col-span-2">
                <div className="flex-1 grid gap-y-2 gap-x-4 grid-cols-1 md:grid-cols-2 overflow-auto">
                    <Input icon={icon} onChange={inputChangeHandler} value={state.location as string} name="location" required validation={{ required: true }} label={form.location} />
                    <Input icon={icon} onChange={inputChangeHandler} value={state.reason as string} name="reason" required validation={{ required: true }} label={form.reason} />
                    <Input icon={ClockIcon} onChange={inputChangeHandler} value={state.startTime as string} name="startTime" type="datetime-local" required validation={{ required: true }} label={form.start_time} />
                    <Input icon={ClockIcon} onChange={inputChangeHandler} value={state.endTime as string} name="endTime" type="datetime-local" label={form.end_time} />
                </div>
            </div>
        </div>
    </ManagerAddOrEdit>
}