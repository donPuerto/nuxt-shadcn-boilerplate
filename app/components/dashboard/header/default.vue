<!-- components/dashboard/header/default.vue -->
<template>
  <header class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="flex h-16 items-center px-4 gap-4">
      <!-- Logo/Brand -->
      <div class="flex items-center gap-2">
        <AppNavigationLogo />
        <span class="font-bold text-xl">Dashboard</span>
      </div>
      
      <!-- Mobile sidebar toggle -->
      <Button variant="ghost" size="icon" class="md:hidden" @click="emit('toggleSidebar')">
        <i class="i-lucide-menu h-5 w-5" />
      </Button>
      
      <!-- Search -->
      <div class="flex-1 max-w-md">
        <Command class-name="rounded-lg border shadow-sm w-full">
          <CommandInput placeholder="Search..." />
        </Command>
      </div>
      
      <!-- Spacer for right-aligned items -->
      <div class="flex-1 md:hidden"/>
      
      <!-- Right side actions -->
      <div class="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <i class="i-lucide-bell h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <i class="i-lucide-user mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <i class="i-lucide-settings mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <i class="i-lucide-log-out mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <ModeSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup>
const emit = defineEmits(['toggleSidebar']);
</script>
