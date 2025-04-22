<template>
  <NuxtLoadingIndicator :color="false" class="z-100 bg-primary/80" />
  <header class="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
    
    <div class="flex h-14 w-full items-center gap-2 px-4">

      <slot />
    </div>
  </header>
 
</template>

