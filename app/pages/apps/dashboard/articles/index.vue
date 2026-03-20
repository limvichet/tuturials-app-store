<script setup lang="ts">
    definePageMeta({
        layout: "dashboard"
    })

    useHead({
        title: "index article",
        meta: [{ name: "article", content: "index article" }],
    })
</script>

<template>
      <div class="p-4 min-h-screen bg-[#0f172a] text-gray-100">
    <div class="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-lg shadow-emerald-900/20">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500">
          Articles
        </h1>
      </div>


      <!-- Search -->
      <div class="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          class="flex-1 p-2.5 rounded-lg border border-gray-700 bg-gray-900/60 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
        />
      </div>
    </div>
  </div>  
</template>