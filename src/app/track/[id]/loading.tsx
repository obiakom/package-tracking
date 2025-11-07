export default function TrackingLoading() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-10 w-48 bg-gray-200 rounded mb-8"></div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <div className="mb-6">
              <div className="h-6 w-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
              <div className="h-5 w-56 bg-gray-200 rounded"></div>
            </div>

            <div className="border-t pt-6">
              <div className="h-6 w-40 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-gray-200"></div>
                    <div>
                      <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-48 bg-gray-200 rounded mb-1"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}