import { useState } from 'react';
import { JobDto } from '../../utils/types';
import { deleteJob } from '../../service/supabaseService';
import '../../styles/jobsdashboard.css';

type DeleteJobButtonProps = {
  allJobs: JobDto[];
  setJobs: React.Dispatch<React.SetStateAction<JobDto[] | null>>;
};

const DeleteJobButton: React.FC<DeleteJobButtonProps> = ({ allJobs, setJobs }) => {
  const [selectedJobId, setSelectedJobId] = useState<number | ''>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);


  const handleJobSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedJobId(e.target.value ? parseInt(e.target.value) : '');
  };

  const handleDeleteJob = async () => {
    if (selectedJobId === '') {
      alert('Please select a job to delete');
      return;
    }

    setIsDeleting(true);
    
    try {
      const success = await deleteJob(selectedJobId as number);
      
      if (success) {
        // Update the jobs state by filtering out the deleted job
        setJobs(prevJobs => 
          prevJobs ? prevJobs.filter(job => job.job_id !== selectedJobId) : null
        );
        setSelectedJobId('');
        console.log('Job deleted successfully');
      } else {

        console.log('Failed to delete job');
      }
    } catch (error) {
      console.error('Error in delete operation:', error);
      alert('An error occurred while deleting the job');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="delete-job-container">
      <select 
        value={selectedJobId} 
        onChange={handleJobSelection}
        className="job-select"
        disabled={isDeleting}
      >
        <option value="">Select a job to delete</option>
        {allJobs && allJobs.map(job => (
          <option key={job.job_id} value={job.job_id}>
            {job.company_name} - {job.job_title}
          </option>
        ))}
      </select>
      
      <button 
        onClick={handleDeleteJob} 
        disabled={selectedJobId === '' || isDeleting}
        className="delete-button"
      >
        {isDeleting ? 'Deleting...' : 'Delete Job'}
      </button>
    </div>
  );
};

export default DeleteJobButton;