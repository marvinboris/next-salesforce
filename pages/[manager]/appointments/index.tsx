import { ReactElement } from 'react'

import { useContentContext } from '@/app/contexts/content'
import { classNames, convertDate, updateObject } from '@/app/helpers/utils'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { AppointmentInterface, AppointmentStatus } from '@/app/models/appointment'

import Layout from '@/components/backend/navigation/layout'
import Action from '@/components/backend/ui/list/action'
import ManageRead from '@/components/backend/ui/page/read'

import { selectAuth } from '@/features/auth/authSlice'
import { selectBackend, _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerCategoriesPage: NextPageWithLayout = () => {
    const resource = 'appointments'

    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { form: { incoming, done, cancelled }, list: { action } }, pages: { [resource]: { form } } } } } = content!

    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend[resource] ? (backend[resource] as AppointmentInterface[]) : []).map(appointment => updateObject(appointment, {
        created_at: convertDate(appointment.createdAt!),
        date: convertDate(appointment.date),
        status: <span className={classNames("py-1 px-3 rounded font-medium", ['bg-primary-600/10 text-primary-600', 'bg-green/10 text-green', 'bg-red/10 text-red'][appointment.status!])}>{[incoming, done, cancelled][appointment.status!]}</span>,
        action: <Action props={props} resource={resource} item={appointment} />,
    }));

    const fields = [
        { name: form.client, key: 'client' },
        { name: form.shop, key: 'shop' },
        { name: form.date, key: 'date' },
        { name: form.object, key: 'object' },
        { name: form.location, key: 'location' },
        { name: form.company, key: 'company' },
        { name: form.status, key: 'status' },
        { name: form.created_at, key: 'created_at' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} resource={resource} />
}

ManagerCategoriesPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerCategoriesPage