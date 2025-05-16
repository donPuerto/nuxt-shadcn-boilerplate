<template>
  <div>
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="ghost" size="icon">
          <Icon 
            name="lucide:paintbrush" 
            class="h-[1.2rem] w-[1.2rem] transition-all" 
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        class="w-[23rem]"
        :align="breakpoints.isGreaterOrEqual('md') ? 'end' : 'center'"
        side="bottom"
      >
        <ThemeCustomizer />
      </PopoverContent>
    </Popover>
  </div>
  
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);

</script>

<style scoped>

</style>
