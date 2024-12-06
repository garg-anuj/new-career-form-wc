export function validateForm(formData) {
  const newErrors = {};
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
  } = formData;

  if (!name.trim()) newErrors.name = "Name is required.";

  if (!phone.trim()) {
    newErrors.phone = "Phone number is required.";
  } else if (!/^\d{10}$/.test(phone)) {
    newErrors.phone = "Phone number must be exactly 10 digits.";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email address.";
  }

  if (!location.trim()) newErrors.location = "Location is required.";

  if (!preferLocation.trim())
    newErrors.preferLocation = "Please select a preferred location.";

  if (experience === null || experience === "") {
    newErrors.experience = "Experience is required.";
  }

  if (currentPackage === "") {
    newErrors.currentPackage = "Current package is required.";
  }

  if (expectedPackage === "") {
    newErrors.expectedPackage = "Expected package is required.";
  }

  if (!photo) newErrors.photo = "Please upload your photo.";
  if (!file) newErrors.file = "Please upload your resume.";

  return newErrors;
}

export default validateForm;
