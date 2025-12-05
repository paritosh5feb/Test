import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  ArrowLeft,
  ArrowUp,
  MessageSquare,
  Send,
  Tag,
  Target,
  Share2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function IdeaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, ideas, users, upvoteIdea, addComment } = useData();

  const [commentText, setCommentText] = useState('');

  const idea = ideas.find(i => i.id === id);
  const author = users.find(u => u.id === idea?.author);

  if (!idea) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Idea not found</h2>
        <p className="text-gray-600 mb-4">The idea you're looking for doesn't exist.</p>
        <Link to="/ideas" className="text-indigo-600 font-medium hover:text-indigo-700">
          Back to Ideas
        </Link>
      </div>
    );
  }

  const isUpvoted = idea.upvotedBy?.includes(currentUser?.id);

  const handleUpvote = () => {
    upvoteIdea(idea.id);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(idea.id, commentText.trim());
      setCommentText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate('/ideas')}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Ideas
      </button>

      {/* Main content */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="flex gap-6">
            {/* Upvote */}
            <div className="flex flex-col items-center">
              <button
                onClick={handleUpvote}
                className={`p-3 rounded-xl transition-colors ${
                  isUpvoted 
                    ? 'bg-indigo-100 text-indigo-600' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <ArrowUp className="w-6 h-6" />
              </button>
              <span className={`text-lg font-bold mt-2 ${isUpvoted ? 'text-indigo-600' : 'text-gray-700'}`}>
                {idea.upvotes}
              </span>
              <span className="text-xs text-gray-500">upvotes</span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {idea.title}
              </h1>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
                  <Tag className="w-4 h-4" />
                  {idea.category}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                  <Target className="w-4 h-4" />
                  {idea.stage}
                </span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {idea.description}
              </p>

              {/* Author info */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Link
                  to={`/profile/${author?.id}`}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={author?.avatar}
                    alt={author?.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{author?.name}</h4>
                    <p className="text-sm text-gray-500">
                      Posted {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </Link>

                <button
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Comments ({idea.comments?.length || 0})
          </h2>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="p-6 border-b bg-gray-50">
          <div className="flex gap-4">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div className="divide-y">
          {idea.comments && idea.comments.length > 0 ? (
            idea.comments.map((comment) => {
              const commentAuthor = users.find(u => u.id === comment.userId);
              return (
                <div key={comment.id} className="p-6">
                  <div className="flex gap-4">
                    <Link to={`/profile/${commentAuthor?.id}`}>
                      <img
                        src={commentAuthor?.avatar}
                        alt={commentAuthor?.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Link
                          to={`/profile/${commentAuthor?.id}`}
                          className="font-medium text-gray-900 hover:text-indigo-600"
                        >
                          {commentAuthor?.name}
                        </Link>
                        <span className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
