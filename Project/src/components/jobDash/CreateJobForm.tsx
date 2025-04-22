import { useState, SetStateAction, ChangeEvent } from "react";
import '../../styles/job-form.css'
import { JobDto, JobInsertDto, JobFormData } from "../../utils/types";
import { createJob } from '../../service/supabaseService';
import { compileJobInsertDto } from "../../service/objectConversionService";

type CreateJobFormProps = {
  setCreatingJob: React.Dispatch<SetStateAction<boolean>>;
  userId: string;
  independentJobs: JobDto[] | null;
  setIndependentJobs: React.Dispatch<SetStateAction<JobDto[] | null>>;
  setJobs: React.Dispatch<SetStateAction<JobDto[] | null>>;
};



const CreateJobForm: React.FC<CreateJobFormProps> = ({ setCreatingJob, userId, independentJobs, setIndependentJobs, setJobs }) => {
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
    statusInput: "applied",
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

    console.log("Submitting new job: ", jobData);
    // call supabaseService after validating input to have the job entry created and receive the new job
    // then we need to update our states and our dto lists to show the new job
    
    const jobInsertDto: JobInsertDto = compileJobInsertDto(jobData, userId);
    const newJob: JobDto | null = await createJob(jobInsertDto);
    if(!newJob){
        console.log("Error getting new job while creating");
    }
    else{
        //ADD THIS NEW JOB TO THE STATE OF EVERYTHING ELSE
        console.log(`new job = ${newJob.company_name}`);
        if(independentJobs){
          setIndependentJobs([...independentJobs, newJob]);
        }
        else{
          setIndependentJobs([newJob]);
        }
        setJobs(prev => [...(prev ?? []), newJob]);
    }
    



    // Reset the form after submission if needed
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
      statusInput: "applied",
    });
    setCreatingJob(false); // Optionally go back after submission
  };

  return (
    <div>
      <div className="job-form-container">
        <div className="job-form-left">
          <h1 className="add-new-job-header">Add a new job</h1>
          <h2 className="job-create-CTA">Let's get your job hunt on track</h2>
        </div>
        <div className="job-form-right">
          <button className="backButton" onClick={() => setCreatingJob(false)}>
            ← Back
          </button>
          <form onSubmit={handleNewJobSubmission}>
            <label htmlFor="companyNameInput" className="company-name">Company Name</label>
            <input
              type="text"
              id="companyNameInput"
              name="companyNameInput"
              value={jobData.companyNameInput}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="jobTitleInput" className='job-title'>Job Title</label>
            <input
              type="text"
              id="jobTitleInput"
              name="jobTitleInput"
              value={jobData.jobTitleInput}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="remoteInput" className='remote-input'>Job Type</label>
            <select
              name="remoteInput"
              id="remoteInput"
              value={jobData.remoteInput}
              onChange={handleInputChange}
              required
            >
              <option value="in person">In Person</option>
              <option value="remote">Remote</option>
            </select>

            <label htmlFor="jobCityInput" className='job-city'>Job City (optional)</label>
            <input
              type="text"
              id="jobCityInput"
              name="jobCityInput"
              value={jobData.jobCityInput}
              onChange={handleInputChange}
            />

            <label htmlFor="jobStateInput" className="job-state">Job State (optional)</label>
            <input
              type="text"
              id="jobStateInput"
              name="jobStateInput"
              value={jobData.jobStateInput}
              onChange={handleInputChange}
            />

            <label htmlFor="jobCountryInput" className="job-country">Job Country (optional)</label>
            <input
              type="text"
              id="jobCountryInput"
              name="jobCountryInput"
              value={jobData.jobCountryInput}
              onChange={handleInputChange}
            />

            <label htmlFor="datePostedInput" className="date-posted">Date Posted</label>
            <input
              type="date"
              id="datePostedInput"
              name="datePostedInput"
              value={jobData.datePostedInput}
              onChange={handleInputChange}
            />

            <label htmlFor="dateAppliedInput" className="date-applied">Date Applied</label>
            <input
              type="date"
              id="dateAppliedInput"
              name="dateAppliedInput"
              value={jobData.dateAppliedInput}
              onChange={handleInputChange}
            />

            <label htmlFor="platformInput" className="platform-input">Platform Where Job Posting Found</label>
            <input
              type="text"
              id="platformInput"
              name="platformInput"
              value={jobData.platformInput}
              onChange={handleInputChange}
            />

            <label htmlFor="estimatedSalaryInput" className="est-salary">Estimated Annual Salary</label>
            <input
              type="number"
              id="estimatedSalaryInput"
              name="estimatedSalaryInput"
              min="0"
              value={jobData.estimatedSalaryInput === undefined ? "" : jobData.estimatedSalaryInput}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setJobData((prevData) => ({
                  ...prevData,
                  estimatedSalaryInput: target.value === "" ? undefined : parseInt(target.value, 10),
                }));
              }}
            />

            <label htmlFor="notesInput" className="notes">Notes</label>
            <input
              type="text"
              id="notesInput"
              name="notesInput"
              value={jobData.notesInput}
              onChange={handleInputChange}
            />

            <label htmlFor="statusInput" className='status-input'>Status</label>
            <select
              name="statusInput"
              id="statusInput"
              value={jobData.statusInput}
              onChange={handleInputChange}
              required
            >
              <option value="applied">Applied</option>
              <option value="assessment">Assessment</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="counter offer">Counter Offer</option>
              <option value="rejected">Rejected</option>
              <option value="no response">No Response</option>
              <option value="offer accepted">Offer Accepted</option>
            </select>
            <button type="submit" className="submit-button">Submit New Job</button>
            <button onClick={() => setCreatingJob(false)} className="cancel-button">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobForm;