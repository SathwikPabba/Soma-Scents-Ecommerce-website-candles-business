export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Candle Loading Animation */}
        <div className="relative">
          <div className="w-8 h-16 bg-gradient-to-t from-orange-400 to-orange-200 rounded-t-full animate-pulse" />
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-orange-600 rounded-full animate-bounce" />
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
        </div>
        <div className="text-gray-600 font-medium animate-pulse">Loading...</div>
      </div>
    </div>
  )
}
