export default defineNuxtPlugin(() => {
  const { direction } = useDirection()
  document.documentElement.setAttribute('dir', direction.value)
})
