import styles from "./molecules.module.css";

const InputCustom = ({
  placeholder,
  name,
  className,
  value,
  type,
  ...props
}) => {
  return (
    <div className={styles.customInput}>
      <input
        placeholder={placeholder}
        name={name ? name : null}
        className={`${className} ${styles.customInput}`}
        value={value}
        type={type ? type : "text"}
        // required
        {...props}
      />
    </div>
  );
};

export default InputCustom;
