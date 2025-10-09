import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

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
        <FieldSeparator className="my-4 text-muted-foreground/70">
          Ou continuez avec
        </FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            className="w-full py-6 gap-3 transition-all duration-300 hover:scale-[1.02] hover:bg-secondary/50 hover:border-primary/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            <span className="font-medium">Se connecter avec GitHub</span>
          </Button>
          <FieldDescription className="text-center mt-6 text-sm">
            Vous n'avez pas de compte ?{" "}
            <a
              href="#"
              className="text-primary font-semibold hover:text-primary/80 underline underline-offset-4 transition-colors duration-200"
            >
              Inscrivez-vous
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
