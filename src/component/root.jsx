import React, {Component} from 'react';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Link} from 'react-router';

class Root extends Component {
    constructor() {
        super();
        this.state = {
            user: "34123124"
        }
        
    }
    render() {
        console.log(wx);
        this.props.location.state = this.state;
        return (
            <div className="index">
                <div className="head"></div>
                <ReactCSSTransitionGroup
                    transitionName="transitionWrapper"
                    component="div"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    <div
                        className="body"
                        key={this.props.location.pathname}
                        style={{
                        position: "absolute",
                        width: "100%"
                    }}>
                        {this.props.children}
                    </div>
                </ReactCSSTransitionGroup>
                <div className="foot">
                    <ul className="nav">
                        <li>
                            <Link to="/i" activeClassName="active">菜单一</Link>
                        </li>
                        <li>
                            <Link to="/message" activeClassName="active">消息</Link>
                        </li>
                        <li>
                            <Link to="/my" activeClassName="active">我的</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Root;