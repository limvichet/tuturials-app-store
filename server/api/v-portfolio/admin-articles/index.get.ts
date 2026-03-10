import { getCookie, getQuery, createError, type H3Event } from "h3"

type Category = {
  id: number
  name: string
}

type Data = {
  id: number
  title: string,
  category_id: number,
  date: string,
  excerpt: string,
  publication: string,
  category?: Category
}

type PaginatedData = {
  current_page: number
  data: Data[]
  per_page: number
  total: number
  last_page: number
  [key: string]: any // for extra fields like links, from, to, etc.
}

export default defineEventHandler(async (event: H3Event): Promise<PaginatedData> => {

  const { apiBaseUrl } = useRuntimeConfig(event)

  const token = getCookie(event, "token")
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })
  }



  try {

    const res = await $fetch<PaginatedData>(`${apiBaseUrl}/api/v-portfolio/admin/articles`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })

    return res
    
  } catch (err: any) {
    const message = err?.data?.message || err?.message || "Failed to fetch products"
    throw createError({
      statusCode: err?.status || 500,
      statusMessage: message,
      data: err?.data,
    })
  }
})
