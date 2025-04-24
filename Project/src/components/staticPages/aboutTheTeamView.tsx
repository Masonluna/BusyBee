import '../../styles/static-pages.css';

const TeamInfo = () => {


    return (
        <>
            <div className="about-the-team-wrapper">
                <div className="about-the-team-content">
                    <h1 className="about-the-team-header">About the Team</h1>

                    <div className="team-member">
                        <h2>Mason Krause - Full Stack Engineer</h2>
                        <p>
                        Took ownership of the applications backend infrastructure. 
                        This included the design and implementation of the PostgreSQL database, 
                        with a focus on data security achieved through the implementation of 
                        row-level security policies. Established secure user authentication using Supabase Auth. 
                        Developed a service layer to handle CRUD operations and business logic. 
                        Implemented Continuous Integration/Continuous Delivery pipeline 
                        using Git for version control and Vercel for deployment and hosting.</p>
                    </div>

                    <div className="team-member">
                        <h2>Mason Luna- Full Stack Engineer</h2>
                        <p>
                        Responsible for the navigation and intercommunication for the front-end 
                        React components and the Supabase back-end infrastructure. Developed a 
                        service layer to handle the fetching and calculation of user statistics 
                        based on their job application data. Participated in the implementation of 
                        various React components. Served as a generalist developer responsible for 
                        the completion of individual tasks across the technology stack.
                        </p>
                    </div>

                    <div className="team-member">
                        <h2>Jacqueline Justice - Lead Frontend Engineer</h2>
                        <p>I was responsible for the front-end design, 
                            bringing the interface to life through clean,
                            responsive code and layout. 
                            I also handled the product design and brand identity,
                            ensuring a cohesive visual language that reflects 
                            the project's goals and target audience. 
                            My focus on UI/UX experience guided decisions around user flow, 
                            readability, and aesthetics to create a smooth and engaging experience.
                        </p>
                    </div>

                    <div className="team-member">
                        <h2>Jason Moss</h2>
                    </div>

                    <p><h3>Thanks to the team!</h3></p>
                </div>
            </div>
        </>
    )
}


export default TeamInfo;