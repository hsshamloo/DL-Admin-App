import { gql } from "@apollo/client"


export const getSubscriptionTypes = gql`
    query getSubscriptionTypes {
    subscriptionTypes {
      content {
        id
        name
        description
        userLimit
        duration
        featureKeys {
            id 
            name
        }
      }
    }
  }`;
export const CREATE_SUBSCRIPTION_TYPE = gql`mutation createSubscriptionType
($name: String!, $description: String!,$userLimit: Int!,$duration: Int!,$featureKeyIds: [Int!]!)  

{
    createSubscriptionType(input:{
        name: $name,
        description: $description,
        userLimit: $userLimit,
        duration: $duration,
        featureKeyIds:$featureKeyIds,
      }) {
        id
        name
        description
        userLimit
        duration
        featureKeys {
            id 
            name
        }
      }
  }`;

export const getFeatureKeys = gql`query getFeatureKeys {
    featureKeys {
      content {
          id
          name
      }
    }
}`;


export const CREATE_FEATURE_KEY = gql`mutation createFeatureKey ($name: String!) {
  createFeatureKey(name:$name) {
      id
      name
  }
}`;


