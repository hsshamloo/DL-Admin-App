
import React, { useContext } from 'react';


import { InMemoryCache, ApolloProvider, from, ApolloClient, ApolloLink, createHttpLink } from "@apollo/client";
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import GetSubscriptionTypes from '../components/GetSubscriptionTypes';
import { AuthContext } from '../contexts/AuthContext';



function GraphQlHandeler() {

    const { token: Token } = useContext(AuthContext);

    const authLink = () => (setContext(async (_, { headers }) => {
        const token = Token;
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    }));



    const httpLink = () => (createHttpLink({
        uri: "http://k8s-dev-ingressg-1495860bbd-850603941.eu-central-1.elb.amazonaws.com/graphql",
    }));

    const loggerLink = new ApolloLink((operation, forward) => {
        console.log(`GraphQL Request: ${operation.operationName}`);
        operation.setContext({ start: new Date() });
        return forward(operation).map((response) => {
            const responseTime = new Date() - operation.getContext().start;
            console.log(`GraphQL Response took: ${responseTime}`);
            return response;
        });
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.map(({ statusCode, message, locations, path }) =>
                console.log(`GraphQL Error: ${statusCode}`),
            );
        }
        if (networkError) {
            console.log(`Network Error: ${networkError.statusCode}`);
        }
    });


    const retryIf = (error, operation) => {
        const doNotRetryCodes = [500, 400];
        console.log(error.statusCode);
        return !error && !doNotRetryCodes.includes(error.statusCode);
    };
    const retryLink = new RetryLink({
        delay: {
            initial: 100,
            max: 500,
            jitter: true,
        },
        attempts: {
            max: 5,
            retryIf,
        },
    });

    const link = from([
        loggerLink,
        authLink(),
        retryLink,
        errorLink,
        httpLink(),
    ])

    const client = new ApolloClient({
        link,
        cache: new InMemoryCache()
    })

    console.log("This is from Types", Token);

    return (
        client
    );
}

export default GraphQlHandeler;