import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  // GET ALL CATEGORIES

  const fetchCategories = async () => {
    try {
      const { data } = await API.get("/legal-categories");

      setCategories(data.categories || []);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // ADD / UPDATE

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/legal-categories/${editingId}`, {
          name,
          description,
        });

        toast.success("Category Updated");
      } else {
        await API.post("/legal-categories", {
          name,
          description,
        });

        toast.success("Category Added");
      }

      setName("");

      setDescription("");

      setEditingId(null);

      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation Failed");
    }
  };

  // EDIT

  const editCategory = (category) => {
    setEditingId(category._id);

    setName(category.name);

    setDescription(category.description || "");
  };

  // DELETE

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await API.delete(`/legal-categories/${id}`);

      toast.success("Category Deleted");

      fetchCategories();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  // SEARCH FILTER

  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <div className="text-center py-10">Loading Categories...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Legal Categories</h1>

        <input
          type="text"
          placeholder="Search Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />
      </div>

      {/* FORM */}

      <div className="bg-white rounded-xl shadow p-5">
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <textarea
            placeholder="Category Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full border rounded-lg px-4 py-3"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            {editingId ? "Update Category" : "Add Category"}
          </button>
        </form>
      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Description</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category._id} className="border-b">
                <td className="p-4 font-semibold">{category.name}</td>

                <td className="p-4">{category.description}</td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => editCategory(category)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCategory(category._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}

      <div className="grid gap-4 md:hidden">
        {filteredCategories.map((category) => (
          <div key={category._id} className="bg-white rounded-xl shadow p-4">
            <h2 className="font-bold text-lg">{category.name}</h2>

            <p className="text-gray-600 mt-2">{category.description}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => editCategory(category)}
                className="flex-1 bg-yellow-500 text-white py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCategory(category._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
