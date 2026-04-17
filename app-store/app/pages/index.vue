<script setup lang="ts">
import { onMounted } from "vue"

onMounted(() => {
  navigateTo("/apps/login", { replace: true })
})

</script>

<template>
  <div class="p-4 text-center text-gray-500">
    Redirecting...
  </div>
</template>
