import React from "react";

interface ReactiveButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  dark?: boolean;
}

const ReactiveButton: React.FC<ReactiveButtonProps> = ({ children, className = "", onClick, dark = false}) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  };

  return (
    <button
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`${dark ? `button-dark` : `button`} relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: dark ? `linear-gradient(90deg, color-mix(in oklch, var(--accent) 60%, transparent), color-mix(in oklch, var(--secondary) 60%, transparent))` : ""
      }}
    >
      <span className="relative z-10 font-semibold text-white">{children}</span>
    </button>
  );
};

export default ReactiveButton;