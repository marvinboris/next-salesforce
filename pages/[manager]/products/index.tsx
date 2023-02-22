import { ReactElement } from 'react'

import { useContentContext } from '@/app/contexts/content'
import { convertDate, updateObject } from '@/app/helpers/utils'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ProductInterface } from '@/app/models/product'

import Layout from '@/components/backend/navigation/layout'
import Action from '@/components/backend/ui/list/action'
import ManageRead from '@/components/backend/ui/page/read'

import { selectAuth } from '@/features/auth/authSlice'
import { selectBackend, _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManageProductsPage: NextPageWithLayout = () => {
    const resource = 'products'

    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action } }, pages: { [resource]: { form } } } } } = content!

    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend[resource] ? (backend[resource] as ProductInterface[]) : []).map(product => {
        return updateObject(product, {
            created_at: convertDate(product.createdAt!),
            action: <Action props={props} resource={resource} item={product} />,
        });
    });

    const fields = [
        { name: form.title, key: 'title' },
        { name: form.price, key: 'price' },
        { name: form.promo, key: 'promo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} resource={resource} />
}

ManageProductsPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManageProductsPage