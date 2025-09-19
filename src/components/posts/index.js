import { useEffect, useState } from 'react';
import Post from '../post';
import { getPosts } from '../../service/apiClient';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            key={'post' + post.id}
            name={`${post.firstname} ${post.lastname}`}
            id={`${post.id}`}
            date={post.createdAt}
            content={post.body}
            comments={post.comments}
            likes={post.likes}
          />
        );
      })}
    </>
  );
};

export default Posts;
