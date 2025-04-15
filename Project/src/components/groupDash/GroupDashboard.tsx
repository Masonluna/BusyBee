import type { User, Group } from "../../utils/types";

type GroupDashboardProps = {
    user: User,
    groups: Group[]
}
const GroupDashboard: React.FC<GroupDashboardProps> = ({ user, groups }) => {


    return (
        <>
        <h1>Your Groups</h1>
        <ul>
            {groups.map(group => (
                <li key={group.group_id}>
                    <p>{group.group_name}</p>
                </li>
            ))}
        </ul>


        {/*Another example showing user data is here, definitely remove*/}
        {user && <h2>Manage your groups, {user.first_name}</h2>}
        </>
    );
}

export default GroupDashboard;