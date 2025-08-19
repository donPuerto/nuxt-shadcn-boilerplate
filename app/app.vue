<template>
  <div>
    <NuxtLink to="/">Home</NuxtLink> <br>
    <NuxtLink to="/docs/getting-started">Documentation</NuxtLink>
  </div>
</template>
<style scoped>
nav {
  padding: 1rem;
}

nav a {
  margin-right: 1rem;
  text-decoration: none;
}

nav a.router-link-active {
  font-weight: bold;
}
</style>
