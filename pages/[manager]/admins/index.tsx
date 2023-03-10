import { ReactElement } from 'react'

import { useContentContext } from '@/app/contexts/content'
import { convertDate, updateObject } from '@/app/helpers/utils'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { AdminInterface } from '@/app/models/admin'

import Layout from '@/components/backend/navigation/layout'
import Photo from '@/components/backend/ui/list/photo'
import Action from '@/components/backend/ui/list/action'
import ManageRead from '@/components/backend/ui/page/read'

import { selectAuth } from '@/features/auth/authSlice'
import { selectBackend, _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerAdminsPage: NextPageWithLayout = () => {
    const resource = 'admins'

    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { [resource]: { form } } } } } = content!

    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend[resource] ? (backend[resource] as AdminInterface[]) : []).map(admin => {
        return updateObject(admin, {
            created_at: convertDate(admin.createdAt!),
            photo: <Photo photo={admin.photo} see={see} title={`${form.admin_photo}: ${admin.name}`} />,
            action: <Action props={props} resource={resource} item={admin} />,
        });
    });

    const fields = [
        { name: form.full_name, key: 'name' },
        { name: form.email, key: 'email' },
        { name: form.phone, key: 'phone' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} resource={resource} />
}

ManagerAdminsPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerAdminsPage