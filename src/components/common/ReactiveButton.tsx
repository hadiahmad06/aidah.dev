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
      className={`${dark ? `button-dark` : `button`} relative overflow-hidden px-6 py-3 rounded-2xl ${className}`}
    >
      <span className="relative z-10 font-semibold text-white">{children}</span>
    </button>
  );
};

export default ReactiveButton;