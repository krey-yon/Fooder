import { useContext } from "react";
import { GlobalContext } from "../../Context";
import RecipeItem from "./RecipeList";

export default function Favorites() {
  const context = useContext(GlobalContext);
  const favoritesList = context ? context.favoritesList : [];

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((item: any ) => <RecipeItem item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing is added in favorites.
          </p>
        </div>
      )}
    </div>
  );
}