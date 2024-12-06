import { useEffect, useState } from "react";
import { PiSealCheckFill } from "react-icons/pi";
import PropTypes from "prop-types";

import "./thankYouMessage.css";

const ThankYouMessage = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const thankMsgTimer = setTimeout(() => {
      setIsVisible(false);
      if (typeof onComplete === "function") {
        onComplete();
      }
    }, 2000);

    return () => clearTimeout(thankMsgTimer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="thankYouForm">
      {/* <img
        src={
          "https://img.freepik.com/free-vector/thank-you-card-with-vintage-flowers_1361-1676.jpg?t=st=1729773722~exp=1729777322~hmac=639887a1f526b4864bc8748021819ee25fbe7a1dd7ea4a5396edb87bd08d2b33&w=1060"
        }
        alt="thank you img"
        className="img-fluid"
      /> */}
      <div>
        <PiSealCheckFill className="thank-icons" />
      </div>

      <div className="center-item p-3">
        <div className="fs-5 center-item text-center">
          Thank You For Submitting Form
        </div>
      </div>
    </div>
  );
};

export default ThankYouMessage;

ThankYouMessage.propTypes = {
  onComplete: PropTypes.func,
};
