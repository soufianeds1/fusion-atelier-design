import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Menu = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif text-primary text-center mb-8">
            Notre Carte
          </h1>
          
          {/* PDF Viewer */}
          <div className="w-full max-w-4xl mx-auto">
            <iframe
              src="/MENU.pdf"
              className="w-full h-[80vh] rounded-lg border border-border shadow-lg"
              title="Menu Morello"
            />
            
            {/* Fallback download link */}
            <div className="text-center mt-4">
              <a 
                href="/MENU.pdf" 
                download="Menu-Morello.pdf"
                className="text-primary hover:underline"
              >
                Télécharger le PDF
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
