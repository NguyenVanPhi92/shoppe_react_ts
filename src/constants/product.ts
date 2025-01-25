// as const để chuyển object sang kiểu readonly => chỉ đọc không đc chỉnh sửa
export const sortBy = { createdAt: 'createdAt', view: 'view', sold: 'sold', price: 'price' } as const
export const order = { asc: 'asc', desc: 'desc' } as const
