import styles from "./molecules.module.css";

const SelectOption =({ id, data, value, selectText, ...props }) => {
  // const [selectOption, setSelectOption] = useState("");
  return (
    <div className={`${styles.customSelect} `}>
      <select id={id} value={value} {...props}>
        {value ? value : <option value="">{selectText}</option>}
        {data.map((ele, idx) => (
          <option value={ele} key={idx}>
            {ele}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOption;
