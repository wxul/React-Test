import React, {Component} from 'react';
import {Log} from '../common/tools';
import '../style/message.less';

class Index extends Component {

    render() {
        var testdata = [
            {
                msgtype: "中奖通知",
                msgcat: "活动",
                msg: "sdasdfa中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知",
                date: "2012-12-12"
            },
            {
                msgtype: "中奖通知",
                msgcat: "优惠",
                msg: "sdasdfa中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知中奖通知",
                date: "2012-12-12"
            }
        ];
        return (
            <div className="messages">
                {testdata.map((e, i) => {
                    return (
                        <div className="msgitem" key={i}>
                            <h4>{e.msgcat}</h4>
                            <h5>
                                <time>{e.date}</time>{e.msgtype}</h5>
                            <p>{e.msg}</p>
                        </div>
                    );
                })
}
            </div>
        );
    }
}

export default {
    Index
};