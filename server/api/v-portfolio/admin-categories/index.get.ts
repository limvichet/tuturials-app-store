type CategoryResponse = {
    id:   number;
    name: string;
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

    const res = await $fetch<CategoryResponse>(`${apiBaseUrl}/api/v-portfolio/admin/categories`, {
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
