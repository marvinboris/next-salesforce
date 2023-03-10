import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useContentContext } from '@/app/contexts/content'
import { resourceIcon } from '@/app/helpers/utils'
import ManagerResourceManageStateType from '@/app/types/account/manager/add-or-edit/state'
import Status from '@/app/types/enums/status'
import ResourceType from '@/app/types/resource'

import { Head } from '@/components/backend/navigation/layout'
import Button from '@/components/backend/ui/form/button'
import PageTitle from '@/components/backend/ui/title/page'
import * as utility from '@/components/backend/ui/utils'

import { selectAuth } from '@/features/auth/authSlice'
import { info, patch, post, reset, selectBackend, show, _delete } from '@/features/backend/backendSlice'

type Props = {
    initialState: ManagerResourceManageStateType
    resource: ResourceType
    singular: string
    edit?: boolean
    children?: ReactNode
    staticChild?: ReactNode
    state: ManagerResourceManageStateType
    setState: Dispatch<SetStateAction<ManagerResourceManageStateType>>
}

const ManagerAddOrEdit = ({ initialState, resource, singular, edit, children, staticChild, state, setState }: Props) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { components: { form: { save } }, pages: { [resource]: cms } } } } = content!

    const [isMounted, setIsMounted] = useState(false)

    const icon = resourceIcon(resource)

    const params = useMemo(() => ({ role: role!, resource }), [resource, role])
    const props = useMemo(() => ({
        ...{
            auth: { role: role! },
            backend: { status, data: backend!, message },
            content: content!,
            history: router,

            reset: () => dispatch(reset()),
        }, ...(edit ? {
            edit: true,
            id: router.query.id as string,

            show: (id: string) => dispatch(show({ ...params, id })),
            patch: (id: string, data: any) => dispatch(patch({ ...params, id, data })),
        } : {
            info: () => dispatch(info(params)),
            post: (data: any) => dispatch(post({ ...params, data })),
        })
    }), [backend, content, dispatch, edit, message, params, role, router, status])

    useEffect(() => {
        if (status === Status.IDLE && !backend) utility.add.lifecycle.componentDidMount(props, setIsMounted)

        return () => {
            if (backend && !backend.message) dispatch(reset())
        }
    }, [backend, dispatch, props, status])

    useEffect(() => {
        if (!state._id) utility.add.lifecycle.componentDidUpdate(resource, singular)(props, state, setState, () => setState({ ...initialState }))
    }, [initialState, message, props, resource, setState, singular, state, status])

    const _content = <div>
        {children}

        <div className='mt-5'>
            <Button color='green' icon={ArrowDownOnSquareIcon}>{save}</Button>
        </div>
    </div>

    return <main className='flex-1 flex flex-col'>
        <Head link={edit ? `/${role}/${resource}/${router.query.id as string}/edit` : `/${role}/${resource}/add`} title={`${edit ? cms.edit : cms.add} | ${app_name}`} description={`${app_name} : ${edit ? cms.edit : cms.add}`} />

        <PageTitle icon={icon} title={cms.title} subtitle={edit ? cms.edit : cms.add} />

        <utility.add.lifecycle.render icon={icon} props={props} isMounted={isMounted} resource={resource}>
            {staticChild}
            {_content}
        </utility.add.lifecycle.render>
    </main>
}

export default ManagerAddOrEdit