import React, {Component} from 'react';

class TabMenu extends Component {
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
        var children = this.props.children,
            count = children.length || 1,
            percent = (100 / count).toFixed(2) + '%';
        console.log(typeof children, children);
        return (

            <div className="tab-menu">
                <div className="menu-box">
                    {React
                        .Children
                        .map(children, (e, i) => {
                            return (
                                <a
                                    href="javascript:;"
                                    onClick={() => this.setState({currentIndex: i})}
                                    className={this.ck_click(i)} style={{width:percent}}>
                                    <span>{e.props.name}</span>
                                </a>
                            );
                        })
}
                </div>
                <div className="content-box">
                    {React
                        .Children
                        .map(children, (e, i) => {
                            return (
                                <div className={this.ck_click(i)}>{e}</div>
                            );
                        })
}
                </div>
            </div>
        );
    }
}

export {TabMenu}