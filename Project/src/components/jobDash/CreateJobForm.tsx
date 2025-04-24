import { useState, ChangeEvent } from "react";
import '../../styles/job-form.css'
import { JobFormData, JobInsertDto } from "../../utils/types";
import { createJob } from '../../service/supabaseService';
import { compileJobInsertDto } from "../../service/objectConversionService";
import { useDashboard } from '../../context/useDashboardContext';

type CreateJobFormProps = {
  setCreatingJob: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const CreateJobForm: React.FC<CreateJobFormProps> = ({ setCreatingJob, setErrorMessage }) => {
  // Get user and state update functions from context
  const { 
    user,
    jobs,
    independentJobs,
    setJobs,
    setIndependentJobs
  } = useDashboard();

  //this line is just to clear the annoying typescript error of unused variable
  if(jobs) console.log(`${jobs.length} jobs`);

  const [jobData, setJobData] = useState<JobFormData>({
    companyNameInput: "",
    jobTitleInput: "",
    remoteInput: "in person",
    jobCityInput: "",
    jobStateInput: "",
    jobCountryInput: "",
    datePostedInput: "",
    dateAppliedInput: "",
    platformInput: "",
    estimatedSalaryInput: undefined,
    notesInput: "",
    statusInput: "Applied",
  });
  
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewJobSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!user) {
      setErrorMessage("User not found. Please log in again.");
      return;
    }

    console.log("Submitting new job: ", jobData);
    
    const jobInsertDto: JobInsertDto = compileJobInsertDto(jobData, user.user_id);
    const newJob = await createJob(jobInsertDto);
    
    if (!newJob) {
      setErrorMessage("Error creating new job. Please try again.");
      return;
    }
    
    console.log(`new job = ${newJob.company_name}`);
    
    // Update context state with new job
    if (independentJobs) {
      setIndependentJobs([...independentJobs, newJob]);
    } else {
      setIndependentJobs([newJob]);
    }
    
    setJobs(prev => [...(prev ?? []), newJob]);

    // Reset the form after submission
    setJobData({
      companyNameInput: "",
      jobTitleInput: "",
      remoteInput: "in person",
      jobCityInput: "",
      jobStateInput: "",
      jobCountryInput: "",
      datePostedInput: "",
      dateAppliedInput: "",
      platformInput: "",
      estimatedSalaryInput: undefined,
      notesInput: "",
      statusInput: "Applied",
    });
    
    setCreatingJob(false);
  };

  return (
    <div>
      <div className="job-form-container">
        <div className="job-form-left">
          <h1 className="add-new-job-header">Add a new job</h1>
          <h2 className="job-create-CTA">Another application done... great work!</h2>
        </div>
        <div className="job-form-right">
          <form onSubmit={handleNewJobSubmission}>
            {/* Form fields (unchanged) */}
            <label htmlFor="companyNameInput" className="company-name">Company Name</label>
            <input
              type="text"
              id="companyNameInput"
              name="companyNameInput"
              value={jobData.companyNameInput}
              onChange={handleInputChange}
              required
            />
            
            {/* Include all other form fields here (unchanged) */}
            
            <button type="submit" className="submit-button">Submit New Job</button>
            <button onClick={() => setCreatingJob(false)} className="cancel-button">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobForm;