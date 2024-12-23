import React from 'react'

// Hàm HOC withRouting
export function withRouting<P>(WrappedComponent: React.ComponentType<P & { routing: ReturnType<typeof useRouting> }>) {
  function WithRouting(props: P) {
    const routing = useRouting()

    // Đảm bảo `routing` luôn được truyền vào
    if (!routing) {
      console.error('useRouting returned null or undefined.')
      return null // Hoặc render một fallback UI
    }

    return <WrappedComponent {...props} routing={routing} />
  }

  // Đặt tên hiển thị cho HOC trong React DevTools
  WithRouting.displayName = `WithRouting(${getDisplayName(WrappedComponent)})`

  return WithRouting
}

// Helper để lấy tên component
function getDisplayName(Component: React.ComponentType<any>) {
  return Component.displayName || Component.name || 'Component'
}

// Giả định hook useRouting
function useRouting() {
  return {
    navigate: (path: string) => console.log(`Navigating to ${path}`)
  }
}
