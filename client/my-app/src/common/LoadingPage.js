import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import "../styles/LoadingPage.css";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #809fff;
`;

export default class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    render() {
        return (
            <div className="sweet-loading">
                <BounceLoader
                    css={override}
                    size={30}
                    color={"#123abc"}
                    loading={this.state.loading}
                />
                <p>Loading</p>
            </div>
        );
    }
}