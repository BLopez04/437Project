export interface IApiUserData {
    id: string;
    username: string;
    ingredients: IApiIngredient[];
    recipes: IApiRecipe[];
}

export interface IApiIngredient {
    name: string;
    amount: number;
    scale: string;
    type: string;
}

export interface IApiRecipe {
    name: string;
    steps: string;
    possible: boolean;
    ingredients: IApiIngredient[]
}