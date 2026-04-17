<script setup lang="ts">
</script>

<template>
  <div class="bg-[#0f172a] text-gray-100 min-h-screen font-sans selection:bg-emerald-500/30 flex flex-col">

    <!-- Top Navbar -->
    <nav class="w-full bg-gray-900/50 backdrop-blur-md border-b border-gray-700/50 pr-6 py-3 flex justify-between items-center">
        <div class="flex flex-row gap-1">
          <img src="/airpod.png" class="w-10 h-6 cursor-pointer" alt="">
          <NuxtLink to="/apps/dashboard" class="text-lg font-bold gradient-text hover:opacity-80">
            Appstore MS
          </NuxtLink>
        </div>
      
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-400">"Admin"  </span>
        <button
          class="bg-emerald-600/30 hover:bg-emerald-500/40 px-3 py-1 rounded-md text-sm transition-colors"
        >
          <NuxtLink to="/apps/login">
            Logout
          </NuxtLink>
        </button>
      </div>
    </nav>

    <!-- Main Flex Container -->
    <div class="flex flex-1">

      <!-- Sidebar -->
      <aside class="w-52 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 p-4 rounded-tr-2xl rounded-br-2xl shadow-md shadow-emerald-900/20 flex flex-col">

        <p class="text-sm text-gray-400 mb-2">Products</p>
        <ul class="space-y-2">
          <li>
              <NuxtLink to="/apps/dashboard/articles/create">
                Create
              </NuxtLink>
          </li>
          <li>
              <NuxtLink to="/apps/dashboard/articles">
                Search
              </NuxtLink>
          </li>
        </ul>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-auto">
        <div class="bg-gray-800/40 backdrop-blur-md rounded-xl min-h-[80vh]">
          <slot />
        </div>
      </main>

    </div>
  </div>
</template>



<style scoped>
@reference "@/assets/css/main.css"; 
.gradient-text {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500;
}
</style>
