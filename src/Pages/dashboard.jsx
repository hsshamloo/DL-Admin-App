import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';


class Dashboard extends Component {


    state = {
        given_name: "",
        family_name: ""
    }

    static contextType = AuthContext;

    componentDidMount() {

        if (this.context.decodedToken) {

            const { given_name, family_name } = this.context.decodedToken;

            this.setState({
                given_name, family_name
            })
        }

    }

    render() {

        // const { given_name } = this.context.decodedToken;

        if (this.context.decodedToken) {
            return (
                <h1>
                    Hello {this.state.given_name}
                </h1>
            );
        }

        else {
            return <Redirect to="/" />
        }
    }
}

export default Dashboard;