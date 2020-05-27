import React from 'react';
import commentBox from 'commentbox.io';

export default class PageWithComments extends React.Component {

    componentDidMount() {
        this.removeCommentBox = commentBox('5671477185609728-proj');
    }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    render() {
        return (
            <div className="commentbox" id={this.props.id}/>
        );
    }
}