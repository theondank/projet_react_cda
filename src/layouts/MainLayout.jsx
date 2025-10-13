import { cn } from "@utils/utils";

export function MainLayout({
  children,
  className,
  title,
  subtitle,
  icon = "🍳",
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">👨‍🍳</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mes Recettes
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <span className="text-xl">🔍</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <span className="text-xl">❤️</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <span className="text-xl">👤</span>
              </button>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          {(title || subtitle) && (
            <div className="text-center mb-8">
              {icon && (
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-4">
                  <span className="text-2xl text-white">{icon}</span>
                </div>
              )}
              {title && (
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {title}
                </h1>
              )}
              {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
            </div>
          )}

          {/* Content Container */}
          <div className={cn("", className)}>{children}</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-purple-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <span className="text-2xl">🍳</span>
              <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mes Recettes
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Créé avec ❤️ pour les passionnés de cuisine
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <button className="text-gray-500 hover:text-purple-600 transition-colors">
                <span className="text-lg">📧</span>
              </button>
              <button className="text-gray-500 hover:text-purple-600 transition-colors">
                <span className="text-lg">📱</span>
              </button>
              <button className="text-gray-500 hover:text-purple-600 transition-colors">
                <span className="text-lg">💬</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
