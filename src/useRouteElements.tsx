import { lazy, Suspense, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from './contexts/app.context'
import CartLayout from './layouts/CartLayout'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import UserLayout from './pages/User/layouts/UserLayout'

// import Login from './pages/Login'
// import Register from './pages/Register'
// import Cart from './pages/Cart'
// import Profile from './pages/User/pages/Profile'
// import ChangePassword from './pages/User/pages/ChangePassword'
// import HistoryPurchase from './pages/User/pages/HistoryPurchase'
// import ProductDetail from './pages/ProductDetail'
// import ProductList from './pages/ProductList'
// import NotFound from './pages/NotFound'

//Kỹ thuật lazy load: dùng đến page nào load ra page đó
const Login = lazy(() => import('./pages/Login'))
const ProductList = lazy(() => import('./pages/ProductList'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const Register = lazy(() => import('./pages/Register'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const NotFound = lazy(() => import('./pages/NotFound'))

// check user đã login chưa
function ProtectedRoute() {
  // Login: route Outlet/các page
  // !Login: route login
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

// check user đã login rồi thì không cho vào trang login nữa
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  // Login: route Outlet
  // !Login: route home
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

// tạo hook router page
export default function useRouteElements() {
  //element: check trc khi vào children
  const routeElements = useRoutes([
    // run web check user first time access-truy cap the website
    // khi chưa login thì không đc vào các trang thông tin user
    {
      path: '',
      element: <RejectedRoute />,
      // then access page when accept
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },

    /**
     * Check user khi đã login thì mới cho phép vào các trang như:
     * - CartProduct
     * - User
     * - Profile user
     * - Change password
     * - HistoryPurchase-lịch sử mua hàng
     */
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            }
          ]
        }
      ]
    },

    // route không cần check chỉ lấy id của product
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },

    // page không cần check route
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },

    // Link sai thì sẽ vào page notfound
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])

  return routeElements
}
