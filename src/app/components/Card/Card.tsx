interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-white/5 p-5 rounded-lg border-white/10 border border-solid${className !== undefined ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
