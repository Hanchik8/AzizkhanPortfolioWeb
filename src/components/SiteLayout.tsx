import type { PropsWithChildren } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const SiteLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
