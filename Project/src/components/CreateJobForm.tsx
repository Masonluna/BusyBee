import { SetStateAction } from "react";


type CreateJobFormProps = {
    setCreatingJob: React.Dispatch<SetStateAction<boolean>>;
}

const CreateJobForm: React.FC<CreateJobFormProps> = ({ setCreatingJob }) => {


    const handleNewJobSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("Submitting new job");
        //call supabaseService after validating input to have the job entry created and receive the new job
        //then we need to update our states and our dto lists to show the new job

    }

    return( 
        <div>
            <h1>Create a New Job</h1>
            <form onSubmit={handleNewJobSubmission}>

                <label htmlFor="companyNameInput">Company Name</label>
                <input type="text" id="companyNameInput" name="companyNameInput" required/>

                <label htmlFor="jobTitleInput">Job Title</label>
                <input type="text" id="jobTitleInput" name="jobTitleInput" required/>

                <label htmlFor="remoteInput">Remote</label>
                <select name="remoteInput" id="remoteInput" required>
                    <option value="in person">In Person</option>
                    <option value="remote">Remote</option>
                </select>

                <label htmlFor="jobCityInput">Job City (optional)</label>
                <input type="text" id="jobCityInput" name="jobCityInput" />

                <label htmlFor="jobStateInput">Job State (optional)</label>
                <input type="text" id="jobStateInput" name="jobStateInput"/>

                <label htmlFor="jobCountryInput">Job Country (optional)</label>
                <input type="text" id="jobCountryInput" name="jobCountryInput"/>

                <label htmlFor="datePostedInput">Date Posted</label>
                <input type="date" id="datePostedInput" name="datePostedInput" />

                <label htmlFor="dateAppliedInput">Date Applied</label>
                <input type="date" id="dateAppliedInput" name="dateAppliedInput" />

                <label htmlFor="platformInput">Platform Where Job Posting Found</label>
                <input type="text" id="platformInput" name="platformInput" />

                <label htmlFor="estimatedSalaryInput">Estimated Annual Salary</label>
                <input type="number" id="estimatedSalaryInput" name="estimatedSalaryInput" min="0"/>

                <label htmlFor="notesInput">Notes</label>
                <input type="text" id="notesInput" name="notesInput" />

                <label htmlFor="statusInput">Status</label>
                <select name="statusInput" id="statusInput" required>
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
    )
}
export default CreateJobForm;