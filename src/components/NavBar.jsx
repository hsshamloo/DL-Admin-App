import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { ThemeContext } from '../contexts/ThemeContext';


class NavBar extends Component {

    static contextType = ThemeContext;

    render() {
        console.log(this.context);

        const { isLightTheme, light, dark } = this.context;

        const theme = isLightTheme ? light : dark;


        return (
            <nav style={{ background: theme.ui, color: theme.syntax }}>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/subscription-types">Subscription Types</Link>
                        <ul>
                            <li>
                                <Link to="/subscription-type-details/new">Add subscription type</Link>
                            </li>

                        </ul>
                    </li>
                    <li>
                        <Link to="/feature-keys">Feature Keys</Link>
                        <ul>
                            <li>
                                <Link to="/feature-key-details">Add feature key</Link>
                            </li>

                        </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;