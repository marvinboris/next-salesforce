import { ReactElement } from 'react'

import { useContentContext } from '@/app/contexts/content'
import { convertDate, convertTime, updateObject } from '@/app/helpers/utils'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { StopInterface } from '@/app/models/stop'

import Layout from '@/components/backend/navigation/layout'
import Action from '@/components/backend/ui/list/action'
import ManageRead from '@/components/backend/ui/page/read'

import { selectAuth } from '@/features/auth/authSlice'
import { selectBackend, _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManageStopsPage: NextPageWithLayout = () => {
    const resource = 'stops'

    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action } }, pages: { [resource]: { form } } } } } = content!

    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend[resource] ? (backend[resource] as StopInterface[]) : []).map(stop => {
        return updateObject(stop, {
            created_at: convertDate(stop.createdAt!),
            start_time: convertTime(stop.startTime),
            end_time: stop.endTime ? convertTime(stop.endTime) : null,
            action: <Action props={props} resource={resource} item={stop} />,
        });
    });

    const fields = [
        { name: form.location, key: 'location' },
        { name: form.reason, key: 'reason' },
        { name: form.start_time, key: 'start_time' },
        { name: form.end_time, key: 'end_time' },
        { name: form.created_at, key: 'created_at' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} resource={resource} />
}

ManageStopsPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManageStopsPage