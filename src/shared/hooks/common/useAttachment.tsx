import { convertBase64 } from "@/helper"
import ratingApi from "@/services/ratingApi"
import _ from "lodash"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

interface UseAttachmentRes {
  getBase64Images: (files: FileList, callback?: (props: Array<string>) => void) => void
  deleteImage: (props: string) => void
  images: Array<string> | undefined
  setImages: (props: Array<string> | undefined) => void
  deleteImages: (props: Array<string>) => void
}

interface UseAttachmentProps {
  limit: number
  initImages?: Array<string>
}

const useAttachment = (props: UseAttachmentProps): UseAttachmentRes => {
  const { limit, initImages } = props
  const dispatch = useDispatch()

  const [images, setImages] = useState<Array<string> | undefined>(
    initImages && initImages?.length > 0 ? initImages : undefined
  )
  const [imageIdsLoading, setImageIdsLoading] = useState<number[]>([])

  const getBase64Images = async (
    files: FileList,
    callback?: (props: Array<string>) => void,
    handleError?: Function
  ) => {
    try {
      const urls: any = await Promise.all(
        Array.from(files).map(async (item: File) => {
          return await convertBase64(item)
        })
      )
      if (!urls?.length) {
        handleError && handleError()
        dispatch(notify("Có lỗi xảy ra, vui lòng chọn lại ảnh", "warning"))
        return
      }

      if (files?.length + (images || [])?.length > limit) {
        dispatch(notify(`Bạn chỉ được chọn tối đa ${limit} ảnh`, "warning"))
        return
      }

      if (!images) {
        setImages(urls)
        callback && callback(urls)
      } else {
        const newUrls = _.uniq([...urls, ...images])
        setImages(newUrls)
        callback && callback(newUrls)
      }
    } catch (error) {
      handleError && handleError()
      console.log(error)
    }
  }

  const uploadImages = async (attachments: string[], product_id: number) => {
    try {
      // setRatingImageIdsLoading(urls)
      // setImageIdsLoading

      const res: any = await ratingApi.createAttachment({
        product_id,
        attachments: attachments.map((url) => ({
          file: url.replace(/^data:image\/\w+;base64,/, ""),
          type: "picture",
        })),
      })

      // setRatingImageIdsLoading(undefined)

      const imageIds: any[] = res?.result?.data
      if (imageIds?.length > 0) {
        setImages(imageIds)
      } else {
        dispatch(notify("Có lỗi xảy ra, vui lòng chọn lại ảnh", "warning"))
      }
      // setRatingImageIdsLoading(undefined)
    } catch (error) {
      // setRatingImageIdsLoading(undefined)
    }
  }

  const deleteImages = (urls: Array<string>) => {
    if (images) {
      const newImages = [...urls].filter((item) => images?.some((x) => x === item))

      setImages(newImages?.length > 0 ? newImages : undefined)
    } else {
      setImages(undefined)
    }
  }

  const deleteImage = (url: string) => {
    if (images) {
      const newImages = [...images].filter((item) => item !== url)
      setImages(newImages?.length > 0 ? newImages : undefined)
    }
  }

  return {
    deleteImage,
    getBase64Images,
    images,
    setImages,
    deleteImages,
  }
}

export { useAttachment }
