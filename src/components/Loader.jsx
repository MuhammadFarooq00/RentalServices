import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative w-full flex flex-col items-center justify-center">
        <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin">
          <div className="absolute w-20 h-20 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-gray-700">Loading</p>
          <p className="text-sm text-gray-500">Please wait while we fetch rental services...</p>
        </div>
      </div>
    </div>
  )
}

export default Loader
