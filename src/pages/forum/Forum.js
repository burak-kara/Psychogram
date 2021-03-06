import React, { Component } from 'react';
import Post from '../../components/forumComponents/Post';
import PostEditor from '../../components/forumComponents/PostEditor';
import Reply from '../../components/forumComponents/Reply';
import { Route } from 'react-router-dom';
import ForumNavigation from '../../components/forumComponents/ForumNavigation';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../../_session';
import * as ROLES from '../../_constants/roles';

class Forum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
        this.addPost = this.addPost.bind(this);
    }

    addPost(newPostBody, newPostTitle) {
        const newState = Object.assign({}, this.state);
        let post = { body: newPostBody, title: newPostTitle };
        newState.posts.push(post);
        this.setState(newState);
    }

    render() {
        return (
            <div>
                <ForumNavigation />
                <Route exact path="/forum">
                    {this.state.posts.map((post, idx) => (
                        <div className="parent">
                            <Post
                                key={idx}
                                postBody={post.body}
                                postTitle={post.title}
                            />
                            <div className="child">
                                <Reply />
                            </div>
                        </div>
                    ))}
                </Route>
                <Route exact path="/forum/create">
                    <PostEditor addPost={this.addPost} />
                </Route>
            </div>
        );
    }
}

const condition = authUser =>
    authUser &&
    (authUser.role === ROLES.PATIENT || authUser.role === ROLES.DOCTOR);

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(Forum);
