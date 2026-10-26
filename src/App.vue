<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTheme } from "@/composables/useTheme";

const mode = useTheme();
</script>

<template>
  <TooltipProvider>
    <router-view />
    <Toaster position="top-center" :theme="mode === 'dark' ? 'dark' : 'light'" />
  </TooltipProvider>
</template>
