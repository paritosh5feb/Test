import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  Search,
  Send,
  MessageSquare,
  ArrowLeft,
  User
} from 'lucide-react';
import { format, isToday, isYesterday } from 'date-fns';

export default function MessagesPage() {
  const { currentUser, users, getUserConversations, sendMessage } = useData();
  const conversations = getUserConversations();

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);

  const getOtherUser = (conversation) => {
    const otherUserId = conversation.participants.find(p => p !== currentUser?.id);
    return users.find(u => u.id === otherUserId);
  };

  const sortedConversations = [...conversations].sort((a, b) => 
    new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  const filteredConversations = sortedConversations.filter(conv => {
    if (!searchQuery) return true;
    const otherUser = getOtherUser(conv);
    return otherUser?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formatMessageTime = (dateString) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  const formatFullTime = (dateString) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return `Yesterday at ${format(date, 'h:mm a')}`;
    } else {
      return format(date, 'MMM d, yyyy h:mm a');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() && selectedConversation) {
      sendMessage(selectedConversation.id, messageText.trim());
      setMessageText('');
    }
  };

  const selectedOtherUser = selectedConversation ? getOtherUser(selectedConversation) : null;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div className={`w-full md:w-80 border-r flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => {
                  const otherUser = getOtherUser(conversation);
                  const lastMessage = conversation.messages[conversation.messages.length - 1];
                  const isSelected = selectedConversation?.id === conversation.id;

                  return (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                        isSelected ? 'bg-indigo-50' : ''
                      }`}
                    >
                      <img
                        src={otherUser?.avatar}
                        alt={otherUser?.name}
                        className="w-12 h-12 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">
                            {otherUser?.name}
                          </h3>
                          {lastMessage && (
                            <span className="text-xs text-gray-400">
                              {formatMessageTime(lastMessage.createdAt)}
                            </span>
                          )}
                        </div>
                        {lastMessage && (
                          <p className="text-sm text-gray-500 truncate">
                            {lastMessage.senderId === currentUser?.id ? 'You: ' : ''}
                            {lastMessage.text}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>{searchQuery ? 'No conversations found' : 'No messages yet'}</p>
                  <p className="text-sm mt-1">
                    Connect with founders and VCs to start chatting
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!selectedConversation ? 'hidden md:flex' : 'flex'}`}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center gap-3">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <Link to={`/profile/${selectedOtherUser?.id}`} className="flex items-center gap-3">
                    <img
                      src={selectedOtherUser?.avatar}
                      alt={selectedOtherUser?.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedOtherUser?.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {selectedOtherUser?.role === 'vc' ? 'VC / Investor' : 'Founder'}
                        {selectedOtherUser?.firm && ` at ${selectedOtherUser.firm}`}
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.length > 0 ? (
                    selectedConversation.messages.map((message, index) => {
                      const isOwn = message.senderId === currentUser?.id;
                      const sender = users.find(u => u.id === message.senderId);
                      const showAvatar = !isOwn && (
                        index === 0 || 
                        selectedConversation.messages[index - 1].senderId !== message.senderId
                      );

                      return (
                        <div
                          key={message.id}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-end gap-2 max-w-[70%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                            {!isOwn && (
                              <div className="w-8 h-8 flex-shrink-0">
                                {showAvatar && (
                                  <img
                                    src={sender?.avatar}
                                    alt={sender?.name}
                                    className="w-8 h-8 rounded-full"
                                  />
                                )}
                              </div>
                            )}
                            <div
                              className={`px-4 py-2 rounded-2xl ${
                                isOwn
                                  ? 'gradient-primary text-white rounded-br-md'
                                  : 'bg-gray-100 text-gray-900 rounded-bl-md'
                              }`}
                            >
                              <p className="break-words">{message.text}</p>
                              <p className={`text-xs mt-1 ${isOwn ? 'text-white/70' : 'text-gray-400'}`}>
                                {formatFullTime(message.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No messages yet</p>
                        <p className="text-sm">Start the conversation!</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={!messageText.trim()}
                      className="p-3 gradient-primary text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Your Messages</h3>
                  <p>Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
