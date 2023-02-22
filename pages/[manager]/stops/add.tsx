import { ReactElement } from 'react'

import Layout from '@/components/backend/navigation/layout'
import ManageAddOrEditStops from '@/components/backend/ui/page/add-or-edit/stops'

import { _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerStopsAddPage: NextPageWithLayout = () => <ManageAddOrEditStops />

ManagerStopsAddPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerStopsAddPage