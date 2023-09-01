interface CardSectionProps {
  children?: React.ReactNode;
  className?: string;
}

const CardSection: React.FC<CardSectionProps> = ({ children, className, ...props }) => {
  return (
    <section className={`flex items-start w-full${className !== undefined ? ` ${className}` : ""}`} {...props}>
      {children}
    </section>
  );
};

export default CardSection;
