import React, {Component} from 'react';
import {Log} from '../../common/tools';

class Tip extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            txt: ""
        }
    };
    show(txt) {
        if (!this.state.show) {
            this.setState({
                show: true,
                txt: txt || ""
            }, () => {
                setTimeout(() => {
                    this.setState({show: false})
                }, 4000);
            });
        }
    }
    render() {
        return (
            <div
                className={this.state.show
                ? "tipbox"
                : "tipbox hide"}>
                <span>{this.state.txt}</span>
            </div>
        );
    }
}

class Alert extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            txt: ""
        }
    };
    show(txt) {
        this.setState({
            show: true,
            txt: txt || ""
        });
    }
    close() {
        this.setState({show: false});
    }
    render() {
        return (
            <div
                className={this.state.show
                ? "alertbox divbox"
                : "alertbox divbox hide"}>
                <div className="content">
                    <div className="txt"></div>
                    <div className="btns">
                        <button
                            className="close"
                            onClick={() => {
                            this.close()
                        }}>确定</button>
                    </div>

                </div>
            </div>
        );
    }
}

class Comfirm extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            txt: ""
        }
    };
    cancel(e) {
        console.log(e)
    };
    comfirm(e) {
        console.log(e)
    };
    render() {
        return (
            <div
                className={this.state.show
                ? "comfirmbox divbox"
                : "comfirmbox divbox hide"}>
                <div className="content">
                    <div className="txt"></div>
                    <div className="btns">
                        <button
                            className="cancel"
                            onClick={() => {
                            this.cancel()
                        }}>取消</button>
                        <button
                            className="comfirm"
                            onClick={() => {
                            this.comfirm()
                        }}>确定</button>
                    </div>

                </div>
            </div>
        );
    }
}

export {Tip, Alert, Comfirm}