<template>
  <div class="flex items-center justify-center">
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent class="w-80">
        <div class="grid gap-4">
          <div class="space-y-2">
            <h4 class="font-medium leading-none">Dimensions</h4>
            <p class="text-sm text-muted-foreground">
              Set the dimensions for the layer
            </p>
          </div>
          <div class="grid gap-2">
            <div class="grid grid-cols-3 items-center gap-4">
              <Label html-for="width">Width</Label>
              <Input
                id="width"
                default-value="100%"
                class="col-span-2 h-8"
              />
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <Label html-for="height">Height</Label>
              <Input
                id="height"
                default-value="25px"
                class="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>  </div>
</template>

<script setup lang="ts">
// Auto-imports should handle components
</script>
