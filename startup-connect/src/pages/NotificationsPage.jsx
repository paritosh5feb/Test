import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  Bell,
  UserPlus,
  MessageSquare,
  Lightbulb,
  Check,
  X,
  CheckCheck
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsPage() {
  const { 
    users,
    getUserNotifications, 
    getPendingConnectionRequests,
    markNotificationRead,
    markAllNotificationsRead,
    acceptConnectionRequest,
    declineConnectionRequest
  } = useData();

  const notifications = getUserNotifications().sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
  
  const pendingRequests = getPendingConnectionRequests();
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'connection_request':
      case 'connection_accepted':
        return <UserPlus className="w-5 h-5 text-indigo-600" />;
      case 'new_message':
        return <MessageSquare className="w-5 h-5 text-green-600" />;
      case 'idea_comment':
        return <Lightbulb className="w-5 h-5 text-amber-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleAccept = (requestId) => {
    acceptConnectionRequest(requestId);
  };

  const handleDecline = (requestId) => {
    declineConnectionRequest(requestId);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Stay updated on your connections and activity</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <CheckCheck className="w-5 h-5" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Connection Requests */}
      {pendingRequests.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b bg-indigo-50">
            <h2 className="font-semibold text-indigo-900 flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Connection Requests ({pendingRequests.length})
            </h2>
          </div>
          <div className="divide-y">
            {pendingRequests.map((request) => {
              const fromUser = users.find(u => u.id === request.fromUserId);
              return (
                <div key={request.id} className="p-4 flex items-center gap-4">
                  <Link to={`/profile/${fromUser?.id}`}>
                    <img
                      src={fromUser?.avatar}
                      alt={fromUser?.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/profile/${fromUser?.id}`}
                      className="font-medium text-gray-900 hover:text-indigo-600"
                    >
                      {fromUser?.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {fromUser?.role === 'vc' ? `VC at ${fromUser.firm}` : 'Founder'}
                      {' • '}
                      {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(request.id)}
                      className="inline-flex items-center gap-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Decline
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-900">All Notifications</h2>
        </div>
        
        {notifications.length > 0 ? (
          <div className="divide-y">
            {notifications.map((notification) => {
              const fromUser = notification.fromUserId 
                ? users.find(u => u.id === notification.fromUserId) 
                : null;

              return (
                <div
                  key={notification.id}
                  onClick={() => !notification.read && markNotificationRead(notification.id)}
                  className={`p-4 flex items-start gap-4 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-indigo-50/50 hover:bg-indigo-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    !notification.read ? 'bg-white' : 'bg-gray-100'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  {fromUser && (
                    <Link to={`/profile/${fromUser.id}`}>
                      <img
                        src={fromUser.avatar}
                        alt={fromUser.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-900 mb-1">No notifications yet</p>
            <p className="text-sm">When you get notifications, they'll show up here</p>
          </div>
        )}
      </div>
    </div>
  );
}
