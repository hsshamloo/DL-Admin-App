
import React from 'react';


import { ApolloProvider } from "@apollo/client";
import GetFeatureKeys from '../components/GetFeatureKeys';
import GraphQlHandeler from '../graphql/GraphQlHandeler';
import { Link } from "react-router-dom";



function FeatureKeys() {

    const client = GraphQlHandeler();

    return (

        <ApolloProvider client={client}>
            <div>This is test GraphQlHandeler...!</div>
            <Link
                to="/feature-key-details"
            >
                Add NEW feature
            </Link>

            <GetFeatureKeys represent={"Table"} />
        </ApolloProvider>

    );
}

export default FeatureKeys;