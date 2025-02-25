import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import useQueryConfig from 'src/hooks/ts/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import AsideFilter from './components/asideFilter'
import SortProductList from './components/sortProductList'
import Product from './components/product'

export default function ProductList() {
  const queryConfig = useQueryConfig()
  // Queries async: Get
  const { data: productsData } = useQuery({
    // When queryConfig changes, the api will be called again
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  console.log('productsData: ', productsData?.data.data?.products)
  // Queries async: Get
  const { data: categoriesData } = useQuery({ queryKey: ['categories'], queryFn: () => categoryApi.getCategories() })

  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>Trang chủ | Shopee Clone</title>
        <meta name='description' content='Trang chủ dự án Shopee Clone' />
      </Helmet>

      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            {/* Product Cateogries */}
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
            </div>

            <div className='col-span-9'>
              {/* Fiter Sort Product */}
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data?.pagination?.page_size} />
              {/* List Product */}
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData?.data.data?.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>

              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data?.pagination?.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
