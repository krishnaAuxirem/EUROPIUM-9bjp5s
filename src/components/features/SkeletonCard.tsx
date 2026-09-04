interface SkeletonCardProps {
  lines?: number;
  hasImage?: boolean;
  count?: number;
}

function Single({ lines = 3, hasImage = true }: { lines?: number; hasImage?: boolean }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      {hasImage && <div className="skeleton h-40 w-full rounded-xl mb-4" />}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className={`skeleton h-4 rounded-lg ${i === 0 ? "w-3/4" : i === lines - 1 ? "w-1/2" : "w-full"}`} />
        ))}
      </div>
    </div>
  );
}

export default function SkeletonCard({ lines = 3, hasImage = true, count = 1 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Single key={i} lines={lines} hasImage={hasImage} />
      ))}
    </>
  );
}
