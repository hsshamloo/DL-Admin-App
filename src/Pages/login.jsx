import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import config from "../keycloak/keycloak.json";

import { AuthContext } from './../contexts/AuthContext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: null }
    }

    static contextType = AuthContext;

    componentDidMount() {

        console.log("This is from login page", this.context);

        if (!this.context.isLogged) {

            const keycloak = Keycloak(config);
            keycloak.init({ onLoad: "login-required" }).then(authenticated => {
                this.setState({ keycloak: keycloak, authenticated: authenticated })
                if (authenticated) {
                    localStorage.setItem("react-token", keycloak.token);
                    const { toggleAuth, saveToken, saveDecodeToken } = this.context;
                    toggleAuth();
                    saveToken(keycloak.token);
                    saveDecodeToken(keycloak.token);
                }
            })
        }
        else this.setState({
            keycloak: true,
            authenticated: true
        })
    }


    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) {
                return (
                    <Redirect to="/dashboard" />
                )
            }
            else {
                return (
                    <div>
                        unable to authenticated!
                    </div>
                )
            }
        }
        else {
            return (
                <div>
                    Intializing Keykloacl....
                </div>
            )
        }
    }
}

export default Login;