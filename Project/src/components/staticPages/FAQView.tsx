import '../../styles/static-pages.css';

const FAQ = () => {


    return (
        <>
            <div className ="faq-wrapper">
                <div className ="faq-content">
                    <div className ="faq-item">
                        <h2>What is this application designed to do?</h2>
                        <p>
                            Our application helps job seekers consolidate their
                            job applications from various platforms (such as Indeed,
                            LinkedIn, Glassdoor, and more) into one unified dashboard.
                            It allows users to track the status of their applications,
                            store resumes and cover letters, and view job search statistics
                            to help manage and optimize their job search process.
                        </p>
                    </div>

                    <div className ="faq-item">
                        <h2>How do I add my job applications to the dashboard?</h2>
                        <p>
                            You can manually enter your job applications by adding them
                            one by one, or in the future, we plan to integrate with job
                            platforms like Indeed and LinkedIn to automatically import
                            your applications. For now, you can also use our filtering
                            and sorting features to keep track of your applications.
                        </p>
                    </div>

                    <div className ="faq-item">
                        <h2>How can I track the status of my applications?</h2>
                        <p>
                            Each application you enter can be updated with its current status
                            (e.g., applied, interview scheduled, offer received). You can view
                            and filter your applications by status, company, date applied, or any
                            other relevant criteria to stay organized and up-to-date.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default FAQ;