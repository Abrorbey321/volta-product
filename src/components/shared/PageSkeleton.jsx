export default function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
      {/* Sarlavha uchun skeleton */}
      <div className="h-8 w-48 bg-muted rounded-lg mb-8" />
      
      {/* Mahsulotlar setkasi (Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="space-y-3">
            {/* Rasm uchun joy */}
            <div className="h-56 bg-muted rounded-2xl" />
            
            {/* Matn satrlari uchun joy */}
            <div className="h-4 w-3/4 bg-muted rounded" />
            <div className="h-4 w-1/2 bg-muted rounded" />
            
            {/* Narx yoki tugma uchun joy */}
            <div className="h-6 w-1/3 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}