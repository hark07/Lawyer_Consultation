import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { FaBell, FaCheck, FaTrash } from "react-icons/fa";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  // GET NOTIFICATIONS

  const fetchNotifications = async () => {
    try {
      const { data } = await API.get("/notifications");

      setNotifications(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load notifications",
      );
    } finally {
      setLoading(false);
    }
  };

  // MARK AS READ

  const markAsRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isRead: true } : item,
        ),
      );

      toast.success("Notification marked as read");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update notification",
      );
    }
  };

  // DELETE NOTIFICATION

  const deleteNotification = async (id) => {
    try {
      await API.delete(`/notifications/${id}`);

      setNotifications((prev) => prev.filter((item) => item._id !== id));

      toast.success("Notification deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center gap-3">
        <FaBell className="text-blue-600 text-3xl" />

        <h1 className="text-3xl font-bold">Notifications</h1>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <FaBell className="mx-auto text-gray-400 text-4xl mb-3" />

          <p className="text-gray-500">No notifications available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`bg-white rounded-xl shadow p-5 border-l-4 ${
                notification.isRead ? "border-gray-300" : "border-blue-600"
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    {notification.title}
                  </h2>

                  <p className="text-gray-600 mt-2">{notification.message}</p>

                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      <FaCheck />
                      Read
                    </button>
                  )}

                  <button
                    onClick={() => deleteNotification(notification._id)}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
