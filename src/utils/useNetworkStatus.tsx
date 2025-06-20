import { useEffect, useState } from "react"

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null)

  const updateNetworkStatus = () => {
    console.log("updateNetworkStatus", navigator.onLine)
    setIsOnline(navigator.onLine)
  }

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return
    }

    // Set initial network status
    updateNetworkStatus()

    // Add event listeners
    window.addEventListener("online", updateNetworkStatus)
    window.addEventListener("offline", updateNetworkStatus)

    return () => {
      window.removeEventListener("online", updateNetworkStatus)
      window.removeEventListener("offline", updateNetworkStatus)
    }
  }, [])

  // Return true if still initializing (null), otherwise return actual status
  return isOnline ?? true
}
