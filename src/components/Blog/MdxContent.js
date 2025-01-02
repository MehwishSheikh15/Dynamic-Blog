// import * as runtime from 'react/jsx-runtime'
// import Image from 'next/image'

// const sharedComponents = {
//   Image
// }

// const useMDXComponent = (code) => {
//   const fn = new Function(code)
//   return fn({ ...runtime }).default
// }

//  const MDXContent = ({ code, components, ...props }) => {
//   const Component = useMDXComponent(code)
//   return <Component components={{ ...sharedComponents, ...components }} {...props} />
// }

// export default MDXContent
import * as runtime from 'react/jsx-runtime';
import Image from 'next/image';
import { useState } from 'react';

const sharedComponents = {
  Image,
};

const useMDXComponent = (code) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const MDXContent = ({ code, components, ...props }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const Component = useMDXComponent(code);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
    }
  };

  return (
    <div>
      <Component components={{ ...sharedComponents, ...components }} {...props} />
      <div className="comment-section">
        <h3 className="mt-8 mb-4 text-lg font-semibold">Comments</h3>
        <div className="mb-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <p key={index} className="mb-2 border-b pb-2">
                {comment}
              </p>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
        <div className="add-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-black  text-white rounded"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default MDXContent;
