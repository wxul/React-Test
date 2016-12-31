import React, {Component} from 'react';
import {Link} from 'react-router';

var LinkList = React.createClass({
    getDefaultProps: function () {
        return {links: []};
    },
    propTypes: {
        links: React.PropTypes.array.isRequired
    },
    render: function () {
        var links = this.props.links || [];
        return (
            <div className="linklist-box">
                <ul>
                    {links
                        .map(function (e, i) {
                            return (
                                <li className="linklist-item" key={i}>
                                    <Link to={e.target} onClick={e.click}>{e.icon?<img src={e.icon}/>:""}
                                        <span>{e.txt}</span>
                                        <span className="pull-r">{e.tip}</span>
                                    </Link>
                                </li>
                            )
                        })
}
                </ul>
            </div>
        );
    }
});

var SlideList = React.createClass({
    getInitialState: function () {
        return {currentIndex: -1};
    },
    getDefaultProps: function () {
        return {list: []};
    },
    propTypes: {
        list: React.PropTypes.array.isRequired
    },
    componentWillMount: function () {
        this.setState({currentIndex: -1});
    },
    ck_click: function (i) {
        return this.state.currentIndex == i
            ? "slidelist-item active"
            : "slidelist-item";
    },
    fill: function foo(str, len) {
        str = '00000' + str;
        return str.substring(str.length - len, str.length);
    },
    render: function () {
        var list = this.props.list || [];
        var _ = this;
        //var children=this.props.children;
        return (
            <div className="slidelist-box">
                <ul>
                    {list
                        .map(function (e, i) {
                            return (
                                <li className={_.ck_click(i)} key={i}>
                                    <a
                                        onClick={() => {
                                        _.state.currentIndex == i
                                            ? _.setState({currentIndex: -1})
                                            : _.setState({currentIndex: i})
                                    }}>
                                        <span>{_.fill(i + 1, 2)}、</span>{e.title}</a>
                                    <div className="content">
                                        {e.content}
                                    </div>
                                </li>
                            )
                        })
}
                </ul>
            </div>
        );
    }
});

export {LinkList, SlideList};