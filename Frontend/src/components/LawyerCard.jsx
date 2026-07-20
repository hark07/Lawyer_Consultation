import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from "react-icons/fa";

const LawyerCard = ({ lawyer }) => {
  const imageUrl =
    lawyer?.profileImage || "https://via.placeholder.com/400x400?text=Lawyer";

  return (
    <div
      className="
      bg-white 
      rounded-2xl 
      overflow-hidden 
      shadow-md 
      hover:shadow-2xl 
      transition-all 
      duration-300
      border
    "
    >
      {/* IMAGE */}

      <div className="relative">
        <img
          src={imageUrl}
          alt={lawyer?.user?.name || "Lawyer"}
          className="
            w-full
            h-64
            object-cover
          "
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x400?text=Lawyer";
          }}
        />

        {/* Status */}

        <span
          className="
          absolute
          top-4
          right-4
          bg-green-500
          text-white
          text-xs
          px-3
          py-1
          rounded-full
          font-semibold
        "
        >
          Verified
        </span>
      </div>

      {/* CONTENT */}

      <div className="p-5">
        <h2
          className="
          text-xl
          font-bold
          text-gray-800
        "
        >
          {lawyer?.user?.name}
        </h2>

        <p
          className="
          text-blue-600
          font-semibold
          mt-1
        "
        >
          {lawyer?.specialization?.join(", ")}
        </p>

        <div
          className="
          mt-4
          space-y-3
          text-gray-600
          text-sm
        "
        >
          <p className="flex items-center gap-2">
            <FaBriefcase className="text-blue-600" />
            {lawyer?.experience || 0} Years Experience
          </p>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />

            {lawyer?.location || "Location not available"}
          </p>

          <p className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" />
            Rs. {lawyer?.consultationFee || 0}
          </p>
        </div>

        <div
          className="
          mt-4
          bg-blue-50
          rounded-lg
          p-3
        "
        >
          <p className="text-sm text-gray-600">Category</p>

          <p
            className="
            font-semibold
            text-gray-800
          "
          >
            {lawyer?.category?.name}
          </p>
        </div>

        <Link
          to={`/lawyers/${lawyer._id}`}
          className="
            block
            mt-5
            text-center
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default LawyerCard;
