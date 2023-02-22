import { ReactElement } from 'react'

import Layout from '@/components/backend/navigation/layout'
import ManageAddOrEditCommercials from '@/components/backend/ui/page/add-or-edit/commercials'

import { _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerCommercialsEditPage: NextPageWithLayout = () => <ManageAddOrEditCommercials />

ManagerCommercialsEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerCommercialsEditPage