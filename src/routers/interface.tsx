/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-undef */
import React, { ReactNode } from 'react'

export type IRouter = {
  loader?:
    | React.LazyExoticComponent<() => JSX.Element>
    | React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>
    | React.LazyExoticComponent<React.FC<any>>
    | React.LazyExoticComponent<React.NamedExoticComponent<any>>
  path: any | number
  permissionCode?: string | 'ALLOW' | string[]
  component?: React.FC<any>
  isPrivate?: boolean
  exact?: boolean
  name?: string
  masterLayout?: boolean
  icon?: ReactNode
  menu?: {
    icon?: ReactNode
    hideInNavbar?: boolean
    exact?: boolean
    activePath?: string
    content?: string
    generatePath?: (params: any) => string
  }
  generatePath?: (params: any) => string
  activePath?: string
  routes?: Array<IRouter>
  external?: boolean
}
