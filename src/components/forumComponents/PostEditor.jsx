import React, {Component, useState} from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPostBody: '',
            newTitle: ''
        };
    }

    handleTextChange(ev) {
        this.setState({
            newPostBody: ev.target.value
        });
    }

    handleTitleChange(ev) {
        this.setState({
            newTitle: ev.target.value
        });
    }

    createPost() {
        this.props.addPost(this.state.newPostBody, this.state.newTitle);
        this.setState({
            newPostBody: '',
            newTitle: ''
        });
    }

    render() {
        return (
            <div className="post-editor">
                <div className="panel-body">
                    <input type="text" className="form-control"
                           placeholder="Enter the title..."
                           value={this.state.newTitle}
                           onChange={this.handleTitleChange.bind(this)}/>
                    <TextareaAutosize
                        className="form-control"
                        placeholder="Enter the content..."
                        rows="7"
                        cols="25"
                        value={this.state.newPostBody}
                        onChange={this.handleTextChange.bind(this)}
                    />
                    <button
                        className="btn-success"
                        onClick={this.createPost.bind(this)}
                        disabled={!this.state.newPostBody}
                    >
                        Post
                    </button>
                </div>
            </div>
        );
    }
}

export default PostEditor;
