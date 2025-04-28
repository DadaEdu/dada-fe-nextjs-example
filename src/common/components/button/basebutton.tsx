"use client";

interface BaseButtonProps {
  onClick: () => void;
}

export default function BaseButton({ onClick }: BaseButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick();
  };

  return { handleClick };
}
