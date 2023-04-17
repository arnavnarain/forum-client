import './heading.scss';

const Heading = ({ children, className }) => {
  return (
    <h1 className={`heading ${className}`}>{children}</h1>
  );
};

export { Heading };
