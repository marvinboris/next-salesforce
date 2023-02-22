import { ReactElement } from 'react'

import { useContentContext } from '@/app/contexts/content'
import { convertDate, updateObject } from '@/app/helpers/utils'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { TransactionInterface } from '@/app/models/transaction'

import Layout from '@/components/backend/navigation/layout'
import Action from '@/components/backend/ui/list/action'
import ManageRead from '@/components/backend/ui/page/read'

import { selectAuth } from '@/features/auth/authSlice'
import { selectBackend, _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManageTransactionsPage: NextPageWithLayout = () => {
    const resource = 'transactions'

    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { [resource]: { form } } } } } = content!

    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend[resource] ? (backend[resource] as TransactionInterface[]) : []).map(transaction => {
        return updateObject(transaction, {
            created_at: convertDate(transaction.createdAt!),
            action: <Action props={props} resource={resource} item={transaction} />,
        });
    });

    const fields = [
        { name: form.client, key: 'client' },
        { name: form.product, key: 'product' },
        { name: form.qty, key: 'qty' },
        { name: form.created_at, key: 'created_at' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} resource={resource} />
}

ManageTransactionsPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManageTransactionsPage