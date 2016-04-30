import React, {Component} from 'react'
import {render} from 'react-dom'
import {browserHistory, Router, Route, Link} from 'react-router'

class App extends Component {
    render() {
        return (
            <div>
                <Input/>
                <ChooseType/>
            </div>

        )
    }
}

export class ChooseType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: ""
        };
    }

    componentDidMount() {
        this.serverRequest = $.get("getasciilist", (data) => {
            this.setState({types: data});
        });

    }
    render() {
        let results = this.state.types;
                return(
                    <select>
                    { Object.keys(results).map(function (key) {
                        return (
                            <option key={key}>{results[key]}</option>
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
    }
    getAscii(event) {
        $.post("makeascii", {
            ascii: event.target.value,
            font: 'Caligraphy'
        }, (data) => {
            this.refs.asciiArt.update(data);
        });
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.getAscii}/>
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
