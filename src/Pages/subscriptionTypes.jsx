
import React from 'react';


import { ApolloProvider } from "@apollo/client";
import GetSubscriptionTypes from '../components/GetSubscriptionTypes';
import GraphQlHandeler from './../graphql/GraphQlHandeler';



function SubscriptionTypes() {

    const client = GraphQlHandeler();

    return (

        <ApolloProvider client={client}>
            <div>This is test GraphQlHandeler...!</div>
            <GetSubscriptionTypes />
        </ApolloProvider>

    );
}

export default SubscriptionTypes;