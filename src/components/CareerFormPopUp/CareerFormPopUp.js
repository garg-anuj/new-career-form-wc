import { toast, ToastContainer } from "react-toastify";
import { FaHandshake } from "react-icons/fa6";
import { useCallback, useMemo, useState } from "react";

import Heading from "./../Heading";
import InputCustom from "./../InputCustom";
import SelectOption from "./../SelectOption";
import PopUpCard from "./../PopUpCard/PopUpCard";

import validateForm from "./validation.helper";
import { EMPTY_OBJECT } from "../../../../../assets/constants";
import CAREER_FORM from "./careerOptions.constant";
import {
  PROCESS_MESSAGE,
  // SUCCESS_MESSAGES,
  ERROR_MESSAGE,
} from "../../assets/constant";
import { closeBtnStyle } from "../../../../styles/globalStyle";
import "./careerForm.css";
import { ButtonDarkBlue } from "./../ButtonDarkBlue";
import ThankYouMessage from "./../ThankYouMessage/index";

const popPupStyle = {
  flexDirection: "column",
  top: 0,
  left: 0,
  height: "100%",
};

const CareerFormPopUp = ({ isOpen, onClose, formName }) => {
  const INITIAL_FORM_VALUES = useMemo(
    () => ({
      name: "",
      phone: "",
      email: "",
      location: "",
      expectedPackage: "",
      currentPackage: "",
      experience: "",
      preferLocation: "",
      jobTitle: formName.trim(),
      photo: null,
      file: null,
    }),
    [formName]
  );

  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState({});
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
  const [isBtnDisable, setIsBtnDisable] = useState(false);

  const {
    name,
    phone,
    email,
    location,
    preferLocation,
    expectedPackage,
    currentPackage,
    experience,
    // photo,
    // file,
  } = formValues || EMPTY_OBJECT;

  const handleForm = useCallback(
    async (event) => {
      event.preventDefault();

      const validationErrors = validateForm(formValues);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setErrors({});
      const postUrl =
        "https://forms.zohopublic.com/wealthclinic/form/RecruitWebsite/formperma/6l1CQJLVvQipD4Ca4qP40re9Di3w1dDIRuHO7kTpB1s/htmlRecords/submit";
      // getFullUrl(API_URL.CAREER_FORM);
      // const formData = new FormData();
      const allFieldFormData = getFormData(formValues);

      // const payLoad = { ...formValues };
      // formData.append("data", JSON.stringify(payLoad));
      // if (photo) formData.append("files.photo", photo);
      // if (file) formData.append("files.file", file);

      try {
        setIsBtnDisable(true);
        // const response = await postMethod(
        //   "https://forms.zohopublic.coxm/wealthclinic/form/RecruitWebsite/formperma/6l1CQJLVvQipD4Ca4qP40re9Di3w1dDIRuHO7kTpB1s/htmlRecords/submit",
        //   formData,
        //   SUCCESS_MESSAGES.CAREER_FORM_SUBMISSION
        // );
        const response = await fetch(postUrl, {
          method: "POST",
          body: allFieldFormData,
        });
        if (response) {
          // toast.success("Career Form Submitted");
          setIsBtnDisable(false);
          setIsSuccessfullySubmitted(true);
          setFormValues(INITIAL_FORM_VALUES);
        }
      } catch (error) {
        toast.error(ERROR_MESSAGE.CAREER_FORM_SUBMISSION);
        setIsBtnDisable(false);
        toast.error("Career Form Submitted");
      }
    },
    [formValues, INITIAL_FORM_VALUES]
  );

  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    },
    [formValues]
  );

  const handleFileChange = useCallback(
    (event) => {
      const { name, files } = event.target;
      setFormValues({ ...formValues, [name]: files[0] });
    },
    [formValues]
  );

  const handleThankYouComplete = useCallback(() => {
    setIsSuccessfullySubmitted(false);
    onClose();
  }, [onClose]);

  return (
    <PopUpCard
      isOpen={isOpen}
      onClose={onClose}
      className="center-item px-3"
      style={popPupStyle}
      removeBtn={false}
    >
      <div className="career-form position-hc px-3">
        <button style={closeBtnStyle} onClick={onClose}>
          X
        </button>
        <div className="careerFormHeading">
          <div className="px-3 fs-2 text-light center-item">
            <FaHandshake />
          </div>
          <Heading
            text={"Job Application Form"}
            color="#fff"
            fontSize="1.5rem"
            className="fs-6 fs-lg-1 fs-md-1"
          />
        </div>

        <form
          className="row"
          onSubmit={handleForm}
          accept-charset="UTF-8"
          enctype="multipart/form-data"
        >
          <div className="col-md-6">
            <InputCustom
              className="px-3 rounded-1"
              placeholder={"Full Name"}
              name="name"
              value={name}
              onChange={handleInputChange}
              // required
            />
            {errors.name && <div className="alertMsg">{errors.name}</div>}
          </div>

          <div className="col-md-6">
            <InputCustom
              className="px-3 rounded-1"
              name="phone"
              value={phone}
              placeholder={"Contact No."}
              onChange={handleInputChange}
              // required
            />
            {errors.phone && <div className="alertMsg">{errors.phone}</div>}
          </div>

          <div className="col-md-6">
            <InputCustom
              className="px-3 rounded-1"
              placeholder={"Email"}
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="alertMsg">{errors.email}</div>}
          </div>

          <div className="col-md-6">
            <SelectOption
              className="px-3 rounded-1"
              selectText={"Select Experience"}
              data={CAREER_FORM?.EXPERIENCE_OPTIONS}
              name="experience"
              value={experience}
              onChange={handleInputChange}
            />
            {/* <InputCustom
              className="px-3 rounded-1"
              placeholder={"Total Experience In Years"}
              name="experience"
              value={experience}
              onChange={handleInputChange}
              type="number"
            /> */}
            {errors.experience && (
              <div className="alertMsg">{errors.experience}</div>
            )}
          </div>

          <div className="col-md-6">
            <InputCustom
              className="px-3 rounded-1"
              placeholder="Current CTC In Lakhs"
              name="currentPackage"
              value={currentPackage}
              type="number"
              onChange={handleInputChange}
            />
            {errors.currentPackage && (
              <div className="alertMsg">{errors.currentPackage}</div>
            )}
          </div>

          <div className="col-md-6">
            {/* <SelectOption
              className="px-3 rounded-1"
              data={CAREER_FORM?.CURRENT_PACKAGES_OPTIONS}
              selectText={"Select Package"}
              name="expectedPackage"
              value={expectedPackage}
              onChange={handleInputChange}
            /> */}
            <InputCustom
              className="px-3 rounded-1"
              placeholder="Expected CTC In Lakhs"
              name="expectedPackage"
              value={expectedPackage}
              type="number"
              onChange={handleInputChange}
            />
            {errors.expectedPackage && (
              <div className="alertMsg">{errors.expectedPackage}</div>
            )}
          </div>

          <div className="col-md-6">
            <InputCustom
              className="px-3 rounded-1"
              placeholder={"Your Current Location"}
              name="location"
              value={location}
              onChange={handleInputChange}
            />
            {errors.location && (
              <div className="alertMsg mb-2">{errors.location}</div>
            )}
          </div>

          <div className="col-md-6">
            {/* <SelectOption
              className="px-3 rounded-1"
              selectText={"Select Job Title"}
              data={CAREER_FORM?.JOB_TITLE_OPTIONS}
              name="jobTitle"
              value={jobTitle}
              onChange={handleInputChange}
            /> */}
            <SelectOption
              className="px-3 rounded-1"
              selectText={"Select Preferred Job Location"}
              data={CAREER_FORM?.LOCATIONS_OPTIONS}
              name="preferLocation"
              value={preferLocation}
              onChange={handleInputChange}
            />
            {errors.preferLocation && (
              <div className="alertMsg mb-1">{errors.preferLocation}</div>
            )}
          </div>

          <div className="row p-0 m-0">
            <div className="col-md-6">
              <div className="selectFileBox">
                <label>Upload Your Photo</label>
                <InputCustom
                  className="px-3 rounded-1 inputFile"
                  placeholder={"Latest Passport Size Photo"}
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              {errors.photo && (
                <div className="alertMsg my-1">{errors.photo}</div>
              )}
            </div>
            <div className="col-md-6">
              <div className="selectFileBox">
                <label> Upload Your Resume</label>
                <InputCustom
                  className="px-3 rounded-1 inputFile"
                  placeholder={"Upload CV*"}
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                />
              </div>
              {errors.file && (
                <div className="alertMsg my-1">{errors.file}</div>
              )}
            </div>
          </div>

          <ButtonDarkBlue
            name={
              isBtnDisable
                ? PROCESS_MESSAGE.FORM_SUBMISSION_IN_PROGRESS
                : "Submit"
            }
            className={"w-50 center-item rounded-1"}
            style={{
              position: "relative",
              left: "50% ",
              transform: "translateX(-50%)",
              backgroundColor: "#000",
            }}
            disabled={isBtnDisable}
          />
        </form>
        {isSuccessfullySubmitted && (
          <ThankYouMessage onComplete={handleThankYouComplete} />
        )}
      </div>
      <ToastContainer />
    </PopUpCard>
  );
};

export default CareerFormPopUp;

export function getFormData(formValues) {
  const formData = new FormData();

  const {
    name,
    phone,
    email,
    location,
    preferLocation,
    expectedPackage,
    currentPackage,
    experience,
    photo,
    file,
    jobTitle,
  } = formValues || EMPTY_OBJECT;

  formData.append("SingleLine", name);
  formData.append("PhoneNumber_countrycode", phone);
  formData.append("Email", email);
  formData.append("Dropdown3", experience);
  formData.append("Currency", currentPackage); // Current CTC
  formData.append("Currency1", expectedPackage); // Expected CTC
  formData.append("SingleLine1", location); // Current Location
  formData.append("SingleLine2", jobTitle); //job SingleLine2
  formData.append("Dropdown", preferLocation); // Preferred Job Location
  formData.append("Dropdown1", "Website"); // Source Website
  formData.append("Dropdown2", "New"); // Candidate Status
  if (photo) formData.append("ImageUpload", photo);
  if (file) formData.append("FileUpload", file);

  return formData;
}
