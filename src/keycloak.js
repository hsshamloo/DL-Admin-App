import Keycloak from 'keycloak-js';
import config from "./keycloak/keycloak.json";

// const keycloakConfig = {

//     url: 'http://k8s-dev-ingressk-0910ac029c-1842219038.eu-central-1.elb.amazonaws.com/auth', realm: 'bigrep', clientId: 'oem-admin-dashboard'
// }
const keycloak = new Keycloak(config);
export default keycloak;