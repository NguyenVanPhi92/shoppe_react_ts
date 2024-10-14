import { BannerRes } from "@/models"
import productApi from "@/services/productApi"
import useSWR from "swr"

interface CategorySWR {
  data: BannerRes[]
  isValidating: boolean
}

const useBanner = (): CategorySWR => {
  const { data, isValidating } = useSWR(
    "get_banner_urls",
    () =>
      productApi
        .getBanners({ radio: ["1:3", "3:1", "1:1"] })
        .then((res: any) => res?.result?.data || []),
    { revalidateOnFocus: false, dedupingInterval: 12000000 }
  )

  return {
    data,
    isValidating,
  }
}

export { useBanner }
