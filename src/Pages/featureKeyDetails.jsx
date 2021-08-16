
import React from 'react';


import { ApolloProvider } from "@apollo/client";
import AddFeatureKey from '../components/AddFeatureKey';
import GraphQlHandeler from '../graphql/GraphQlHandeler';




function FeatureKeyDetails(props) {
    const client = GraphQlHandeler();

    return (
        <ApolloProvider client={client}>
            <div>This is AddFeatureKey...!</div>
            <AddFeatureKey />
        </ApolloProvider>
    );
}

export default FeatureKeyDetails;