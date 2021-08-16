import React from 'react';
import { useMutation } from "@apollo/client";
import { CREATE_FEATURE_KEY } from "../graphql/Queries";
import {
    Link
} from "react-router-dom";



function AddFeatureKey(props) {

    let name;

    const [createFeatureKey, { error, loading, data }] = useMutation(CREATE_FEATURE_KEY);

    console.log("Calling Api is happening...!");
    if (loading) return 'Loading...';
    if (error) return `Error on ${error.message} `;

    if (data && data.createFeatureKey) {

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

    return (

        <form onSubmit={
            e => {
                e.preventDefault();
                createFeatureKey({
                    variables: { name: name.value }
                })

            }
        }>
            <input type="text" id="name" ref={value => name = value} />
            <button type="submit" className="btn btn-primary">Add</button>
        </form>

    );

}

export default AddFeatureKey;