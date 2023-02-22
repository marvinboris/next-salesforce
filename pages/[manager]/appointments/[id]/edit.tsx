import { ReactElement } from 'react'

import Layout from '@/components/backend/navigation/layout'
import ManageAddOrEditAppointments from '@/components/backend/ui/page/add-or-edit/appointments'

import { _delete } from '@/features/backend/backendSlice'

import { NextPageWithLayout } from '@/pages/_app'

const ManagerAppointmentsEditPage: NextPageWithLayout = () => <ManageAddOrEditAppointments edit />

ManagerAppointmentsEditPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export default ManagerAppointmentsEditPage