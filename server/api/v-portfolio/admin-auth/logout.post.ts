export default defineEventHandler(async (event) => {

  const { apiBaseUrl } = useRuntimeConfig(event);
  const token = getCookie(event, "token")

  try {
    await $fetch(apiBaseUrl + "/api/v-portfolio/admin-auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    deleteCookie(event, "token", { path: "/" })
    return { success: true }

  } catch (e) {
    deleteCookie(event, "token");
    console.warn("logout failed, clearing cookie anyway")
    throw createError({
      statusCode: 500,
      statusMessage: (e instanceof Error ? e.message : String(e)) || "Can't logout!",
    })
  }
})
