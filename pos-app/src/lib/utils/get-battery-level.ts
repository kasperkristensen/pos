export const getBatteryLevel = (batteryLevel?: number) => {
  if (!batteryLevel) {
    return 0
  }

  return (batteryLevel * 100).toFixed(0)
}
