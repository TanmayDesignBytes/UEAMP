import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  variant?: "sm" | "md" | "lg";
};

const variants = {
  sm: "/assets/glass-card.svg",
  md: "/assets/glass-card.svg",
  lg: "/assets/glass-card.svg",
};

export default function GlassCard({
  children,
  className = "",
  variant = "sm",
}: GlassCardProps) {
  return (
    <article className={`glass-card ${className}`}>
      <img
        src={variants[variant]}
        className="glass-card-bg"
        alt=""
        aria-hidden="true"
      />

      <div className="glass-card-content">
        {children}
      </div>
    </article>
  );
}