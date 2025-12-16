import { useEffect } from "react";

const Menu = () => {
  useEffect(() => {
    // Redirect to PDF immediately
    window.location.href = "https://morello-paris.fr/wp-content/uploads/MENU.pdf";
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">Redirection vers la carte...</p>
    </div>
  );
};

export default Menu;
