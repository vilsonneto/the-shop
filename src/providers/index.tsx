import { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { CartProvider } from "./Cart";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};
