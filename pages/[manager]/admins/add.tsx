import { ReactElement } from 'react'

import Layout from '../../../components/backend/navigation/layout'

import { _delete } from '../../../features/backend/backendSlice'
import ManageAddOrEditAdmins from '../../../components/backend/ui/page/add-or-edit/admins'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerAdminsEditPage: NextPageWithLayout = () => <ManageAddOrEditAdmins />

ManagerAdminsEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerAdminsEditPage