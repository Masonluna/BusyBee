import { SetStateAction, useState } from "react";
import type { User, Group, GroupInsertDto } from "../../utils/types";
import { createGroup, deleteGroup } from "../../service/supabaseService";

type GroupDashboardProps = {
    user: User,
    groups: Group[],
    setGroups: React.Dispatch<SetStateAction<Group[] | null>>
}
const GroupDashboard: React.FC<GroupDashboardProps> = ({ user, groups, setGroups }) => {

    const [creatingGroup, setCreatingGroup] = useState(false);

    const handleNewGroupSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newGroupName: string = formData.get('newGroupName') as string; 
        console.log('Creating group: ', newGroupName);
        const groupInsertDto: GroupInsertDto = {group_name: newGroupName, user_id: user.user_id}
        
        const newGroup: Group | null = await createGroup(groupInsertDto);

        if (newGroup) {
            setGroups(prev => [...(prev ?? []), newGroup]);
            groups.push(newGroup);
            setCreatingGroup(false);
        }
        else{
            console.log("Error creating group")
        }
    }

    const handleGroupDeletion = async (groupId: number) => {
        console.log("deleting group");
        await deleteGroup(groupId);
        let evicteeIndex = -1;
        for (let i = 0; i < groups.length; i++){
            if (groups[i].group_id === groupId){
                evicteeIndex = i;
                break;
            }
        }
        const newGroupArr = groups.filter((_, i) => i !== evicteeIndex);
        setGroups(newGroupArr);
    }

    return (
    <>
        {!creatingGroup && 
            <div>
                <h1>Your Groups</h1>
                <ul>
                    {groups.map(group => (
                        <li key={group.group_id}>
                            <div className="flex-row">
                                <p>{group.group_name}</p>
                                <button onClick={() => handleGroupDeletion(group.group_id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>

                <button onClick={() => setCreatingGroup(true)}>Create Group</button>
            </div>
        }

        {creatingGroup &&
            <div>
                <button className="backButton" onClick={() => setCreatingGroup(false)}>← Back</button>
                <h1>Create Group</h1>
                <form onSubmit={(event) => handleNewGroupSubmission(event)}>
                    <label htmlFor="newGroupName">Group Name</label>
                    <input type="text" id="newGroupName" name="newGroupName" />
                    <button type="submit">Submit New Group</button>
                </form>
            </div>
        }
    </>
    );
}

export default GroupDashboard;