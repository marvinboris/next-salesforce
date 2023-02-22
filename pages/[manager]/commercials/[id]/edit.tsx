import { ReactElement } from 'react'

import Layout from '../../../../components/backend/navigation/layout'

import { _delete } from '../../../../features/backend/backendSlice'
import ManageAddOrEditImages from '../../../../components/backend/ui/page/add-or-edit/commercials'

import { NextPageWithLayout } from '../../../_app'

const ManagerImagesEditPage: NextPageWithLayout = () => <ManageAddOrEditImages edit />

ManagerImagesEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerImagesEditPage