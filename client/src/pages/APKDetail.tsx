import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Download, Package, ArrowLeft } from "lucide-react";
import { useRoute, Link } from "wouter";
import { toast } from "sonner";

export default function APKDetail() {
  const [match, params] = useRoute("/apk/:id");
  const apkId = params?.id ? parseInt(params.id) : null;

  const { data: apk, isLoading } = trpc.apk.getById.useQuery(
    { id: apkId! },
    { enabled: !!apkId }
  );
  const downloadMutation = trpc.apk.download.useMutation();

  const handleDownload = async () => {
    if (!apk) return;
    try {
      const result = await downloadMutation.mutateAsync({ id: apk.id });
      if (result.url) {
        window.location.href = result.url;
        toast.success(`Downloading ${apk.name}...`);
      }
    } catch (error) {
      toast.error("Failed to download APK");
    }
  };

  if (!match) return <div>Not found</div>;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <p className="text-gray-500">Loading APK details...</p>
      </div>
    );
  }

  if (!apk) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 hover:text-red-600 hover:bg-red-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to APKs
            </Button>
          </Link>
          <Card className="border-2 border-red-200">
            <CardContent className="pt-6 text-center text-gray-500">
              APK not found
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-25 to-red-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-red-500">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Package className="h-8 w-8 text-red-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Go Sandy APK Hub</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 hover:text-red-600 hover:bg-red-50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to APKs
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Image Section */}
          <div className="md:col-span-1">
            {apk.photoUrl ? (
              <img
                src={apk.photoUrl}
                alt={apk.name}
                className="w-full rounded-lg shadow-lg border-2 border-red-200"
              />
            ) : (
              <div className="w-full bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center h-64 border-2 border-red-300">
                <Package className="h-16 w-16 text-red-400" />
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="md:col-span-2">
            <Card className="border-2 border-red-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b-2 border-red-200">
                <CardTitle className="text-4xl bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">{apk.name}</CardTitle>
                <p className="text-lg text-red-600 font-semibold mt-2">Version {apk.version}</p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {apk.description && (
                  <div>
                    <h3 className="font-bold text-lg text-red-700 mb-3">Description</h3>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {apk.description}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 py-6 border-y-2 border-red-200 bg-red-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-red-600 font-semibold">Downloads</p>
                    <p className="text-3xl font-bold text-red-700">{apk.downloadCount || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-red-600 font-semibold">File Size</p>
                    <p className="text-3xl font-bold text-red-700">
                      {apk.fileSize ? `${(apk.fileSize / 1024 / 1024).toFixed(2)} MB` : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full py-6 text-lg bg-red-600 hover:bg-red-700 text-white shadow-lg"
                    onClick={handleDownload}
                    disabled={downloadMutation.isPending}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    {downloadMutation.isPending ? "Downloading..." : "Download APK"}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    By downloading, you agree to our terms and conditions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-900 to-red-800 text-white mt-12">
        <div className="container mx-auto px-4 py-10 text-center">
          <p className="text-red-100">&copy; 2025 Go Sandy APK Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
