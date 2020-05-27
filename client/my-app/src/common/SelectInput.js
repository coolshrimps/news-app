import React, { Component } from "react";
import ReactDOM from "react-dom";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from 'react-select/async-creatable';
import Select, { components } from 'react-select';
import {Link} from 'react-router-dom';

type State = {
    inputValue: string
};

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const getAutoSuggest = (value, callback) => {
    try {
        fetch(
            `https://hw8sk.cognitiveservices.azure.com/bing/v7.0/suggestions?=mkt=en-US&q=${value}`,
            {
                headers: {
                    "Ocp-Apim-Subscription-Key": "1b602e3d3edf447b84e7b5c064c08971"
                }
            }
        )
            .then(result => result.json())
            .then(json => {
                const results = [];
                if(json == undefined || json.suggestionGroups == undefined) {
                    return results;
                }
                const resultsRaw = json.suggestionGroups[0].searchSuggestions;
                for (var i = 0; i < resultsRaw.length; i++) {
                    results[i] = {
                        label: resultsRaw[i].displayText,
                        value: resultsRaw[i].displayText
                    };
                }
                callback(results);
            });
    } catch (error) {
        console.error(`Error fetching search ${value}`);
        callback([]);
    }
};


const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
        getAutoSuggest(inputValue, callback);
    }, 1000);
};

const Option = props => {
    return (
            <Link to={"/search?q="+props.data.label} style={{all: 'unset'}}>
                <components.Option {...props} />
            </Link>
    );
};
class SelectInput extends Component<*, State> {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            redirect: false
        };
    }

    handleInputChange = (newValue: string) => {
        const inputValue = newValue.replace(/\W/g, "");
        this.setState({ inputValue, redirect: false });
        return inputValue;
    };

    handleChange = (e) => {
        console.log(e.value);
    }

    render() {
        return <div>
        <AsyncCreatableSelect
            className='sb'
            placeholder="Entry keyword..."
            loadOptions={debounce(loadOptions, 1000)}
            defaultOptions
            onInputChange={debounce(this.handleInputChange, 1000)}
            onChange={this.handleChange}
            components={{Option}}
        />
        </div>;
    }
}

export default SelectInput