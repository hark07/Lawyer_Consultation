import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await API.get("/reviews");

      setReviews(data);
    } catch (error) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = reviews.filter(
    (review) =>
      review.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      review.lawyer?.specialization
        ?.toLowerCase()
        .includes(search.toLowerCase()),
  );

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  if (loading) {
    return <div className="text-center py-10">Loading Reviews...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Reviews & Ratings</h1>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 bg-white"
        />
      </div>

      {/* Desktop Table */}

      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 text-left">User</th>

              <th className="p-4 text-left">Lawyer</th>

              <th className="p-4 text-left">Rating</th>

              <th className="p-4 text-left">Review</th>

              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredReviews.map((review) => (
              <tr key={review._id} className="border-b">
                <td className="p-4">{review.user?.name}</td>

                <td className="p-4">{review.lawyer?.specialization}</td>

                <td className="p-4">
                  <div className="flex gap-1">{renderStars(review.rating)}</div>
                </td>

                <td className="p-4">{review.comment}</td>

                <td className="p-4">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="grid gap-4 md:hidden">
        {filteredReviews.map((review) => (
          <div key={review._id} className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="font-bold">{review.user?.name}</h2>

            <p className="text-sm text-gray-500">
              {review.lawyer?.specialization}
            </p>

            <div className="flex gap-1 mt-2">{renderStars(review.rating)}</div>

            <p className="mt-3">{review.comment}</p>

            <p className="text-xs text-gray-500 mt-3">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
