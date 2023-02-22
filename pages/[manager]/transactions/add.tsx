import { ReactElement } from 'react'

import Layout from '@/components/backend/navigation/layout'
import ManageAddOrEditTransactions from '@/components/backend/ui/page/add-or-edit/transactions'

import { _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerTransactionsEditPage: NextPageWithLayout = () => <ManageAddOrEditTransactions />

ManagerTransactionsEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerTransactionsEditPage