import React from "react";
import { Input } from "@ui/input";
import { Field, FieldLabel, FieldGroup, FieldError } from "@ui/field";
import { FileText, Tag, Clock, Gauge, DollarSign } from "lucide-react";

const RecipeBasicInfoFields = ({ formData, errors, onChange }) => {
  return (
    <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-neutral-800">
        <FileText className="w-5 h-5 text-primary" />
        Informations de base
      </h3>

      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="nom" className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              Nom de la recette *
            </FieldLabel>
            <Input
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={onChange}
              placeholder="Ex: Tarte aux pommes"
              className="mt-1"
            />
            <FieldError>{errors.nom}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="temps" className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Temps (minutes) *
            </FieldLabel>
            <Input
              id="temps"
              name="temps"
              type="number"
              min="1"
              value={formData.temps}
              onChange={onChange}
              placeholder="45"
              className="mt-1"
            />
            <FieldError>{errors.temps}</FieldError>
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel
              htmlFor="difficulte"
              className="flex items-center gap-1"
            >
              <Gauge className="w-4 h-4" />
              Difficulté *
            </FieldLabel>
            <select
              id="difficulte"
              name="difficulte"
              value={formData.difficulte}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value={1}>Très facile</option>
              <option value={2}>Facile</option>
              <option value={3}>Modéré</option>
              <option value={4}>Difficile</option>
              <option value={5}>Très difficile</option>
            </select>
            <FieldError>{errors.difficulte}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="prix" className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              Prix (€) *
            </FieldLabel>
            <Input
              id="prix"
              name="prix"
              type="number"
              step="0.01"
              min="0"
              value={formData.prix}
              onChange={onChange}
              placeholder="15.50"
              className="mt-1"
            />
            <FieldError>{errors.prix}</FieldError>
          </Field>
        </div>
      </FieldGroup>
    </div>
  );
};

export default RecipeBasicInfoFields;
