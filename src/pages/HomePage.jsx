import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { getRandomColor } from "../lib/utils";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
      console.log(data.meals);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes("Chicken");
  }, []);

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    fetchRecipes(e.target[0].value);
  };

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={"24"} />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What do you want to cook today?"
            />
          </label>
        </form>

        {!loading && recipes.length !== 0 && (
          <div>
            <h1 className="font-bold text-3xl md:text-5xl mt-4">
              Recommended Recipes
            </h1>
            <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
              Popular choices
            </p>
          </div>
        )}

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
            ))}

          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 mt-8 w-full">
                <div className="skeleton h-32 w-full"></div>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}
        </div>

        {!loading && recipes.length === 0 && (
          <div className="h-[80vh] flex flex-col items-center gap-4">
            <img src="/404.svg" className="h-3/4" alt="404 svg" />
            <p>No recipes found. Try searching for something else!</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;