import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div
      className="min-h-[70vh] flex items-center justify-center px-6"
      data-testid="notfound-page"
    >
      <div className="text-center max-w-xl">
        <div className="font-serif text-[140px] leading-none text-navy">404</div>
        <h1 className="font-serif text-3xl text-navy mt-4">Página não encontrada</h1>
        <p className="text-slate-600 mt-4">
          A página que você procura não existe ou foi movida. Volte para o início e explore nossos
          serviços.
        </p>
        <Link to="/" className="inline-block mt-8">
          <Button
            data-testid="notfound-home-btn"
            className="bg-navy hover:bg-gold text-white h-12 px-6 rounded-sm"
          >
            Voltar ao início
          </Button>
        </Link>
      </div>
    </div>
  );
}
