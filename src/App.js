import "./App.css";
import CareerFormPopUp from "./components/CareerFormPopUp";

function App() {
  const [isCareerFormOpen, setIsCareerFormOpen] = useState(true);
  const [careerModal, setCareerModal] = useState("TRU Caller");

  const handleJobForm = useCallback((selectedJobTitle) => {
    setIsCareerFormOpen((prevProps) => !prevProps);
    setCareerModal(selectedJobTitle);
  }, []);
  return (
    <div className="">
      {/* <CareerFormPopUp /> */}
      {isCareerFormOpen && (
        <CareerFormPopUp
          isOpen={isCareerFormOpen}
          onClose={handleJobForm}
          formName={careerModal}
        />
      )}
    </div>
  );
}

export default App;
