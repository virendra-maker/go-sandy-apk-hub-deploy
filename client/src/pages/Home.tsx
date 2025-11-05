import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Package, Shield, Download, Zap } from "lucide-react";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-25 to-red-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-red-500">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {APP_LOGO && <img src={APP_LOGO} alt="Logo" className="h-10 w-10 rounded-lg shadow-md" />}
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">{APP_TITLE}</h1>
          </div>
          <nav className="flex gap-4 items-center">
            <Link href="/apks">
              <Button variant="ghost" className="hover:text-red-600 hover:bg-red-50">Browse APKs</Button>
            </Link>
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <Link href="/admin">
                    <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">Admin Panel</Button>
                  </Link>
                )}
                <Button variant="ghost" onClick={logout} className="hover:text-red-600 hover:bg-red-50">
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                <a href={getLoginUrl()}>Login</a>
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-6xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-6">
          Go Sandy APK Hub
        </h2>
        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
          Download the latest APK files for Go Sandy. Browse our collection,
          view detailed information, and get instant downloads.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/apks">
            <Button size="lg" className="gap-2 bg-red-600 hover:bg-red-700 text-white shadow-lg">
              <Download className="h-5 w-5" />
              Browse APKs
            </Button>
          </Link>
          {!isAuthenticated && (
            <Button size="lg" variant="outline" asChild className="border-2 border-red-600 text-red-600 hover:bg-red-50">
              <a href={getLoginUrl()}>Sign In</a>
            </Button>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-bold text-center mb-14 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-2 border-red-200 hover:border-red-500 hover:shadow-xl transition-all duration-300 bg-white">
            <CardHeader className="text-center">
              <Package className="h-14 w-14 mx-auto text-red-600 mb-3" />
              <CardTitle className="text-red-700">Easy Downloads</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              Download APKs with a single click. Fast and reliable downloads.
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 hover:border-red-500 hover:shadow-xl transition-all duration-300 bg-white">
            <CardHeader className="text-center">
              <Zap className="h-14 w-14 mx-auto text-red-600 mb-3" />
              <CardTitle className="text-red-700">Latest Versions</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              Always get the latest and greatest versions of your favorite apps.
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 hover:border-red-500 hover:shadow-xl transition-all duration-300 bg-white">
            <CardHeader className="text-center">
              <Shield className="h-14 w-14 mx-auto text-red-600 mb-3" />
              <CardTitle className="text-red-700">Safe & Secure</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              All APKs are carefully curated and verified for your safety.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Admin Section */}
      {isAuthenticated && user?.role === "admin" && (
        <section className="container mx-auto px-4 py-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-xl text-white">
          <h3 className="text-3xl font-bold mb-4">Admin Tools</h3>
          <p className="text-red-50 mb-6 text-lg">
            Manage APKs, upload new versions, and track downloads.
          </p>
          <Link href="/admin">
            <Button className="bg-white text-red-600 hover:bg-red-50 font-semibold">Go to Admin Panel</Button>
          </Link>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-900 to-red-800 text-white mt-16">
        <div className="container mx-auto px-4 py-10 text-center">
          <p className="text-red-100">&copy; 2025 Go Sandy APK Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
