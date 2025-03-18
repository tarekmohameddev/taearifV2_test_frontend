import { BarChart3, LineChart } from "lucide-react";

interface ChartPlaceholderProps {
  title?: string;
  description?: string;
  icon?: "line" | "bar";
  height?: number | string;
  className?: string;
}

export function ChartPlaceholder({
  title,
  description,
  icon = "line",
  height = 300,
  className,
}: ChartPlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 text-muted-foreground ${className}`}
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      {icon === "line" ? (
        <LineChart className="h-16 w-16" />
      ) : (
        <BarChart3 className="h-16 w-16" />
      )}
      <p className="text-sm">سيظهر هنا رسم بياني للبيانات</p>
      {title && <p className="font-medium">{title}</p>}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
