export async function isOnlineTest() {
  if (!window.navigator.onLine) return false

  const response = await fetch(window.location.origin, { method: "HEAD" })

  return response.ok
}
