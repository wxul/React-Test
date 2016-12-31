import React, {Component} from 'react';
import {Log} from '../../common/tools';

class Keyboard extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            value: ""
        };
    }
    show() {
        this.setState({show: true});
    };
    hide() {
        this.setState({
            show: false
        }, (e) => {
            if (typeof this.props.onhide == "function") {
                this
                    .props
                    .onhide
                    .call(this.state, e);
            }
            this.setState({value: ""});
        });
    };
    btnfocus() {

        return function (e) {
            if (e.target.className.indexOf("btn") >= 0) {
                e.target.className += " active";
            }
        }
    };
    btnblur() {
        var _ = this;
        return function (e) {
            if (e.target.className.indexOf("btn") >= 0) {
                e.target.className = e
                    .target
                    .className
                    .replace(/active/g, "");

                //add num
                var v = e.target.innerHTML;
                if (/^\d$/.test(v)) {
                    _.addnum(v);
                } else if (e.target.className.indexOf("back") >= 0) {
                    _.backnum(v);
                }
            }
        }
    };
    //添加一个数字
    addnum(num) {
        var s = (this.state.value + num);

        /*s = s.length > 1
            ? s.replace(/^0+/, "")
            : s;*/
        //if (/^[1-9]\d*$/.test(s)) {
        this.changeValue(s);
        //}
    };
    //退回
    backnum() {
        var v = this.state.value;
        var s = v.length > 1
            ? v.slice(0, v.length - 1)
            : "";
        this.changeValue(s);
    };
    changeValue(v) {
        var state = true;
        if (typeof this.props.valueHandle == "function") {
            state = this
                .props
                .valueHandle
                .call(this.state, v)
        }
        if (state) {
            this.setState({
                value: v
            }, () => {
                if (typeof this.props.onValueChange == "function") {
                    this
                        .props
                        .onValueChange
                        .call(this.state, this.state.value);
                }
            });
        }
    };
    render() {

        return (
            <div
                className={this.state.show
                ? "keyboard active"
                : "keyboard"}>
                <p className="title">
                    <a>完成</a>
                    <span>数字键盘</span>
                </p>
                <div
                    className="board"
                    onTouchStart={this.btnfocus()}
                    onTouchEnd={this.btnblur()}>
                    <div className="btn">1</div>
                    <div className="btn active">2</div>
                    <div className="btn">3</div>
                    <div className="btn">4</div>
                    <div className="btn">5</div>
                    <div className="btn">6</div>
                    <div className="btn">7</div>
                    <div className="btn">8</div>
                    <div className="btn">9</div>
                    <div className="btn" onClick={() => this.hide()}>关闭</div>
                    <div className="btn">0</div>
                    <div className="btn back">X</div>
                </div>
            </div>
        );
    }
}

export {Keyboard}