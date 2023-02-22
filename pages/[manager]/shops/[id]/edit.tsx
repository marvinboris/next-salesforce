import { ReactElement } from 'react'

import Layout from '../../../../components/backend/navigation/layout'

import { _delete } from '../../../../features/backend/backendSlice'
import ManageAddOrEditMinistries from '../../../../components/backend/ui/page/add-or-edit/products'

import { NextPageWithLayout } from '../../../_app'

const ManagerMinistriesEditPage: NextPageWithLayout = () => <ManageAddOrEditMinistries edit />

ManagerMinistriesEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerMinistriesEditPage