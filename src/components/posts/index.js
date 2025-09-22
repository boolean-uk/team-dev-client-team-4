import { useEffect, useState } from 'react';
import Post from '../post';
import { getPosts } from '../../service/apiClient';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const refreshPosts = () => {
    getPosts().then((data) => {
      const sortedPosts = data
        .map((p) => ({
          // normalise naming to what Post component expects
          ...p,
          createdAt: p.createdAt ?? p.created_at ?? p.dateCreated,
          body: p.body ?? p.content,
          authorId: p.authorId ?? p.author_id ?? p.author?.id,
          firstname: p.firstname ?? p.firstName ?? p.author?.firstName ?? '',
          lastname: p.lastname ?? p.lastName ?? p.author?.lastName ?? '',
          comments: Array.isArray(p.comments) ? p.comments : []
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(sortedPosts);
    });
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <>
      {posts.map((post) => {
        const sortedComments = [...post.comments].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        return (
          <Post
            key={`post-${post.id ?? `${post.authorId}-${post.createdAt}`}`}
            name={`${post.firstname} ${post.lastname}`}
            authorId={post.authorId}
            id={post.id}
            date={post.createdAt}
            content={post.body}
            comments={sortedComments}
            likes={post.likes}
            onCommentAdded={refreshPosts}
          />
        );
      })}
    </>
  );
};

export default Posts;
