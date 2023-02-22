import { ReactElement } from 'react'

import Layout from '../../../components/backend/navigation/layout'

import { _delete } from '../../../features/backend/backendSlice'
import ManageAddOrEditRoles from '../../../components/backend/ui/page/add-or-edit/roles'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerRolesEditPage: NextPageWithLayout = () => <ManageAddOrEditRoles />

ManagerRolesEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerRolesEditPage