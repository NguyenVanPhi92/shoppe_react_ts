import '@shared/assets/css/animation.css'
import '@styles/styles.scss'

import lodash from 'lodash'
import React, { memo, useEffect, useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import locale from '@locale/index'
import { TokenSelector } from '@modules/authentication/profileStore'
import { LanguageSelector } from '@modules/setting/settingStore'
import PrivatePage from '@routers/component/PrivatePage'
import PublicPage from '@routers/component/PublicPage'
import ThemeContext from '@shared/hook/ThemeContext'

const MainView = memo(({ statusLogin }: { statusLogin: boolean }) => {
  return <>{statusLogin ? <PrivatePage /> : <PublicPage />}</>
})

const App: React.FC = () => {
  const token = useSelector(TokenSelector)
  const { language } = useSelector(LanguageSelector)
  const navigate = useNavigate()

  const memoLangData = useMemo(() => {
    return locale[language]
  }, [language])

  useEffect(() => {
    if (lodash.isEmpty(token)) {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const initStyle = {
    colorPrimary: '#005556',
    colorPrimaryLight: '#338d8f',
    colorText: '#4f4c4d',
    colorTextSecondary: '#4f4c4d',
    colorLink: '#000',
    colorBgContainer: '#fff',
    colorBgLayout: '#f5f5f5',
    fontFamily: 'Roboto',
    colorError: 'red',
    colorTextBase: '#000',
    colorTextLightSolid: '#fff'
  }

  return (
    <IntlProvider locale={language} messages={memoLangData}>
      <ThemeContext token={initStyle}>
        <MainView statusLogin={token !== ''} />
      </ThemeContext>
    </IntlProvider>
  )
}

export default App
