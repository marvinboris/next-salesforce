import { ReactElement } from 'react'

import Layout from '@/components/backend/navigation/layout'
import ManageAddOrEditProducts from '@/components/backend/ui/page/add-or-edit/products'

import { _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerProductsEditPage: NextPageWithLayout = () => <ManageAddOrEditProducts edit />

ManagerProductsEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerProductsEditPage