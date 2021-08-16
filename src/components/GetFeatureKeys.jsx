import React from 'react';
import { useQuery } from "@apollo/client";
import { getFeatureKeys } from "../graphql/Queries";



function GetFeatureKeys(props) {
    const { error, loading, data } = useQuery(getFeatureKeys);

    console.log("Calling Api is happening...!");
    if (loading) return 'Loading...';
    if (error) return `Error on ${error.message} `;


    const { represent } = props;

    console.log(props.selected);

    if (data && data.featureKeys) {

        switch (represent) {
            case ("Table"): return (

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.featureKeys.content.map(m =>
                            <tr key={m.id} >
                                <th scope="row">{m.id}</th>
                                <td>{m.name}</td>
                            </tr>)}
                    </tbody>
                </table>

            );

            case ("Select"): return (

                <select>

                    {data.featureKeys.content.map(m =>
                        <option key={m.id} value={m.id}>
                            {m.name}
                        </option>)}
                </select>

            );

            case ("Check"): return (

                <React.Fragment>

                    {data.featureKeys.content.map(m =>
                        <div key={m.id + m.id} className="form-check">
                            <input
                                onChange={(e) => props.onClick(m, e.target.checked)} className="form-check-input"
                                type="checkbox"
                                value={m.id}
                                key={m.id}
                                // checked={props.selected.find(item => item.id === m.id)}
                                checked={props.selected.includes(m.id) ? true : false}
                            >

                            </input>
                            <label className="form-check-label" htmlFor={m.id}>
                                {m.name}
                            </label>
                        </div>)}

                </React.Fragment>

            );



            default: console.log("Select"); break;
        }
    }
}

export default GetFeatureKeys;