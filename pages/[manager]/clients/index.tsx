import { ReactElement } from 'react'

import { useContentContext } from '@/app/contexts/content'
import { convertDate, updateObject } from '@/app/helpers/utils'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ClientInterface } from '@/app/models/client'

import Layout from '@/components/backend/navigation/layout'
import Action from '@/components/backend/ui/list/action'
import Photo from '@/components/backend/ui/list/photo'
import Status from '@/components/backend/ui/list/status'
import ManageRead from '@/components/backend/ui/page/read'

import { selectAuth } from '@/features/auth/authSlice'
import { selectBackend, _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManageClientsPage: NextPageWithLayout = () => {
    const resource = 'clients'

    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { form: { }, list: { action, see } }, pages: { [resource]: { form } } } } } = content!

    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend[resource] ? (backend[resource] as ClientInterface[]) : []).map(client => {
        return updateObject(client, {
            created_at: convertDate(client.createdAt!),
            joined_at: convertDate(client.joinedAt!),
            photo: <Photo photo={client.photo} see={see} title={`${form.client_photo}: ${client.name}`} />,
            status: <Status value={!client.status!} />,
            action: <Action props={props} resource={resource} item={client} />,
        });
    });

    const fields = [
        { name: form.name, key: 'name' },
        { name: form.location, key: 'location' },
        { name: form.phone, key: 'phone' },
        { name: form.email, key: 'email' },
        { name: form.status, key: 'status' },
        { name: form.photo, key: 'photo' },
        { name: form.created_at, key: 'created_at' },
        { name: form.joined_at, key: 'joined_at' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} resource={resource} />
}

ManageClientsPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManageClientsPage