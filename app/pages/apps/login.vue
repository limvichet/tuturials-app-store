<script setup lang="ts">


useHead({
  title: "Login",
  meta: [{ name: "description", content: "Login to your account." }],
})

const login = () => {
   navigateTo("/apps/dashpnboard", { replace: true })
}

</script>

<template>
  <div
    class="bg-[#0f172a] text-gray-100 min-h-screen font-sans flex items-center justify-center selection:bg-emerald-500/30">
    <div
      class="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 p-4 rounded-xl w-full max-w-xs shadow-lg shadow-emerald-900/20 space-y-4">
      <h1 class="text-xl font-bold text-center gradient-text">Signin</h1>

      <!-- Form -->
      <form class="space-y-3">
        <!-- Email -->
        <div>
          <input type="email" placeholder="Email"
            class="w-full p-2 rounded-lg border border-gray-700 bg-gray-900/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
        </div>

        <!-- Password -->
        <div>
          <input type="password" placeholder="Password"
            class="w-full p-2 rounded-lg border border-gray-700 bg-gray-900/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
        </div>

        <!-- Submit -->
        <!-- 
        <button type="button" class="w-full py-2 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-700 transition-transform hover:scale-105 shadow-lg shadow-emerald-900/20 disabled:opacity-50">
          <NuxtLink to="/apps/dashboard">
            Login
          </NuxtLink>
        </button> 
        -->
        <button @click="login" type="button" class="cursor-pointer w-full py-2 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-700 transition-transform hover:scale-105 shadow-lg shadow-emerald-900/20 disabled:opacity-50">
            Signin
        </button>
      </form>

      <p class="text-gray-400 text-center text-xs mt-2">
        Don't have an account to login?
      </p>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.gradient-text {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500;
}
</style>
