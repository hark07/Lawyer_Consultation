const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>

          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div className="text-4xl text-blue-600">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
