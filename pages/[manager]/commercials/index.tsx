import { ReactElement } from 'react'

import { useContentContext } from '@/app/contexts/content'
import { convertDate, updateObject } from '@/app/helpers/utils'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { CommercialInterface } from '@/app/models/commercial'

import Layout from '@/components/backend/navigation/layout'
import Photo from '@/components/backend/ui/list/photo'
import Action from '@/components/backend/ui/list/action'
import ManageRead from '@/components/backend/ui/page/read'

import { selectAuth } from '@/features/auth/authSlice'
import { selectBackend, _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerCommercialsPage: NextPageWithLayout = () => {
    const resource = 'commercials'

    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { [resource]: { form } } } } } = content!

    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend[resource] ? (backend[resource] as CommercialInterface[]) : []).map(commercial => {
        return updateObject(commercial, {
            created_at: convertDate(commercial.createdAt!),
            photo: <Photo photo={commercial.photo} see={see} title={form.commercial_photo} />,
            action: <Action props={props} resource={resource} item={commercial} />,
        });
    });

    const fields = [
        { name: form.name, key: 'name' },
        { name: form.phone, key: 'phone' },
        { name: form.username, key: 'username' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} resource={resource} />
}

ManagerCommercialsPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerCommercialsPage