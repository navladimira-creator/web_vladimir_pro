import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Veřejná část webu: horní menu a patička.
export default function WebLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
