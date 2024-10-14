import { createContext, useState, ReactNode } from "react";

// Recipe interface outside the component for cleaner code
interface Recipe {
  id: string;
  title: string;
  image_url: string;
  publisher: string;
  recipe: string;
  source_url: string;
  servings: number;
  cooking_time: number;
  ingredients: Ingredient[];
  // Add other properties as needed
}

interface Ingredient {
  quantity: number;
  unit: string;
  description: string;
}

// Define the type for the GlobalContext
interface GlobalContextType {
  searchParam: string;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  recipeList: Recipe[];
  recipeDetailsData: Recipe | null;
  setRecipeDetailsData: React.Dispatch<React.SetStateAction<Recipe | null>>;
  favoritesList: Recipe[];
  setFavoritesList: React.Dispatch<React.SetStateAction<Recipe[]>>;
  handleAddToFavorite: (getCuurentItem: Recipe) => void;
}

// Create the context with null as default
export const GlobalContext = createContext<GlobalContextType | null>(null);

// Props for GlobalState
interface GlobalStateProps {
  children: ReactNode;
}

// GlobalState component
export default function GlobalState({ children }: GlobalStateProps) {
  // State hooks
  const [searchParam, setSearchParam] = useState<string>(""); // Stores the search input
  const [loading, setLoading] = useState<boolean>(false); // Loading state for API call
  const [recipeList, setRecipeList] = useState<Recipe[]>([]); // Stores fetched recipes
  const [recipeDetailsData, setRecipeDetailsData] = useState<Recipe | null>(
    null
  ); // Stores the selected recipe details
  const [favoritesList, setFavoritesList] = useState<Recipe[]>([]); // Stores the favorite recipes

  // Function to handle form submission and make the API call
  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevents page refresh on form submission

    setLoading(true); // Set loading to true before API call
    setRecipeList([]); // Clear previous recipe list before new search

    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();

      // Check if recipes exist in the response
      if (data?.data?.recipes) {
        setRecipeList(data.data.recipes); // Update state with new recipes
      } else {
        setRecipeList([]); // Set empty list if no recipes found
      }
    } catch (error) {
      console.error("Error fetching recipes:", error); // Log the error for debugging
    } finally {
      setLoading(false); // Stop loading after the API call is complete
      setSearchParam(""); // Clear the search input
    }
  }

  // Log for debugging (you can remove this in production)
  // console.log("Fetched Recipes:", recipeList);

  //function add to favorite
  function handleAddToFavorite(getCurrentItem: unknown) {
    console.log(getCurrentItem);
    const cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex(item => item.id === (getCurrentItem as Recipe).id)

    if(index === -1) {
      cpyFavoritesList.push(getCurrentItem as Recipe)
    } else {
      cpyFavoritesList.splice(index)
    }

    setFavoritesList(cpyFavoritesList)
  }

  console.log("Favorites List:", favoritesList);

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleFormSubmit,
        loading,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        favoritesList,
        setFavoritesList,
        handleAddToFavorite
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
