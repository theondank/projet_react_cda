import React, { useState } from "react";

export default function RecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = { title, description, ingredients, steps, image };
    onAddRecipe(newRecipe);
    // réinitialise le formulaire
    setTitle("");
    setDescription("");
    setIngredients("");
    setSteps("");
    setImage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Ajouter une recette 🍳</h2>

      <input
        type="text"
        placeholder="Nom de la recette"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full border p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <textarea
        placeholder="Ingrédients (séparés par des virgules)"
        className="w-full border p-2 rounded"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <textarea
        placeholder="Étapes de préparation"
        className="w-full border p-2 rounded"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
      />

      <input
        type="text"
        placeholder="URL de l’image"
        className="w-full border p-2 rounded"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Enregistrer la recette
      </button>
    </form>
  );
}
