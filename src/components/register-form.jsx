import { useContext } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "./ui/field";
import { Input } from "./ui/input";
import { useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export function RegisterForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await register(email, password, name);
      
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-6 w-full max-w-md mx-auto p-8 bg-card rounded-xl shadow-lg border border-border/50 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center mb-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            S'inscrire
          </h1>
          <p className="text-muted-foreground text-sm text-balance leading-relaxed">
            Entrez vos identifiants pour créer un compte
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name" className="text-sm font-medium">
            Nom
          </FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Votre nom"
            value={name}
            onChange={handleNameChange}
            disabled={isLoading}
            required
            className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email" className="text-sm font-medium">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="votre.email@example.com"
            value={email}
            onChange={handleEmailChange}
            disabled={isLoading}
            required
            className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
          />
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password" className="text-sm font-medium">
              Mot de Passe
            </FieldLabel>
           
          </div>
          <Input
            id="password"
            type="password"
            onChange={handlePasswordChange}
            value={password}
            disabled={isLoading}
            required
            className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
          />
        </Field>
        {error && (
          <div className="text-red-500 text-sm text-center py-2 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}
        <Field>
          <Button
            type="submit"
            className="w-full mt-2 py-6 font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
          >
            {isLoading ? "Connexion..." : "S'inscrire"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
