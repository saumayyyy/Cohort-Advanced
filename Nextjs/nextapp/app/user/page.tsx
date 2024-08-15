import axios from "axios"


async function userDetails(){
    const response =await axios.get("http://localhost:3000/api/user");
    return response.data;
}

export default async function userCard(){   
    const userData = await userDetails();

    return (
        <div>
            {userData.name}
            {userData.email}
        </div>
    )
} 