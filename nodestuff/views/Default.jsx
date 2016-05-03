import React, {Component} from 'react'
import {render, findDOMNode} from 'react-dom'
import {browserHistory, Router, Route, Link} from 'react-router'

class App extends Component {
    render() {
        return (
            <div>
                <Input />
            </div>

        )
    }
}

class ChooseType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: "",
            chosenType: "Caligraphy"
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({chosenType: event.target.value});
        $(document).trigger("UpdateType");
    }

    componentDidMount() {
        this.serverRequest = $.get("getasciilist", (data) => {
            this.setState({types: data});
        });

    }
    render() {
        let results = this.state.types;
                return(
                    <select
                        onChange={this.handleChange}
                        ref="chosenVal"
                        value={this.state.value}>
                    { Object.keys(results).map((key) => {
                        return (
                            <option
                                key={key}
                                value={results[key].slice(0,-4)}>
                                    {results[key].slice(0,-4)}
                            </option>
                        );
                    })}
                </select>
                );
    }
}


class Input extends Component {
    constructor(props) {
        super(props);
        this.getAscii = this.getAscii.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.state = { asciiText: 'Hello, world' };
        this.getAscii();
    }

    getAscii() {
        $.post("makeascii", {
            ascii: this.state.asciiText,
            font:  this.refs.chooseType ? this.refs.chooseType.refs.chosenVal.value : 'Basic' //there should be a better way
        }, (data) => {
            this.refs.asciiArt.update(data);
        });
    }

    handleChange (event) {
        // this.getAscii(event.target.value);
        this.setState({asciiText: event.target.value});
    }

    componentDidMount() {
        $(document).on("UpdateType", (event, type) => {
            this.getAscii(event.target.value);
        });
    }
    render() {
        this.getAscii(); //uh is this ugly
        return (
            <div>
                <input type="text"
                    onChange={this.handleChange}
                    value={this.state.asciiText}/>
                <ChooseType ref='chooseType' />
                <DisplayAscii ref='asciiArt' />
            </div>
        )
    }
}

class DisplayAscii extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asciiart: "Loading..."
        };
        this.update = this.update.bind(this)
    }

    update(data) {
        this.setState({asciiart: data});
    }

    render() {
        return (
            <pre id="displayascii">{this.state.asciiart}</pre>
        )
    }
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}></Route>
    </Router>
), document.getElementById('app'))
