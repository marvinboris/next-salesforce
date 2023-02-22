import { ReactElement } from 'react'

import { useContentContext } from '@/app/contexts/content'
import { convertDate, updateObject } from '@/app/helpers/utils'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ShopInterface } from '@/app/models/shop'

import Layout from '@/components/backend/navigation/layout'
import Action from '@/components/backend/ui/list/action'
import Photo from '@/components/backend/ui/list/photo'
import Status from '@/components/backend/ui/list/status'
import ManageRead from '@/components/backend/ui/page/read'

import { selectAuth } from '@/features/auth/authSlice'
import { selectBackend, _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManageShopsPage: NextPageWithLayout = () => {
    const resource = 'shops'

    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { [resource]: { form } } } } } = content!

    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend[resource] ? (backend[resource] as ShopInterface[]) : []).map(shop => {
        return updateObject(shop, {
            created_at: convertDate(shop.createdAt!),
            photo: <Photo photo={shop.photo} see={see} title={`${form.shop_photo}: ${shop.name}`} />,
            status: <Status value={!shop.status!} />,
            action: <Action props={props} resource={resource} item={shop} />,
        });
    });

    const fields = [
        { name: form.name, key: 'name' },
        { name: form.manager, key: 'manager' },
        { name: form.email, key: 'email' },
        { name: form.phone, key: 'phone' },
        { name: form.location, key: 'location' },
        { name: form.status, key: 'status' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} resource={resource} />
}

ManageShopsPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManageShopsPage