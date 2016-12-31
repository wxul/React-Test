import React, {Component} from 'react';
import {Link} from 'react-router';
import {LinkList, SlideList} from './self/list';
import {TabMenu} from './self/tab';
import {Form} from './self/form';
import {Keyboard} from './self/nums';
import {Tip, Alert, Comfirm} from './self/alert';
import {Log} from '../common/tools';
import '../style/my.less';

class Index extends Component {
    render() {
        return (
            <div className="my">{this.props.children}</div>
        );
    }
}

//我的信息
class Info extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                avator: '',
                gender: 1,
                name: '',
                phone: ''
            }
        };
    }
    componentWillMount() {
        var user = {
            avator: 'http://i2.hdslb.com/bfs/face/099d483525595d8e4701541350d01a3f0e470e67.jpg',
            gender: 1,
            name: '测试名',
            phone: '1333333'
        }
        this.setState({
            user: {
                avator: user.avator,
                gender: user.gender == 1
                    ? require('../img/icon-gender-male.png')
                    : require('../img/icon-gender-male.png'),
                name: user.name,
                phone: user.phone
            }
        });
    }
    render() {
        //test data
        var links1 = [
                {
                    target: '/my/wallet',
                    icon: require('../img/icon-money.png'),
                    txt: '钱包'
                }, {
                    target: '/my/tickets',
                    icon: require('../img/icon-ticket.png'),
                    txt: '优惠券'
                }, {
                    target: '/my/questions',
                    icon: require('../img/icon-question.png'),
                    txt: '常见问题'
                }
            ],
            links2 = [
                {
                    target: '/my/share',
                    icon: require('../img/icon-share.png'),
                    txt: '分享',
                    tip: '分享领取优惠券'
                }, {
                    target: '/my/settings',
                    icon: require('../img/icon-setting.png'),
                    txt: '设置'
                }
            ];
        return (
            <div className="my-info">
                <div className="user-head">
                    <a href="javascript:;">
                        <div className="avator">
                            <img src={this.state.user.avator}/>
                        </div>
                        <div className="info">
                            <span className="username">{this.state.user.name}</span><img className="gender" src={this.state.user.gender}/>
                            <br/>
                            <span className="phone">{this.state.user.phone}</span>
                        </div>
                    </a>
                </div>
                <LinkList links={links1}></LinkList>
                <LinkList links={links2}></LinkList>
            </div>
        );
    }
}

//常见问题
class Questions extends Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 0
        };
    }

    ck_click(i) {
        return this.state.currentIndex == i
            ? "active"
            : "";
    }

    render() {
        var list1 = [
            {
                title: 'question1',
                content: 'asdasdafdfsdf'
            }, {
                title: 'question2',
                content: '123'
            }, {
                title: 'question3',
                content: 'gggggggggg'
            }
        ]
        return (
            <div className="questions">
                <TabMenu>
                    <div name="分类一">
                        <SlideList list={list1}></SlideList>
                    </div>
                    <div name="分类二">
                        sadafasdasfasd
                    </div>
                    <div name="其它">
                        fffff
                    </div>
                </TabMenu>
            </div>
        );
    }
}

//充值
class Payment extends Component {
    constructor() {
        super();
        this.state = {
            showkeyboard: false,
            money: 0,
            valid: false,
            cardinfo: null,
            pwdshow: false,
            pwd: "",
            pwdS: "", //●●●●●●
            links1: [
                {
                    target: '#',
                    icon: require('../img/icon-money.png'),
                    txt: '招商银行(尾号0024)',
                    click: (e) => {
                        e.preventDefault();
                        this
                            .refs
                            .selbank
                            .show();
                        return false;
                    }
                }
            ]
        };
    }
    onChildSubmit(e) {
        console.log(this); //提交

    };
    onvaluechange() {
        var _ = this;
        return function (v) {
            Log.log(v, typeof v);
            if (v.length > 6) 
                return;
            if (v.length > _.state.pwd.length) {
                //add
                _.setState({
                    pwd: v + ""
                }, () => {
                    if (v.length >= 6) {
                        //dosubmit
                        Log.log("need submit!");
                        Log.log(_.props.router)
                        _
                            .props
                            .router
                            .push({
                                pathname: "/my/payresult",
                                state: {
                                    result: "fail",
                                    redirect: "/my"
                                }
                            });
                    }
                });
            } else {
                _.setState({
                    pwd: v + ""
                })
            }
        }

    };
    numhide() {
        var _ = this;
        return function (e) {
            _.setState({pwdshow: false})
        }
    };
    submitForm() {
        var _ = this;
        return function (e) {
            Log.log(_.refs);
            _
                .refs
                .keyboard
                .show();
            _.setState({pwdshow: true, pwd: "", pwdS: ""})
        }

    };
    valuehandle() {
        return function (v) {
            return v.length <= 6;
        }
    };
    changebank() {
        var _ = this;
        return function (value) {
            _
            console.log(this.state, _.state, value);
        }

    };
    render() {
        var _ = this;
        var testreg = [
            {
                reg: /^[1-9]\d*$/,
                msg: 'test!'
            }
        ]
        return (
            <div className="payment">
                <LinkList links={this.state.links1}></LinkList>
                <p className="tip">该卡本次最多充值50000元</p>
                <Form handleSubmit={this.submitForm()}>
                    <input
                        inputtype="normal"
                        type="number"
                        name="amount"
                        value={0}
                        isvalid={true}
                        regs={testreg}
                        placeholder="请输入金额"
                        suffix="元"
                        remark="1元=1币"
                        des="充值金额"/>
                    <button type="submit" issubmit={true}>下一步</button>
                </Form>

                <Keyboard
                    ref="keyboard"
                    valueHandle={this.valuehandle()}
                    onValueChange={this.onvaluechange()}
                    onhide={this.numhide()}></Keyboard>

                <div
                    className={this.state.pwdshow
                    ? "bankPwd"
                    : "bankPwd hide"}>
                    <div className="pwdForm">
                        <div className="header">
                            <img src={require('../img/icon-lock-l.png')} alt=""/><br/>
                            <span>请输入银行密码</span>
                        </div>
                        <p className="bankInfo">招商银行(尾号1200)</p>
                        <div className="pwd">
                            <div
                                className={this.state.pwd[0]
                                ? ""
                                : "hide"}>●</div>
                            <div
                                className={this.state.pwd[1]
                                ? ""
                                : "hide"}>●</div>
                            <div
                                className={this.state.pwd[2]
                                ? ""
                                : "hide"}>●</div>
                            <div
                                className={this.state.pwd[3]
                                ? ""
                                : "hide"}>●</div>
                            <div
                                className={this.state.pwd[4]
                                ? ""
                                : "hide"}>●</div>
                            <div
                                className={this.state.pwd[5]
                                ? ""
                                : "hide"}>●</div>
                        </div>
                    </div>
                </div>
                <SelectBank onchange={this.changebank()} ref="selbank"></SelectBank>
            </div>
        )
    }
}

//钱包
class Wallet extends Component {
    constructor() {
        super();
    }
    render() {
        var links1 = [
                {
                    target: '/my/payment',
                    icon: require('../img/icon-arr-right.png'),
                    txt: '充值'
                }, {
                    target: '/my/cash',
                    icon: require('../img/icon-wallet.png'),
                    txt: '提现'
                }
            ],
            links2 = [
                {
                    target: '/my/cards',
                    icon: require('../img/icon-doc.png'),
                    txt: '银行卡'
                }, {
                    target: '/my/payinfo',
                    icon: require('../img/icon-text.png'),
                    txt: '记录'
                }
            ];
        return (
            <div className="wallet">
                <div className="wallet-head">
                    <p className="title">金币账户</p>
                    <p className="money">45600.00</p>
                </div>
                <LinkList links={links1}></LinkList>
                <LinkList links={links2}></LinkList>
            </div>
        );
    }
}

//银行卡
class Cards extends Component {

    render() {

        return (
            <div className="cards">
                <ul>
                    <li>
                        <Link to="/my/mycard"></Link>
                    </li>
                    <li>
                        <Link to="/my/mycard"></Link>
                    </li>
                </ul>
                <Link className="add" to="/my/addcard">
                    添加银行卡 &gt;
                </Link>
            </div>
        );
    }
}

//添加银行卡
class AddCard extends Component {
    submitForm() {
        return function () {
            Log.log("submit!");
        }
    };
    render() {
        var testreg = [
            {
                reg: /^\d+$/,
                msg: 'test!'
            }
        ]
        return (
            <div className="addCard">
                <Form handleSubmit={this.submitForm()}>
                    <input
                        type="text"
                        name="cardNo"
                        isvalid={true}
                        regs={testreg}
                        placeholder="请输入银行卡号"
                        remark="请放心使用，已智能加密，保障您的用卡安全"
                        des="卡号"/>
                    <button type="submit" issubmit={true}>下一步</button>
                </Form>
            </div>
        );
    }
}

//明细列表
class PayInfo extends Component {
    render() {
        var testdata = [
            {
                type: 'in',
                money: 500,
                date: '2012-12-12',
                balance: 6666
            }, {
                type: 'out',
                money: 500,
                date: '2012-12-12',
                balance: 6666
            }
        ]
        return (
            <div className="payinfo">
                <ul>
                    {testdata.map((e, i) => {
                        return (
                            <li key={i}>
                                <Link to="/my/paydetail">
                                    <p className="title">
                                        {e.type == 'in'
                                            ? "充值"
                                            : "提现"}
                                        <time>{e.date}</time>
                                    </p>
                                    <p className="content">
                                        <span className="bc">余额:{e.balance}</span>
                                        <span className={e.type}>{(e.type == 'in'
                                                ? "+"
                                                : "- ") + e.money}</span>
                                    </p>
                                </Link>
                            </li>
                        );
                    })}

                </ul>
            </div>
        );
    }
}

//明细
class PayInfoDetail extends Component {
    render() {
        return (
            <div className="payinfodetail">
                <div className="status">
                    <p className="type">充值</p>
                    <p className="info">
                        <span>交易成功</span>
                        5000.00
                    </p>
                </div>
                <div className="details">
                    <div className="section">
                        <span className="fr">招商银行</span>
                        <span>交易方式</span>
                    </div>
                    <div className="section">
                        <span className="fr">2012-12-12</span>
                        <span>创建时间</span>
                    </div>
                </div>
            </div>
        );
    }
}

//优惠券
class Tickets extends Component {
    render() {
        return (
            <div className="tickets"></div>
        );
    }
}

//选择银行-模块
class SelectBank extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            banks: [
                {
                    banktype: 'cmb',
                    name: "招商银行储蓄卡",
                    tip: "可用额度10000.00元",
                    isselect: true
                }, {
                    banktype: 'cmb',
                    name: "招商银行储蓄卡",
                    tip: "可用额度10000.00元",
                    isselect: false
                }
            ]
        }
    };
    show() {
        this.setState({show: true});
    };
    close() {
        this.setState({show: false});
    };
    choose(index) {
        var banks = this.state.banks,
            tmp;
        banks.map((e, i) => {
            e.isselect = i == index;
            if (i == index) 
                tmp = e;
            return e;
        });
        this.setState({
            banks: banks
        }, (e) => {
            if (typeof this.props.onchange == "function") 
                this.props.onchange(tmp);
            setTimeout(() => {
                this.close();
            }, 200);
        })
    };
    render() {
        return (
            <div
                className={this.state.show
                ? "selectbank"
                : "selectbank hide"}
                onClick={() => this.close()}>
                <div
                    className="content"
                    onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }}>
                    <h3 className="title">
                        <div className="img" onClick={() => this.close()}>
                            <img src={require('../img/icon-close.png')} alt=""/>
                        </div>
                        选择付款方式
                    </h3>
                    <ul>
                        {this
                            .state
                            .banks
                            .map((e, i) => {
                                return (
                                    <li
                                        className={e.isselect
                                        ? "active"
                                        : ""}
                                        key={i}
                                        onClick={() => {
                                        this.choose(i)
                                    }}>
                                        <a className={e.banktype}>
                                            <p>{e.name}</p>
                                            <p className="tip2">{e.tip}</p>
                                        </a>
                                    </li>
                                );
                            })}
                        <li className="last">
                            使用新卡支付
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

//充值结果
class PayResult extends Component {
    constructor() {
        super();
    };
    btnclick() {
        var param = this.props.location.state || {};
        console.log(param);
        if (param.redirect) {
            this
                .props
                .router
                .push({pathname: param.redirect});
        } else {
            this
                .props
                .router
                .go(-1);
        }
    };
    render() {
        var param = this.props.location.state || {};
        console.log(param);
        return (
            <div className="payresult">
                <div className="img">
                    <img
                        src={param.result == "success"
                        ? require("../img/icon-suc.png")
                        : require("../img/icon-fail.png")}
                        alt=""/>
                </div>
                <p className="resulttype">{param.result == "success"
                        ? "您已支付成功！"
                        : "支付失败！"}</p>
                {param.tip
                    ? <p className="tip3">{param.tip}</p>
                    : ""}
                <button className={param.result} onClick={() => this.btnclick()}>{param.result == "success"
                        ? "完  成"
                        : "我知道了"}</button>
            </div>
        );
    }
}

//设置
class Settings extends Component {

    render() {
        var links1 = [
            {
                target: '/my/setpwd',
                txt: '提现密码'
            }, {
                target: '/my/setphone',
                txt: '手机号码',
                tip: "13344445555"
            }
        ];
        return (
            <div className="settings">
                <LinkList links={links1}></LinkList>
            </div>
        );
    }
}

//提现
class Cash extends Component {
    constructor() {
        super();
        this.state = {
            showkeyboard: false,
            money: 0,
            valid: false,
            cardinfo: null,
            pwdshow: false,
            pwd: "",
            pwdS: "", //●●●●●●
            links1: [
                {
                    target: '#',
                    icon: require('../img/icon-money.png'),
                    txt: '招商银行(尾号0024)',
                    click: (e) => {
                        e.preventDefault();
                        this
                            .refs
                            .selbank
                            .show();
                        return false;
                    }
                }
            ]
        };
    }
    changebank() {
        var _ = this;
        return function (value) {
            _
            console.log(this.state, _.state, value);
        }

    };
    submitForm() {
        var _ = this;
        return function (e) {
            Log.log(_.refs);

            _
                .refs
                .keyboard
                .show();
            _.setState({pwdshow: true, pwd: "", pwdS: ""})
        }

    };
    numhide() {
        var _ = this;
        return function (e) {
            _.setState({pwdshow: false})
        }
    };
    onvaluechange() {
        var _ = this;
        return function (v) {
            Log.log(v, typeof v);
            if (v.length > 6) 
                return;
            if (v.length > _.state.pwd.length) {
                //add
                _.setState({
                    pwd: v + ""
                }, () => {
                    if (v.length >= 6) {
                        //dosubmit
                        Log.log("need submit!");
                        Log.log(_.props.router)
                        _
                            .props
                            .router
                            .push({
                                pathname: "/my/payresult",
                                state: {
                                    result: "fail",
                                    redirect: "/my"
                                }
                            });
                    }
                });
            } else {
                _.setState({
                    pwd: v + ""
                })
            }
        }

    };
    valuehandle() {
        return function (v) {
            return v.length <= 6;
        }
    };
    changebank() {
        var _ = this;
        return function (value) {
            _
            console.log(this.state, _.state, value);
        }

    };
    render() {
        var _ = this;
        var testreg = [
            {
                reg: /^[1-9]\d*$/,
                msg: 'test!'
            }
        ]
        return (
            <div className="cash">
                <LinkList links={this.state.links1}></LinkList>
                <Form handleSubmit={this.submitForm()}>
                    <input
                        inputtype="other"
                        type="number"
                        name="amount"
                        value={0}
                        isvalid={true}
                        regs={testreg}
                        placeholder="请输入金额"
                        suffix="￥"
                        max="200"
                        remark="1元=1币"
                        des="充值金额"/>
                    <button type="submit" issubmit={true}>两小时内到账，确认提现</button>
                </Form>

                <Keyboard
                    ref="keyboard"
                    valueHandle={this.valuehandle()}
                    onValueChange={this.onvaluechange()}
                    onhide={this.numhide()}></Keyboard>

                <div
                    className={this.state.pwdshow
                    ? "bankPwd"
                    : "bankPwd hide"}>
                    <div className="pwdForm">
                        <div className="header">
                            <img src={require('../img/icon-lock-l.png')} alt=""/><br/>
                            <span>请输入银行密码</span>
                        </div>
                        <p className="bankInfo">招商银行(尾号1200)</p>
                        <div className="pwd">
                            <div
                                className={this.state.pwd[0]
                                ? ""
                                : "hide"}>●</div>
                            <div
                                className={this.state.pwd[1]
                                ? ""
                                : "hide"}>●</div>
                            <div
                                className={this.state.pwd[2]
                                ? ""
                                : "hide"}>●</div>
                            <div
                                className={this.state.pwd[3]
                                ? ""
                                : "hide"}>●</div>
                            <div
                                className={this.state.pwd[4]
                                ? ""
                                : "hide"}>●</div>
                            <div
                                className={this.state.pwd[5]
                                ? ""
                                : "hide"}>●</div>
                        </div>
                    </div>
                </div>

                <SelectBank onchange={this.changebank()} ref="selbank"></SelectBank>
            </div>
        );
    }
}

class SetPwd extends Component {
    render() {
        return (
            <div className="setpwd">
                <form action="" className="sform">
                    <div className="form-line">
                        <label htmlFor="">
                            <span>验证码</span>
                            <input type="phone" maxLength="6" placeholder="请输入手机验证码"/>
                            <button className="lbtn" type="button">获取验证码</button>
                        </label>

                    </div>
                    <div className="form-line">
                        <label htmlFor="">
                            <span>新密码</span>
                            <input type="text" placeholder="请输入新密码"/>
                        </label>
                    </div>
                    <button className="sub" type="submit">保 存</button>
                </form>
            </div>
        );
    }
}

//修改手机号码
class SetPhone extends Component {
    submitform() {
        var _ = this;
        return function (e) {
            e.stopPropagation();
            e.preventDefault();
            console.log(_.props);
            _
                .refs
                .tip
                .show("手机格式错误");
            return false;
        }
    };
    render() {
        console.log(this.props.location.state);
        return (
            <div className="setphone">
                <Tip ref="tip"></Tip>
                <form action="#" className="sform" onSubmit={this.submitform()}>
                    <div className="form-line">
                        <label htmlFor="">
                            <span>新号码</span>
                            <input type="text" placeholder="请输入新手机号码"/>
                        </label>
                    </div>
                    <div className="form-line">
                        <label htmlFor="">
                            <span>验证码</span>
                            <input type="phone" maxLength="6" placeholder="请输入验证码"/>
                            <button className="lbtn" type="button">获取验证码</button>
                        </label>
                    </div>
                    <button className="sub" type="submit">保 存</button>
                </form>
            </div>
        );
    }
}

export default {
    Index,
    Info,
    Questions,
    Payment,
    Wallet,
    Cards,
    AddCard,
    PayInfo,
    PayInfoDetail,
    Tickets,
    PayResult,
    Settings,
    Cash,
    SetPwd,
    SetPhone
};