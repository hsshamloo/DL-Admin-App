
import React from 'react';

import { ApolloProvider } from "@apollo/client";
import GraphQlHandeler from '../graphql/GraphQlHandeler';


import AddSubscriptionType from '../components/AddSubscriptionType';


function SubscriptionTypeDetails(props) {

    const client = GraphQlHandeler();

    return (
        <ApolloProvider client={client}>
            <div>This is Add Subscription...!</div>
            <AddSubscriptionType />
        </ApolloProvider>
    );

}

export default SubscriptionTypeDetails;


