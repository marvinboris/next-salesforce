import { ReactElement } from 'react'

import { useContentContext } from '@/app/contexts/content'
import { convertDate, updateObject } from '@/app/helpers/utils'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { InvoiceInterface } from '@/app/models/invoice'

import Layout from '@/components/backend/navigation/layout'
import Action from '@/components/backend/ui/list/action'
import ManageRead from '@/components/backend/ui/page/read'

import { selectAuth } from '@/features/auth/authSlice'
import { selectBackend, _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerInvoicesPage: NextPageWithLayout = () => {
    const resource = 'invoices'

    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action } }, pages: { [resource]: { form } } } } } = content!

    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend[resource] ? (backend[resource] as InvoiceInterface[]) : []).map(invoice => updateObject(invoice, {
        created_at: convertDate(invoice.createdAt!),
        action: <Action props={props} resource={resource} item={invoice} />,
    }));

    const fields = [
        { name: form.number, key: 'number' },
        { name: form.client, key: 'client' },
        { name: form.method, key: 'method' },
        { name: form.amount, key: 'amount' },
        { name: form.created_at, key: 'created_at' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} resource={resource} />
}

ManagerInvoicesPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerInvoicesPage