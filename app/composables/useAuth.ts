const useUser = () => useState<any | null>("user", () => null);

type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  active: number;
  status: string;
  location_code: string | null;
  created_at: string;
  updated_at: string;
}

type LoginRES = {
  user: User;
  token: string;
  message: string;
  code: number;
};

type LoginREQ = { 
  email: string; 
  password: string 
}

export const useAuth = () => {
  const token = useCookie<string | null>("token")
  const user = useUser()

  const loading = ref(false)
  const isAuthenticated = computed(() => !!user.value)


  const login = async (credentials: LoginREQ) => {
    try {
      loading.value = true
      const res = await $fetch<LoginRES>("/api/v-portfolio/admin-auth/login", {
        method: "POST",
        body: credentials,
      })

      token.value = res.token
      await fetchUser()

      await navigateTo("/dashboard", { replace: true })
    } catch (err: any) {
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async (headers: HeadersInit = {}) => {
    try {
      loading.value = true;
      const fetchedUser = await $fetch<User>("/api/v-portfolio/admin-auth/user", {
        headers,
      });

      user.value = fetchedUser;
    } catch (error) {
      user.value = null;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      const token = useCookie<string | null>('token');
      await $fetch("/api/v-portfolio/admin-auth/logout", { 
        method: "POST",   headers: {
          Authorization: `Bearer ${token.value}`
        }})
      token.value = null;
      user.value = null;
    } catch (err) {
      console.warn("Logout API failed, clearing local state anyway", err)
    }

    token.value = null 
    user.value = null

    await navigateTo("/login", { replace: true })
  }


  return {
    loading,
    login,
    logout,
    token,
    user,
    isAuthenticated,
  }

}
