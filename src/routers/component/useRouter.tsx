import React from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { CheckPermissionFunc } from 'src/shared/hoc/CheckPermission'

import { RootState } from '@modules'
import { IRouter } from '@routers/interface'
import Loading from '@shared/components/Loading'

interface IShowRouter {
  routers: IRouter[]
  privateRoute?: boolean
}

const renderRoute = (router: IRouter) => {
  const DynamicComponent: any = router.loader
  return (
    <Route
      key={router.path}
      path={router.path}
      element={
        <React.Suspense fallback={<Loading />}>
          <DynamicComponent />
        </React.Suspense>
      }
    />
  )
}

const useRouter = ({ routers, privateRoute }: IShowRouter) => {
  const listPermissionCode = useSelector((state: RootState) => state.profile.listPermissionCode)
  return React.useMemo(() => {
    if (privateRoute && listPermissionCode == null) {
      const pages = routers.filter(
        (it: IRouter) => it.permissionCode === 'ALLOW' || it.permissionCode == null || it.path !== '*'
      )
      return { views: pages.map((it) => renderRoute(it)), routes: pages }
    }
    const pages = routers.filter(
      (it: IRouter) =>
        it.permissionCode === 'ALLOW' ||
        it.permissionCode == null ||
        CheckPermissionFunc(it.permissionCode, listPermissionCode)
    )
    return { views: pages.map((it) => renderRoute(it)), routes: pages }
  }, [routers, privateRoute, listPermissionCode])
}

export default useRouter
