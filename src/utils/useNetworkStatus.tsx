import { useEffect, useRef, useState } from "react"
import axios from "axios"

const intervalMs = 1000 * 10
const url = "/api/ping"
const timeout = 1000 * 60
const retry = 1000 * 10

export function useNetworkStatus() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const waitingRef = useRef(false)
  const [online, setOnline] = useState(true) // state เผื่อ component อยากรู้

  const stopPing = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startPing = () => {
    console.log("start oing")
    if (intervalRef.current) return

    intervalRef.current = setInterval(async () => {
      try {
        await axios.get(url, { timeout })
        if (!online) {
          setOnline(true)
        }
      } catch (error: unknown) {
        console.log(error)
        setOnline(false)
        stopPing()
        waitForNetwork()
      }
    }, intervalMs)
  }

  const waitForNetwork = () => {
    if (waitingRef.current) return
    waitingRef.current = true

    const tryReconnect = async () => {
      try {
        await axios.get(url, { timeout })
        console.log("📡 Network restored!")
        waitingRef.current = false
        setOnline(true)
        startPing()
      } catch {
        setTimeout(tryReconnect, retry) // ลองใหม่ทุก 3 วิ
      }
    }

    tryReconnect()
  }

  useEffect(() => {
    startPing()

    return () => {
      stopPing()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return online
}
