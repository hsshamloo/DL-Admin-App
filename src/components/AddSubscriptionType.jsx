
import React, { useState } from 'react';


import { ApolloProvider, useMutation } from "@apollo/client";
import GraphQlHandeler from '../graphql/GraphQlHandeler';
import GetFeatureKeys from './GetFeatureKeys';

import { CREATE_SUBSCRIPTION_TYPE } from "../graphql/Queries";
import {
    Link
} from "react-router-dom";


function AddSubscriptionType(props) {



    const [Name, updateName] = useState("");
    const [Description, updateDescription] = useState("");
    const [UserLimit, updateUserLimit] = useState(0);
    const [Duration, updateDuration] = useState(0);
    const [FeatureKeysList, updateList] = useState("");

    const handleChecked = (selectedFeatureKey, isChecked) => {

        if (isChecked) {

            updateList(oldArray => [...oldArray, selectedFeatureKey.id]);
            // updateList(oldArray => [...oldArray, { id: selectedFeatureKey.id }]);
            console.log(`item ${selectedFeatureKey.id} should be selected`);
        }

        else {
            const temp = [...FeatureKeysList];

            // removing the element using splice
            // updateList(temp.filter(item => item.id !== selectedFeatureKey.id));

            updateList(temp.filter(item => item !== selectedFeatureKey.id));

            console.log(`item ${selectedFeatureKey.id} should be deselected`);

        }

        console.log(FeatureKeysList);


    }
    const [createSubscriptionType, { error, loading, data }] = useMutation(CREATE_SUBSCRIPTION_TYPE);
    if (error) return `Error on ${error.message}`;
    if (loading) return `Is loading to Create Subscription Type`;
    if (data && data.createSubscriptionType) {

        return (

            <div>
                <h5 style={{ marginBottom: 20 }}>New Feature Added...!</h5>

                <button onClick={() => Location.reload(false)}>Add New One</button>

                <br></br>
                <Link
                    to="/feature-keys"
                    className="btn btn-primary"
                    style={{ marginBottom: 20 }}
                >
                    <button>Back</button>
                </Link>

            </div>

        );
    }

    const client = GraphQlHandeler();
    return (
        <ApolloProvider client={client}>
            <form onSubmit={e => {
                e.preventDefault();
                createSubscriptionType({
                    variables: {
                        name: Name,
                        description: Description,
                        userLimit: +UserLimit,
                        duration: +Duration,
                        featureKeyIds: FeatureKeysList
                    }
                });
                console.log(typeof (FeatureKeysList));
            }
            }>
                Name : <input type="text" id="name" onChange={e => updateName(e.target.value)} value={Name} />
                <br />
                Description : <input type="text" id="description" onChange={e => updateDescription(e.target.value)} value={Description} />
                <br />
                User Limit : <input type="number" id="userLimit" onChange={e => updateUserLimit(e.target.value)} value={UserLimit} />
                <br />
                Duration : <input type="number" id="duration" onChange={e => updateDuration(e.target.value)} value={Duration} />
                <br />
                Feature Keys :

                <GetFeatureKeys represent={"Check"} onClick={handleChecked} selected={FeatureKeysList} />
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </ApolloProvider>
    );

}

export default AddSubscriptionType;


