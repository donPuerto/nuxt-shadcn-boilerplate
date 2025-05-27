<!-- pages/dashboard/index.vue -->
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p class="text-muted-foreground">Welcome back! Here's an overview of your data.</p>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline">
          <i class="i-lucide-download mr-2 h-4 w-4" />
          Export
        </Button>
        <Button>
          <i class="i-lucide-plus mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
    
    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
          <i class="i-lucide-dollar-sign h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">$45,231.89</div>
          <p class="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Subscriptions</CardTitle>
          <i class="i-lucide-users h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">+2350</div>
          <p class="text-xs text-muted-foreground">+180.1% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Sales</CardTitle>
          <i class="i-lucide-credit-card h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">+12,234</div>
          <p class="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Active Now</CardTitle>
          <i class="i-lucide-activity h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">+573</div>
          <p class="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>
    </div>
    
    <!-- Main Content Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <!-- Chart (Spans 5 columns on large screens) -->
      <Card class="lg:col-span-5">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
            <p class="text-muted-foreground">Chart Placeholder</p>
          </div>
        </CardContent>
      </Card>
      
      <!-- Recent Sales (Spans 2 columns on large screens) -->
      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>You made 265 sales this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-for="i in 5" :key="i" class="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div class="flex-1 space-y-1">
                <p class="text-sm font-medium leading-none">User Name</p>
                <p class="text-xs text-muted-foreground">user@example.com</p>
              </div>
              <div class="text-sm font-medium">+$250.00</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard/default'
});
</script>
