<script setup lang="ts">

definePageMeta({ layout: "dashboard", requiresAuth: true })

import { ref, onMounted } from "vue"
import { z } from "zod"
import { useForm, useField } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"

import { useMessage } from "~/composables/useMessage";

const { successMsg, errorMsg } = useMessage();
successMsg.value = null
errorMsg.value = null

type Category = {
    id: number
    name: string
}

/* zod schema */
const schema = toTypedSchema(
    z.object({
        title: z.string().min(1, "Required"),
        date: z.string().min(10, "Required"),
        excerpt: z.string().min(1, "Required"),
        publication: z.string().optional(),
        category_id: z.number().int().positive("Required")
    })
)

/* Vee-validate form */
const { handleSubmit, errors, setValues } = useForm({
    validationSchema: schema,
    initialValues: {
        title: "",
        date: "",
        excerpt: "",
        publication: "",
        category_id: -1
    }
})

const { value: title } = useField<string>("title")
const { value: date } = useField<string>("date")
const { value: excerpt } = useField<string>("excerpt")
const { value: publication } = useField<string>("publication")
const { value: category_id } = useField<number>("category_id")

// State
const categories = ref<Category[]>([])

// Fetch categories
const fetchCategories = async () => {
    try {
        categories.value = await $fetch<Category[]>("/api/v-portfolio/admin-categories")
        console.log("Categories loaded:", categories.value)
    } catch (err: any) {
        errorMsg.value = err?.statusMessage || "Failed to load categories"
    }
}

/* type */
type Article = {
    id: number
    title: string
    date: string
    excerpt: string
    publication?: string
    category_id: number
}

/* get id */
const route = useRoute()
const id = Number(route.params.id)

/* fetch article */
const fetchArticle = async () => {
  try {
    const res = await $fetch<Article>(`/api/v-portfolio/admin-articles/${id}`)
    setValues(res)
  } catch (err: any) {
    errorMsg.value = err?.statusMessage || "Failed to load article"
  }
}

onMounted(async() => {
    await fetchCategories()
    await fetchArticle()
})

const onSubmit = handleSubmit(async (values) => {
    try {
        const res = await $fetch<{ id: number }>(`/api/v-portfolio/admin-articles/${id}`, {
            method: "PUT",
            body: values,
        })
        successMsg.value = "Article updated successfully"
       // resetForm()
    } catch (err: any) {
        errorMsg.value = err?.statusMessage || "Failed to update article"
    }
})

</script>

<template>
    <div class="p-4 max-w-lg">
        <h1 class="text-xl font-bold gradient-text mb-4">Update Article</h1>

        <!-- Messages -->
        <div v-if="errorMsg" class="mb-3 p-2 rounded bg-red-500/20 text-red-300 text-sm">
            {{ errorMsg }}
        </div>
        <div v-if="successMsg" class="mb-3 p-2 rounded bg-emerald-500/20 text-emerald-300 text-sm">
            {{ successMsg }}
        </div>

        <form @submit.prevent="onSubmit" class="space-y-3">

            <!-- titlle -->
            <div>
                <input 
                    v-model="title" 
                    type="text" 
                    placeholder="Enter title" 
                    class="input" 
                />
                <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
            </div>

            <!-- date -->
            <div>
                <input 
                    v-model="date" 
                    type="text" 
                    placeholder="Enter date (DD-MM-YYYY)" 
                    class="input" 
                />
                <p v-if="errors.date" class="text-red-500 text-sm mt-1">{{ errors.date }}</p>
            </div>

            <!-- excerpt -->
            <div>
                <input 
                    v-model="excerpt" 
                    type="text" 
                    placeholder="Enter Excerpt" 
                    class="input" 
                />
                <p v-if="errors.excerpt" class="text-red-500 text-sm mt-1">{{ errors.excerpt }}</p>
            </div>

            <!-- publication -->
            <div>
                <input 
                    v-model="publication" 
                    type="text" 
                    placeholder="Enter Publication" 
                    class="input" 
                />
            </div>

            <!-- Category -->
            <div>
                <select v-model.number="category_id"
                    class="selection">
                    <option value="-1" disabled>Choose ... </option>
                    <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
            </div>

            <!-- Submit -->
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>

    @reference "@/assets/css/main.css"; 

    .input {
       @apply  w-full p-2 rounded-lg border bg-gray-900/50 text-gray-100 placeholder-gray-400 focus:outline-none transition
    }
    .selection {
       @apply  w-full p-2 rounded-lg border bg-gray-900/50 text-gray-100 focus:outline-none transition
    }
    button {
        @apply w-full py-2 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-700 transition-transform hover:scale-105 shadow-lg shadow-emerald-900/20 disabled:opacity-50 flex items-center justify-center gap-2
    }

</style>