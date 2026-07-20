import { useEffect, useState } from "react";
import API from "../api/axios";

const NotificationBadge = () => {
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    try {
      const response = await API.get("/notifications");

      const notifications = response.data.notifications || response.data || [];

      const unread = notifications.filter((n) => !n.isRead).length;

      setCount(unread);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  if (count === 0) return null;

  return (
    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
      {count}
    </span>
  );
};

export default NotificationBadge;
