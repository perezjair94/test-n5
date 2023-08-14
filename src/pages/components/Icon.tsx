import React from "react";
import * as Icons from "lucide-react";

export interface IconProps {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon = ({
  name,
  size = 16,
  color = "currentColor",
  className,
}: IconProps): JSX.Element | null => {
  const Icon = Icons[name] as React.FunctionComponent<Icons.LucideProps>;
  return <Icon size={size} color={color} className={className} />;
};
