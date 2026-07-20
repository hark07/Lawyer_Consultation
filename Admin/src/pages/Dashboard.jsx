import { useEffect, useState } from "react";
import API from "../api/axios";

import { FaUsers, FaStar, FaCalendarCheck } from "react-icons/fa";

import { GiJusticeStar } from "react-icons/gi";

import { MdPendingActions, MdCancel } from "react-icons/md";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLawyers: 0,
    approvedLawyers: 0,
    pendingLawyers: 0,
    rejectedLawyers: 0,
    totalAppointments: 0,
    completedAppointments: 0,
    totalReviews: 0,
    averageRating: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await API.get("/admin/analytics");

      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    {
      name: "Users",
      value: stats.totalUsers,
    },
    {
      name: "Lawyers",
      value: stats.totalLawyers,
    },
    {
      name: "Approved",
      value: stats.approvedLawyers,
    },
    {
      name: "Pending",
      value: stats.pendingLawyers,
    },
    {
      name: "Rejected",
      value: stats.rejectedLawyers,
    },
    {
      name: "Appointments",
      value: stats.totalAppointments,
    },
  ];

  const Card = ({ title, value, icon }) => (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div className="text-blue-600 text-4xl">{icon}</div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-center py-10">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-gray-500">Legal Consultation Admin Panel</p>
      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card title="Total Users" value={stats.totalUsers} icon={<FaUsers />} />

        <Card
          title="Total Lawyers"
          value={stats.totalLawyers}
          icon={<GiJusticeStar />}
        />

        <Card
          title="Pending Lawyers"
          value={stats.pendingLawyers}
          icon={<MdPendingActions />}
        />

        <Card
          title="Completed Appointments"
          value={stats.completedAppointments}
          icon={<FaCalendarCheck />}
        />

        <Card
          title="Approved Lawyers"
          value={stats.approvedLawyers}
          icon={<GiJusticeStar />}
        />

        <Card
          title="Rejected Lawyers"
          value={stats.rejectedLawyers}
          icon={<MdCancel />}
        />

        <Card title="Reviews" value={stats.totalReviews} icon={<FaStar />} />

        <Card
          title="Average Rating"
          value={stats.averageRating}
          icon={<FaStar />}
        />
      </div>

      {/* Analytics Chart */}

      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="text-xl font-semibold mb-5">Analytics Overview</h2>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary */}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">System Summary</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Total Appointments</h3>

            <p className="text-3xl font-bold mt-2">{stats.totalAppointments}</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Average Lawyer Rating</h3>

            <p className="text-3xl font-bold mt-2">{stats.averageRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
