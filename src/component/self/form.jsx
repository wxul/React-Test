import React, {Component} from 'react';
import {Log} from '../../common/tools';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            valid: false,
            forms: []
        };
    }
    //输入改变时验证
    inputChange(index) {
        var frm = this.state.forms,
            _ = this;
        return function (e) {
            var input = e.target.value;
            if (e.target.type == 'number') {
                input = Number(input);
            }
            var r = _.inputVali(index, input, () => { //回调，验证全部输入
                var result = true;
                var frms = _.state.forms;
                frms.forEach((e, i) => {
                    result = result && e.isvalid;
                    return result;
                });
                frms[index].value = input;
                _.setState({valid: result, forms: frms});
            });
            Log.info(r);
        }
    };
    //验证单个输入框
    inputVali(index, input, cb) {
        var forms = this.state.forms,
            result = true,
            msg = "";
        if (!!forms[index].joinvalid) {
            forms[index]
                .validArr
                .forEach((e, i) => {
                    result = result && e
                        .reg
                        .test(input);
                    msg = result
                        ? ""
                        : e.msg;
                    return result;
                });
        }
        forms[index].isvalid = result;
        this.setState({
            forms: forms
        }, (typeof cb == "function" && cb(result)));
        return {result, msg};
    };
    //表单提交事件
    submitClick() {
        var _ = this;
        return function (e) {
            e.stopPropagation();
            e.preventDefault();

            (typeof _.props.handleSubmit == "function") && _
                .props
                .handleSubmit
                .call(_.state, e);
            return false;
        }

    };
    componentWillMount() {
        var children = this.props.children,
            forms = this.state.forms,
            _ = this;
        React
            .Children
            .forEach(children, (e, i) => {
                if (e.type == "input") {
                    var newFormItem = {
                        name: e.props.name,
                        value: e.props.value,
                        joinvalid: !!e.props.isvalid,
                        validArr: e.props.regs || [], //[{reg:/^test$/,msg:"tip!"}]
                        isvalid: !e.props.isvalid
                    };
                    forms[i] = newFormItem;
                }
            });

        _.setState({forms: forms});
    };

    render() {
        var children = this.props.children,
            forms = this.state.forms,
            _ = this;
        return (
            <div className="form-content">
                <form onSubmit={this.submitClick()}>
                    {React
                        .Children
                        .map(children, function (e, i) {
                            if (e.type == "input") {
                                if (e.props.inputtype == "normal") {
                                    return (
                                        <div className="form-line">
                                            <label className="normal" htmlFor="">
                                                {e.props.des}
                                                <span className="fr">
                                                    <input
                                                        type={e.props.type}
                                                        id={e.props.id}
                                                        name={e.props.name}
                                                        value={forms[i].value}
                                                        placeholder={e.props.placeholder}
                                                        onChange={_.inputChange(i)}/> {e.props.suffix && e.props.suffix}
                                                </span>
                                            </label>
                                            {e.props.remark && <p className="tip">备注：{e.props.remark}</p>}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="form-line">
                                            <label className="other" htmlFor="">
                                                <span className="des">{e.props.des}</span>
                                                <span className="input">
                                                    <span className="prefix">{e.props.suffix && e.props.suffix}</span>
                                                    <input
                                                        type={e.props.type}
                                                        id={e.props.id}
                                                        name={e.props.name}
                                                        value={forms[i].value}
                                                        placeholder={e.props.placeholder}
                                                        onChange={_.inputChange(i)}/>
                                                </span>
                                                <span className="tip99">{e.props.tip}</span>
                                            </label>
                                            {e.props.remark && <p className="tip">备注：{e.props.remark}</p>}
                                        </div>
                                    );
                                }

                            } else if (e.type == "textarea") {
                                return e;
                            } else if (e.type == "button") {
                                if (!!e.props.issubmit) {
                                    return (
                                        <button
                                            type={e.props.type}
                                            className={_.state.valid
                                            ? ""
                                            : "disable"}>{e.props.children}</button>
                                    );
                                }
                                return e;
                            } else {
                                return e;
                            }
                        })}
                </form>
            </div>
        );
    }
}

export {Form}