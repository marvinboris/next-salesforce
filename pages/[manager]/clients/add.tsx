import { ReactElement } from 'react'

import Layout from '@/components/backend/navigation/layout'
import ManageAddOrEditClients from '@/components/backend/ui/page/add-or-edit/clients'

import { _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerClientsEditPage: NextPageWithLayout = () => <ManageAddOrEditClients />

ManagerClientsEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerClientsEditPage