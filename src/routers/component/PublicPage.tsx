import React from 'react'
import { Routes } from 'react-router-dom'
import { publicPage } from '../mainRouter'
import useRouter from './useRouter'

const PublicPage: React.FC = () => {
  const { views } = useRouter({ routers: publicPage })
  return <Routes>{views}</Routes>
}

export default React.memo(PublicPage)
