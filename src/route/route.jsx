import React, {Component, PropTypes} from 'react';
import {
    Router,
    Route,
    Redirect,
    IndexRoute,
    browserHistory,
    hashHistory
} from 'react-router';
import Root from '../component/root';
import My from '../component/my';
import Message from '../component/message';
import It from '../component/it';
import Default from '../component/defaults';
import {Log, Common} from '../common/tools';
/*
const history = process.env.NODE_ENV === 'production'
    ? hashHistory
    : browserHistory;*/
const history = hashHistory;
/*
class Root extends Component{
    render(){
        return (
            <div className="index">{this.props.children}</div>
        );
    }
}*/

function routeChange(pre, next) {
    if (window.wx) {
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx8ec3521edff751b9', // 必填，公众号的唯一标识
            timestamp :+ new Date(), // 必填，生成签名的时间戳
            nonceStr: '', // 必填，生成签名的随机串
            signature: '', // 必填，签名，见附录1
            jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }

}
var config = {};
function getWxConfig() {
    config = config || {};
    if (!config.timestamp || config.timestamp - 10000 < (+ new Date())) {
        var timestamp =+ new Date();
        config = {
            debug: true,
            appId: 'wx8ec3521edff751b9',
            timestamp: timestamp,
            nonceStr: Common.RandomStr(16),
            jsApiList: []
        }
    }

    return config;
}

const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Root} onChange={routeChange}>
            <IndexRoute component={Default.RootIndex}/>
            //首页
            <Route path="my" component={My.Index}>
                //我的信息
                <IndexRoute component={My.Info}/>
                <Route path="questions" component={My.Questions}/>
                <Route path="payment" component={My.Payment}/>
                <Route path="wallet" component={My.Wallet}/>
                <Route path="cards" component={My.Cards}/>
                <Route path="addcard" component={My.AddCard}/>
                <Route path="payinfo" component={My.PayInfo}/>
                <Route path="paydetail" component={My.PayInfoDetail}/>
                <Route path="payresult" component={My.PayResult}/>
                <Route path="settings" component={My.Settings}/>
                <Route path="cash" component={My.Cash}/>
                <Route path="setpwd" component={My.SetPwd}/>SetPhone
                <Route path="setphone" component={My.SetPhone}/>
            </Route>
            <Route path="message" component={Message.Index}>
                //消息
            </Route>
            <Route path="i" component={It.Index}>
                //菜单一
            </Route>
            <Route path="y" component={Root}>
                //菜单二
            </Route>
        </Route>
    </Router>
);

export default RouteConfig;