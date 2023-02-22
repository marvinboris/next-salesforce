import { ReactElement } from 'react'

import Layout from '../../../components/backend/navigation/layout'

import { _delete } from '../../../features/backend/backendSlice'
import ManageAddOrEditLessons from '../../../components/backend/ui/page/add-or-edit/invoices'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerLessonsEditPage: NextPageWithLayout = () => <ManageAddOrEditLessons />

ManagerLessonsEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerLessonsEditPage