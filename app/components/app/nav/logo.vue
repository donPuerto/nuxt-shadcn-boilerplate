<script setup lang="ts"></script>

<template>
  <div class="inline-block">
    <div class="flex items-center justify-center space-x-2 md:space-x-3">
      <div
        class="logo-circle relative flex items-center justify-center rounded-full border-2 bg-primary transition-all duration-300 ease-in-out overflow-hidden shadow-md hover:shadow-lg"
      >
        <NuxtImg
          class="logo-image w-13 h-13 sm:w-16 sm:h-16 object-contain filter grayscale-[20%] hover:grayscale-0 dark:grayscale-[20%] dark:hover:grayscale-0 transition-all duration-300 ease-in-out hover:scale-105"
          src="/logo.png"
          alt="Logo"
          width="559"
          height="560"
          format="webp"
          quality="90"
          loading="eager"
          sizes="64px md:96px"
        />

        <!-- <img src="/logo.png"> -->
         <!-- <NuxtImg src="/logo-test.png" /> -->

      </div>

      <div class="text-block text-left">
        <div
          class="font-heading text-[1.8rem] sm:text-[2.25rem] text-foreground -mt-1 -mb-1 sm:-mb-2"
        >
          Don Puerto
        </div>
        <div class="text-[0.72rem] sm:text-[0.9rem] text-foreground">
          Fullstack Developer
        </div>
      </div>
    </div>
  </div>
</template>
