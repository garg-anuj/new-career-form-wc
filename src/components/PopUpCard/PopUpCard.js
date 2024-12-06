import { closeBtnStyle } from "../../styles/globalStyle";
import "./popUpCard.css";

// const popUpCard = {
//   position: "fixed",
//   zIndex: "9999999999",
//   backgroundColor: "rgba(0, 0, 0, 0.3)",
//   padding: "3rem",
// };

const PopUpCard = ({
  children,
  className,
  style,
  PopUpBtnStyle,
  isOpen,
  onClose,
  removeBtn = true,
  popUpInnerBoxClass,
}) => {
  if (!isOpen) return null;
  return (
    <div className={`${className} popUpCard`} style={style}>
      <div className={popUpInnerBoxClass}>
        {removeBtn && (
          <button style={{ ...closeBtnStyle, PopUpBtnStyle }} onClick={onClose}>
            X
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default PopUpCard;
