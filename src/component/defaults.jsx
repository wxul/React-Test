import React,{Component} from 'react';

class RootIndex extends Component{
    render(){
        return(
            <div>this is root-index!</div>
        )
    }
}

class NotFound extends Component{
    render(){
        return(
            <div>this is 404!</div>
        )
    }
}

class Error extends Component{
    render(){
        return(
            <div>this is error!</div>
        )
    }
}

export default {RootIndex,NotFound,Error};