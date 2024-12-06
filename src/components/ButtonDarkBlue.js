import styles from "./button.module.css";

export const ButtonDarkBlue = ({ name, style, className, ...props }) => {
  return (
    <button
      className={`${styles.darkBlueButton} ${className} `}
      style={style}
      {...props}
    >
      {name}
    </button>
  );
};

export default ButtonDarkBlue;
