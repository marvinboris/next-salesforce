import { ReactElement } from 'react'

import Layout from '../../../components/backend/navigation/layout'

import { _delete } from '../../../features/backend/backendSlice'
import ManageAddOrEditFeatures from '../../../components/backend/ui/page/add-or-edit/features'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerFeaturesEditPage: NextPageWithLayout = () => <ManageAddOrEditFeatures />

ManagerFeaturesEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerFeaturesEditPage