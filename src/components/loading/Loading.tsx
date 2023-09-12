const Loading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-30"></div>
      <div className="w-16 h-16 relative">
        <div className="absolute top-0 w-full h-full rounded-full opacity-75 animate-pulse"></div>
        <div className="absolute top-0 w-full h-full rounded-full border-4 border-white border-t-4 border-t-primary border-opacity-50 animate-spin"></div>
      </div>
    </div>
  )
}

export default Loading
