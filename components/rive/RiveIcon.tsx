"use client";

import { useRive } from "@rive-app/react-canvas";

interface RiveIconProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
}

export function RiveIcon({
  src,
  width = 80,
  height = 80,
  className,
}: RiveIconProps) {
  const { RiveComponent } = useRive({
    src,
    autoplay: true,
  });

  return (
    <div className={className}>
      <RiveComponent style={{ width, height }} />
    </div>
  );
}
