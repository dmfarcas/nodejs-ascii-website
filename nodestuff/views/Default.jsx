import React, {Component} from 'react'
import {render, findDOMNode} from 'react-dom'
import {browserHistory, Router, Route, Link} from 'react-router'
import  './Default.less';

class App extends Component {
    render() {
        return (
                <Input />
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
                        className="form-control"
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
                    <div className="container">
                        <div className="row">
                            <div className="input-group input-group-lg">

                            <div className="col-md-6 col-offset-md-6">
                                <input type="text"
                                    className="form-control"
                                    onChange={this.handleChange}
                                    value={this.state.asciiText}/>
                            </div>
                            <div className="col-md-6">
                                <ChooseType ref='chooseType' />
                            </div>
                            </div>
                        </div>
                    </div>
                <DisplayAscii ref='asciiArt' />
            </div>
        )
    }
}

class CopyToClipboard extends Component {
    componentDidMount() {
        new Clipboard('#copytoclipboard');
    }
    render() {
        return (

            <button
                id="copytoclipboard"
                className="btn btn-primary-outline"
                data-clipboard-target="#displayascii">
                <span className="glyphicon glyphicon-copy"></span>
            </button>
        );
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
            <div className="container-fluid">
                <div className="text-center">
                    <pre id="displayascii">{this.state.asciiart}</pre>
                    <CopyToClipboard />
                </div>

            </div>

        )
    }
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}></Route>
    </Router>
), document.getElementById('app'))
