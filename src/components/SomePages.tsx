import { useNetworkStatus } from "../utils/useNetworkStatus"

export default function SomePageComponent() {
  console.log("page")
  const isOnline = useNetworkStatus()

  console.log(isOnline)

  return <div>Some page</div>
}
