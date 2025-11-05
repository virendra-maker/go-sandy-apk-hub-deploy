import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Download, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function APKListing() {
  const { data: apks, isLoading } = trpc.apk.list.useQuery();
  const { data: categories } = trpc.category.list.useQuery();
  const downloadMutation = trpc.apk.download.useMutation();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredApks = selectedCategory
    ? apks?.filter((apk) => apk.categoryId === selectedCategory)
    : apks;

  const handleDownload = async (apkId: number, apkName: string) => {
    try {
      const result = await downloadMutation.mutateAsync({ id: apkId });
      if (result.url) {
        window.location.href = result.url;
        toast.success(`Downloading ${apkName}...`);
      }
    } catch (error) {
      toast.error("Failed to download APK");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-25 to-red-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-red-500">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Go Sandy APK Hub</h1>
          </div>
          <nav className="flex gap-4">
            <Link href="/">
              <Button variant="ghost" className="hover:text-red-600 hover:bg-red-50">Home</Button>
            </Link>
            <Button variant="ghost" className="hover:text-red-600 hover:bg-red-50">About</Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4">
            Download APKs for Go Sandy
          </h2>
          <p className="text-lg text-gray-700">
            Browse and download the latest APK files
          </p>
        </div>

        {/* Categories Filter */}
        {categories && categories.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-red-700 mb-5">Categories</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "bg-red-600 hover:bg-red-700 text-white" : "border-red-300 text-red-600 hover:bg-red-50"}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-red-600 hover:bg-red-700 text-white" : "border-red-300 text-red-600 hover:bg-red-50"}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* APK Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">Loading APKs...</p>
            </div>
          ) : filteredApks && filteredApks.length > 0 ? (
            filteredApks.map((apk) => (
              <Card key={apk.id} className="border-2 border-red-200 hover:border-red-500 hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader>
                  {apk.photoUrl && (
                    <img
                      src={apk.photoUrl}
                      alt={apk.name}
                      className="w-full h-40 object-cover rounded-lg mb-4 border border-red-200"
                    />
                  )}
                  <CardTitle className="text-xl text-red-700">{apk.name}</CardTitle>
                  <p className="text-sm text-red-500 font-semibold">v{apk.version}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {apk.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {apk.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center text-xs text-gray-500 bg-red-50 p-2 rounded">
                    <span className="font-semibold">Downloads: {apk.downloadCount || 0}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleDownload(apk.id, apk.name)}
                      disabled={downloadMutation.isPending}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Link href={`/apk/${apk.id}`}>
                      <Button variant="outline" className="flex-1 border-red-500 text-red-600 hover:bg-red-50">
                        Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No APKs available</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-900 to-red-800 text-white mt-16">
        <div className="container mx-auto px-4 py-10 text-center">
          <p className="text-red-100">&copy; 2025 Go Sandy APK Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
