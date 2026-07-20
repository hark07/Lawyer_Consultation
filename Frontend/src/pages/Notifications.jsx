import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import toast from "react-hot-toast";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/notifications");

      setNotifications(data.notifications || data.data || data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                isRead: true,
              }
            : item,
        ),
      );

      toast.success("Notification marked as read");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update notification");
    }
  };

  const markAllRead = async () => {
    try {
      const unread = notifications.filter((item) => !item.isRead);

      await Promise.all(
        unread.map((item) => API.put(`/notifications/${item._id}/read`)),
      );

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        })),
      );

      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to update notifications");
    }
  };

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>

              <p className="text-gray-500 mt-1">
                {unreadCount} unread notification
                {unreadCount !== 1 ? "s" : ""}
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Mark All Read
              </button>
            )}
          </div>

          {loading ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <h2 className="text-lg font-semibold">
                Loading Notifications...
              </h2>
            </div>
          ) : notifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <h2 className="text-xl font-semibold">No Notifications Found</h2>

              <p className="text-gray-500 mt-2">
                You don't have any notifications yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`rounded-xl shadow border p-5 transition ${
                    notification.isRead
                      ? "bg-white"
                      : "bg-blue-50 border-blue-300"
                  }`}
                >
                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      {notification.title && (
                        <h3 className="font-bold text-lg mb-1">
                          {notification.title}
                        </h3>
                      )}

                      <p className="text-gray-700">{notification.message}</p>

                      {notification.type && (
                        <span className="inline-block mt-3 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {notification.type}
                        </span>
                      )}

                      <p className="text-sm text-gray-500 mt-3">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg h-fit"
                      >
                        Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
