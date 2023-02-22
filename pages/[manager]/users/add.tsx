import { ReactElement } from 'react'

import Layout from '../../../components/backend/navigation/layout'

import { _delete } from '../../../features/backend/backendSlice'
import ManageAddOrEditUsers from '../../../components/backend/ui/page/add-or-edit/users'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerUsersEditPage: NextPageWithLayout = () => <ManageAddOrEditUsers />

ManagerUsersEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerUsersEditPage