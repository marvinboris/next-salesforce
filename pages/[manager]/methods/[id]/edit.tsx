import { ReactElement } from 'react'

import Layout from '../../../../components/backend/navigation/layout'

import { _delete } from '../../../../features/backend/backendSlice'
import ManageAddOrEditMethods from '../../../../components/backend/ui/page/add-or-edit/methods'

import { NextPageWithLayout } from '../../../_app'

const ManagerMethodsEditPage: NextPageWithLayout = () => <ManageAddOrEditMethods edit />

ManagerMethodsEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerMethodsEditPage