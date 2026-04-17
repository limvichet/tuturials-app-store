<script setup lang="ts">
import { useForm, useField } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { z } from "zod"

definePageMeta({
  guestOnly: true,
})
useHead({
  title: "Login",
  meta: [{ name: "description", content: "Login to your account." }],
})

// Zod schema
const schema = toTypedSchema(
  z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
)

// Setup form
const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
})

// Fields
const { value: email } = useField<string>("email")
const { value: password } = useField<string>("password")

// Auth
const { login, loading } = useAuth()
const err = ref<string[] | null>(null)

// Submit handler
const onSubmit = handleSubmit(async () => {
  try {
    err.value = null
    // Pass the actual values from the fields
    await login({ email: email.value, password: password.value })

  } catch (error: any) {
    if (!error?.data?.data) {
      err.value = [error?.data?.statusMessage || "Login failed"]
    } else {
      err.value = Object.values(error.data.data).flat() as string[]
    }
  }
})
</script>

<template>
  <div
    class="bg-[#0f172a] text-gray-100 min-h-screen font-sans flex items-center justify-center selection:bg-emerald-500/30">
    <div
      class="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 p-4 rounded-xl w-full max-w-xs shadow-lg shadow-emerald-900/20 space-y-4">
      <h1 class="text-xl font-bold text-center gradient-text">Login</h1>

      <!-- API Errors -->
      <div v-if="err" class="bg-red-500/10 border border-red-500/30 text-red-400 p-2 rounded text-sm">
        <ul>
          <li v-for="(e, i) in err" :key="i">• {{ e }}</li>
        </ul>
      </div>

      <!-- Form -->
      <form @submit.prevent="onSubmit" class="space-y-3">
        <!-- Email -->
        <div>
          <input v-model="email" type="email" placeholder="Email"
            class="w-full p-2 rounded-lg border border-gray-700 bg-gray-900/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
          <p v-if="errors.email" class="text-red-400 text-xs mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <input v-model="password" type="password" placeholder="Password"
            class="w-full p-2 rounded-lg border border-gray-700 bg-gray-900/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
          <p v-if="errors.password" class="text-red-400 text-xs mt-1">
            {{ errors.password }}
          </p>
        </div>

        <!-- Submit -->
        <button type="submit" :disabled="isSubmitting || loading"
          class="w-full py-2 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-700 transition-transform hover:scale-105 shadow-lg shadow-emerald-900/20 disabled:opacity-50">
          {{ loading || isSubmitting ? "Logging in..." : "Login" }}
        </button>
      </form>

      <p class="text-gray-400 text-center text-xs mt-2">
        Don't have an account?
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
