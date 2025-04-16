import {SetStateAction, useEffect, useState} from 'react';
import { User, GroupToJobsDto, JobDto } from '../../utils/types';
import JobList from './JobList';
import CreateJobForm from './CreateJobForm';
import '../../styles/jobsdashboard.css';
import plusSign from '../../assets/Busybee-plus-02.png';


type JobsDashboardProps = {
    user: User,
    ungroupedJobs: JobDto[],
    groupToJobsList: GroupToJobsDto[],
    setJobs: React.Dispatch<SetStateAction<JobDto[] | null>>;
};

const JobsDashboard: React.FC<JobsDashboardProps> = ({ user, ungroupedJobs, groupToJobsList, setJobs }) => {

    const [independentJobs, setIndependentJobs] = useState<JobDto[] | null>(null);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState<number | null>(null);
    const [creatingJob, setCreatingJob] = useState<boolean>(false);
    
    useEffect(() => {
        setIndependentJobs(ungroupedJobs);
    }, [ungroupedJobs]);

    const updateSelectedGroupIndex = (groupId: number) => {
        for (let i = 0; i < groupToJobsList.length; i++){
            if (groupToJobsList[i].groupDto.group_id === groupId){
                setSelectedGroupIndex(i);
                break;
            }
        }
    }

    return (
        <div> 
            {!creatingJob && (
                <>
                    <div>
                        <h1  className="hired-CTA">Let's get you hired!</h1>
                    </div>
                    
                    <div className='your-jobs-container'>
                        <h3 className="your-jobs">Your Jobs</h3>
                    
                        <button className="createButton" onClick={() => setCreatingJob(true)}>
                            <img src={plusSign} alt="yellow plus sign" className="plus-sign-size" />
                            <h4>Add a job...</h4>
                        </button>
                    </div>
                    <div className="select-group-CTA">{groupToJobsList && selectedGroupIndex === null && 
                        <p>Select a group to see some jobs</p>
                    }
                    </div>

                    {groupToJobsList && groupToJobsList.length > 0 && 
                        <h3>Your jobs by group</h3> &&
                        <ul
                        className={`groupBar ${groupToJobsList.length > 5 ? 'groupBarScroll' : ''}`}>
                        {groupToJobsList.map(groupToJobEntry => (
                          <li className='groups' key={groupToJobEntry.groupDto.group_id}>
                            <button
                              onClick={() => updateSelectedGroupIndex(groupToJobEntry.groupDto.group_id)}
                              className={(selectedGroupIndex !== null &&
                                groupToJobEntry.groupDto.group_id ===
                                groupToJobsList[selectedGroupIndex].groupDto.group_id)
                                ? 'selectedGroup'
                                : 'unselectedGroup'}
                            >
                              {groupToJobEntry.groupDto.group_name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    }
                    {groupToJobsList && selectedGroupIndex !== null && selectedGroupIndex < groupToJobsList.length &&
                        <JobList jobs={groupToJobsList[selectedGroupIndex].jobs} jobListTitle={groupToJobsList[selectedGroupIndex].groupDto.group_name} />
                    }
                    {independentJobs && independentJobs.length > 0 &&
                        <h3>Your ungrouped jobs</h3> &&
                        <JobList jobs={independentJobs} jobListTitle='Non-Grouped Jobs' />
                    }
                </>
            )}

            {creatingJob && (
                <>
                    {user && <CreateJobForm setCreatingJob={setCreatingJob} userId={user.user_id} independentJobs={independentJobs} setIndependentJobs={setIndependentJobs} setJobs={setJobs} />}
                </>
            )}

        </div>
    );



}

export default JobsDashboard;