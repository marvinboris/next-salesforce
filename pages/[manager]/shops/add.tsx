import { ReactElement } from 'react'

import Layout from '@/components/backend/navigation/layout'
import ManageAddOrEditShops from '@/components/backend/ui/page/add-or-edit/shops'

import { _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerShopsEditPage: NextPageWithLayout = () => <ManageAddOrEditShops />

ManagerShopsEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerShopsEditPage