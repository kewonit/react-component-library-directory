import { LoadingSpinner } from "./components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[60vh]">
      <LoadingSpinner size="lg" color="primary" />
    </div>
  );
}
