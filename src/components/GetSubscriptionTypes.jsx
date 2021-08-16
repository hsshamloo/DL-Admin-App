import React from 'react';
import { useQuery } from "@apollo/client";
import { getSubscriptionTypes } from "../graphql/Queries";



function GetSubscriptionTypes(props) {
    const { error, loading, data } = useQuery(getSubscriptionTypes);

    console.log("Calling Api is happening...!");
    if (loading) return 'Loading...';
    if (error) return `Error on ${error.message} `;


    if (data && data.subscriptionTypes) {

        return (

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">User Limit</th>
                        <th scope="col">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {data.subscriptionTypes.content.map(m =>
                        <tr key={m.id} >
                            <th scope="row">{m.id}</th>
                            <td>{m.name}</td>
                            <td>{m.description}</td>
                            <td>{m.userLimit}</td>
                            <td>{m.duration}</td>
                        </tr>)}
                </tbody>
            </table>

        );
    }
}

export default GetSubscriptionTypes;