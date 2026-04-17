type UserResponse = {
  id: number
  name: string
  email: string
  email_verified_at?: string | null
  active: number
  status: string
  created_at: string
  updated_at: string
}

export default defineEventHandler(async (event) => {

  // get API BASE URL from runtime config
  const { apiBaseUrl } = useRuntimeConfig(event);

  // get the body of request
  try {

    const token = getCookie(event, "token")

    if (!token){
      throw createError({
        statusCode: 402,
        statusMessage: "UNAUTHORIZED",
      });
    }

    const res = await $fetch<UserResponse>(`${apiBaseUrl}/api/v-portfolio/admin/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res;

  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e?.data?.message || e?.message || "Can't get user!",
    })
  }

});
