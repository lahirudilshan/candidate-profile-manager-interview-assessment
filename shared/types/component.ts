import { Session } from "next-auth"

export type TSession = {
    session: Session;
}

export type TLoader = {
    fullScreen?: boolean,
    content?: boolean
}

export type TModalState<T = any> = {
    status: boolean,
    mode: 'create' | 'edit',
    data: T
}