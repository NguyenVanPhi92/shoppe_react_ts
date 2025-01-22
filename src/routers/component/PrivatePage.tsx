import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import config from '@config/index'
import authenticationPresenter from '@modules/authentication/presenter'
import { TokenSelector } from '@modules/authentication/profileStore'
import { privatePage } from '@routers/mainRouter'
import { matchPath, Routes, useLocation } from 'react-router-dom'
import useRouter from './useRouter'
import DefaultLayout from '@layout/index'
import { useSingleAsync } from '@shared/hook/useAsync'

const PrivatePage: React.FC = () => {
  const token = useSelector(TokenSelector)
  const location = useLocation()
  const getProfile = useSingleAsync(authenticationPresenter.getProfile)

  useEffect(() => {
    if (token) {
      getProfile.execute()
    } else {
      window.location.href = config.LOGIN_PAGE
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const { views, routes } = useRouter({
    routers: privatePage,
    privateRoute: true
  })

  const showMasterLayout = React.useMemo(() => {
    const r = routes.find((it) => matchPath(it.path, location.pathname))
    return r?.masterLayout !== false
  }, [location.pathname, routes])

  return (
    <DefaultLayout
      hideSideBar={!showMasterLayout}
      hideHeader={!showMasterLayout}
      loading={getProfile.status !== 'ready'}
    >
      <Routes>{views}</Routes>
    </DefaultLayout>
  )
}
export default React.memo(PrivatePage)
