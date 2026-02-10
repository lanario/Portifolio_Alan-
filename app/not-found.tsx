import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Container>
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            Página não encontrada
          </h2>
          <p className="text-gray-400 mb-8">
            A página que você está procurando não existe.
          </p>
          <Link href="/">
            <Button variant="primary">Voltar para o início</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default NotFound;
