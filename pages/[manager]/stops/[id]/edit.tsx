import { ReactElement } from 'react'

import Layout from '../../../../components/backend/navigation/layout'

import { _delete } from '../../../../features/backend/backendSlice'
import ManageAddOrEditPublications from '../../../../components/backend/ui/page/add-or-edit/shops'

import { NextPageWithLayout } from '../../../_app'

const ManagerPublicationsEditPage: NextPageWithLayout = () => <ManageAddOrEditPublications edit />

ManagerPublicationsEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerPublicationsEditPage