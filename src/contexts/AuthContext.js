import React, { createContext, Component } from 'react';
import jwt_decode from "jwt-decode";



export const AuthContext = createContext();

class AuthContextProvider extends Component {

    constructor(props) {
        super(props);

        const Token = localStorage.getItem("react-token");

        if (Token) {
            let token = Token;
            let decodedToken = jwt_decode(Token);

            this.state = {
                isLogged: true,
                token,
                decodedToken
            }
        }

        else {
            this.state = {
                isLogged: false,
                token: null,
                decodedToken: null
            }
        }
    }


    componentDidMount() {
        const Token = localStorage.getItem("react-token");

        if (Token) {
            let token = Token;
            let decodedToken = jwt_decode(Token);

            this.setState({
                isLogged: true,
                token,
                decodedToken
            })
        }

    }

    toggleAuth = () => {
        this.setState({
            isLogged: !this.state.isLogged,
        });
    }

    saveToken = (Token) => {
        let token = Token;
        this.setState({
            token
        })
    }

    saveDecodeToken = (Token) => {
        let decodedToken = jwt_decode(Token);
        this.setState({
            decodedToken
        })
    }

    render() {
        return (
            <AuthContext.Provider value={{
                ...this.state, toggleAuth: this.toggleAuth, saveToken: this.saveToken, saveDecodeToken: this.saveDecodeToken
            }}>
                {this.props.children}

            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;