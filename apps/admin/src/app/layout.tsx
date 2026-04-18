import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthProvider } from "@/context/AuthContext";
import "./design-system.css";
export default function Layout({ children }: any) {
  return (
    <html lang="en">
      <body style={{ background: "#F5F5F5" }}>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
