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
            key={post.id}
            // name={`${post.author.first_name} ${post.author.last_name}`}
            id={`${post.authorId}`}
            date={post.createdAt}
            content={post.body}
            comments={post.comments}
            likes={post.likes}
            value={console.log(post.credential)}
          />
        );
      })}
    </>
  );
};

export default Posts;
