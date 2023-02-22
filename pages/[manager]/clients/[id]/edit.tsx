import { ReactElement } from 'react'

import Layout from '../../../../components/backend/navigation/layout'

import { _delete } from '../../../../features/backend/backendSlice'
import ManageAddOrEditClients from '../../../../components/backend/ui/page/add-or-edit/clients'

import { NextPageWithLayout } from '../../../_app'

const ManagerClientsEditPage: NextPageWithLayout = () => <ManageAddOrEditClients edit />

ManagerClientsEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerClientsEditPage