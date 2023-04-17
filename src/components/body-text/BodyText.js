import './body-text.scss'

const BodyText = ({ children, className }) => {
    return (
      <p className={`body ${className}`}>{children}</p>
    );
  };
  
  export { BodyText };
  