import { useState, SetStateAction, ChangeEvent } from "react";

type CreateJobFormProps = {
  setCreatingJob: React.Dispatch<SetStateAction<boolean>>;
};

type JobFormData = {
  companyNameInput: string;
  jobTitleInput: string;
  remoteInput: string;
  jobCityInput: string;
  jobStateInput: string;
  jobCountryInput: string;
  datePostedInput: string;
  dateAppliedInput: string;
  platformInput: string;
  estimatedSalaryInput: number | undefined;
  notesInput: string;
  statusInput: string;
};

const CreateJobForm: React.FC<CreateJobFormProps> = ({ setCreatingJob }) => {
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

  const handleNewJobSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submitting new job:", jobData);
    // call supabaseService after validating input to have the job entry created and receive the new job
    // then we need to update our states and our dto lists to show the new job

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
      <h1>Create a New Job</h1>
      <button className="backButton" onClick={() => setCreatingJob(false)}>
        &#8678;
      </button>
      <form onSubmit={handleNewJobSubmission}>
        <label htmlFor="companyNameInput">Company Name</label>
        <input
          type="text"
          id="companyNameInput"
          name="companyNameInput"
          value={jobData.companyNameInput}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="jobTitleInput">Job Title</label>
        <input
          type="text"
          id="jobTitleInput"
          name="jobTitleInput"
          value={jobData.jobTitleInput}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="remoteInput">Remote</label>
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

        <label htmlFor="jobCityInput">Job City (optional)</label>
        <input
          type="text"
          id="jobCityInput"
          name="jobCityInput"
          value={jobData.jobCityInput}
          onChange={handleInputChange}
        />

        <label htmlFor="jobStateInput">Job State (optional)</label>
        <input
          type="text"
          id="jobStateInput"
          name="jobStateInput"
          value={jobData.jobStateInput}
          onChange={handleInputChange}
        />

        <label htmlFor="jobCountryInput">Job Country (optional)</label>
        <input
          type="text"
          id="jobCountryInput"
          name="jobCountryInput"
          value={jobData.jobCountryInput}
          onChange={handleInputChange}
        />

        <label htmlFor="datePostedInput">Date Posted</label>
        <input
          type="date"
          id="datePostedInput"
          name="datePostedInput"
          value={jobData.datePostedInput}
          onChange={handleInputChange}
        />

        <label htmlFor="dateAppliedInput">Date Applied</label>
        <input
          type="date"
          id="dateAppliedInput"
          name="dateAppliedInput"
          value={jobData.dateAppliedInput}
          onChange={handleInputChange}
        />

        <label htmlFor="platformInput">Platform Where Job Posting Found</label>
        <input
          type="text"
          id="platformInput"
          name="platformInput"
          value={jobData.platformInput}
          onChange={handleInputChange}
        />

        <label htmlFor="estimatedSalaryInput">Estimated Annual Salary</label>
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

        <label htmlFor="notesInput">Notes</label>
        <input
          type="text"
          id="notesInput"
          name="notesInput"
          value={jobData.notesInput}
          onChange={handleInputChange}
        />

        <label htmlFor="statusInput">Status</label>
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
        <button type="submit">Submit New Job</button>
        <button onClick={() => setCreatingJob(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateJobForm;