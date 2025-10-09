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

export function LoginForm({ className, ...props }) {
  return (
    <form
      className={cn(
        "flex flex-col gap-6 w-full max-w-md mx-auto p-8 bg-card rounded-xl shadow-lg border border-border/50 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center mb-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Se connecter
          </h1>
          <p className="text-muted-foreground text-sm text-balance leading-relaxed">
            Entrez vos identifiants pour accéder à votre compte
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email" className="text-sm font-medium">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="votre.email@example.com"
            required
            className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
          />
        </Field>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password" className="text-sm font-medium">
              Mot de Passe
            </FieldLabel>
            <a
              href="#"
              className="ml-auto text-xs text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors duration-200 font-medium"
            >
              Mot de passe oublié ?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="transition-all duration-200 focus:scale-[1.01] focus:shadow-md"
          />
        </Field>
        <Field>
          <Button
            type="submit"
            className="w-full mt-2 py-6 font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
          >
            Se connecter
          </Button>
        </Field>
        <FieldDescription className="text-center mt-6 text-sm">
          Vous n'avez pas de compte ?{" "}
          <a
            href="#"
            className="text-primary font-semibold hover:text-primary/80 underline underline-offset-4 transition-colors duration-200"
          >
            Inscrivez-vous
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
