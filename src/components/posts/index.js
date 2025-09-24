import Post from '../post';

const Posts = (props) => {
    const {posts, refreshPosts} = props;

    return (
        <>
            {posts.map((post, i) => {
                const sortedComments = [...post.comments].sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );

                return (
                    <Post
                        key={`post-${post.id ?? `${post.authorId ?? 'na'}-${post.createdAt}-${i}`}`}
                        listIndex={i}
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
