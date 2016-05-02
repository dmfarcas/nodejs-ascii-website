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
                        value={this.state.value}
                        ref="testpls">
                    { Object.keys(results).map(function (key) {
                        return (
                            <option
                                key={key}
                                value={results[key].slice(0,-4)}>
                                    {results[key].slice(0,-4)}
                            </option>
                        );
                    }, this)}
                </select>
                );
    }
}


class Input extends Component {
    constructor(props) {
        super(props);
        this.getAscii = this.getAscii.bind(this)
        this.getAscii();
    }
    getAscii(event) {
        let sendThisThing = event ? event.target.value : "Hello, world!"
        $.post("makeascii", {
            ascii: sendThisThing,
            font: this.refs.chooseType ? this.refs.chooseType.state.chosenType : 'Basic'
        }, (data) => {
            this.refs.asciiArt.update(data);
        });
    }

    componentDidMount() {
        $(document).on("UpdateType", (event, type) => {
            console.log(event);
            this.getAscii(type);
        });
    }
    render() {
        return (
            <div>
                <input type="text"
                    onChange={this.getAscii} 
                    defaultValue="Hello, world!"/>
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
