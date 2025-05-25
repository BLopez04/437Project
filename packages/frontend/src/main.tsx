import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter} from "react-router";
import App from "./App.tsx";
import "./index.css";

const DATA = {
    id: "abcdef",
    username: "Pasta Fred",
    ingredients: [
        { name: "Butter", amount: 4, scale: "oz", type: "Dairy" },
        { name: "Fettuccine", amount: 16, scale: "oz", type: "Grain" },
        { name: "Parmesan", amount: 12, scale: "oz", type: "Dairy" },
        { name: "Heavy Cream", amount: 24, scale: "oz", type: "Dairy" },
        { name: "Strawberry Jam", amount: 2, scale: "oz", type: "Misc" },
        { name: "Bread", amount: 36, scale: "oz", type: "Grain" },
        { name: "Peanut Butter", amount: 2, scale: "oz", type: "Misc" },
        { name: "Celery", amount: 3, scale: "cups", type: "Vegetable" }
    ],
    recipes: [
        {
            name: "Fettuccine Alfredo",
            steps: `Bring 6 cups of water to a boil
                Put 1 cup of pasta in the boiling water
                On the side, bring the butter to a simmer
                Gradually pour in the heavy cream
                Gradually sprinkle in the parmesan
                Strain the pasta, and stir in the sauce`,
            possible: true,
            ingredients: [
                { name: "Butter", amount: 4, scale: "oz", type: "Dairy" },
                { name: "Fettuccine", amount: 16, scale: "oz", type: "Grain" },
                { name: "Parmesan", amount: 1, scale: "cups", type: "Dairy" },
                { name: "Heavy Cream", amount: 24, scale: "oz", type: "Dairy" }
            ]
        },
        {
            name: "Peanut Butter Jelly Sandwich",
            steps: `Get two slices of bread
                   Get some jam and spread it on one slice of bread
                   Get some peanut butter and spread it on the other slice
                   Close the bread together!`,
            possible: true,
            ingredients: [
                { name: "Bread", amount: 2, scale: "cups", type: "Grain" },
                { name: "Peanut Butter", amount: 2, scale: "oz", type: "Misc" },
                { name: "Strawberry Jam", amount: 2, scale: "oz", type: "Misc" }
            ]
        },
        {
            name: "Celery and Peanut Butter",
            steps: `You know what to do.
                    Dip the celery in peanut butter`,
            possible: true,
            ingredients: [
                { name: "Celery", amount: 2, scale: "cups", type: "Vegetable" },
                { name: "Peanut Butter", amount: 1, scale: "oz", type: "Misc" }
            ]
        },
        {
            name: "Tuna",
            steps: `Believe it or not, its tuna`,
            possible: false,
            ingredients: [
                { name: "Tuna", amount: 8, scale: "oz", type: "Protein" }
            ]
        }
    ]
};



createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <App id={DATA.id} username={DATA.username} recipes={DATA.recipes}
          ingredients={DATA.ingredients}/>
      </BrowserRouter>
  </StrictMode>,
)
