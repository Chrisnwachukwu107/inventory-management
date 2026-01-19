
export default function InventoryTableSkeleton() {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-12 border-b border-gray-200 bg-gray-100"
        />
      ))}
    </div>
  );
}
