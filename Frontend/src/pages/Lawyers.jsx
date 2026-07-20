import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import LawyerCard from "../components/LawyerCard";
import toast from "react-hot-toast";

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchLawyers = async () => {
    try {
      const response = await API.get("/lawyers");

      const lawyersData =
        response.data.lawyers || response.data.data || response.data || [];

      setLawyers(Array.isArray(lawyersData) ? lawyersData : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load lawyers");
      setLawyers([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await API.get("/legal-categories");

      console.log("Categories Response:", response.data);

      const categoriesData =
        response.data.categories || response.data.data || response.data || [];

      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error(error);
      setCategories([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([fetchLawyers(), fetchCategories()]);

      setLoading(false);
    };

    loadData();
  }, []);

  const filteredLawyers = lawyers.filter((lawyer) => {
    const searchMatch =
      lawyer.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.specialization?.some((item) =>
        item.toLowerCase().includes(search.toLowerCase()),
      );

    const categoryMatch =
      selectedCategory === ""
        ? true
        : lawyer.category?.name === selectedCategory;

    return searchMatch && categoryMatch;
  });

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800">Find a Lawyer</h1>

            <p className="text-gray-600 mt-2">
              Search experienced legal professionals
            </p>
          </div>

          {/* Search & Filter */}

          <div className="bg-white p-5 rounded-xl shadow mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Search lawyer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>

                {Array.isArray(categories) &&
                  categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Loading */}

          {loading ? (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold">Loading Lawyers...</h2>
            </div>
          ) : filteredLawyers.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">No Lawyers Found</h2>

              <p className="text-gray-500 mt-2">
                Try different search or category.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLawyers.map((lawyer) => (
                <LawyerCard key={lawyer._id} lawyer={lawyer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Lawyers;
