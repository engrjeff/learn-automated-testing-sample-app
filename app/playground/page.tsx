import { ProductForm } from '@/components/product-form';
import { ProductList } from '@/components/product-list';
import { Providers } from '@/components/providers';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playground',
};

function PlaygroundPage() {
  return (
    <Providers>
      <div>
        <h1 className="text-lg font-bold">Playground</h1>
        <div className="flex lg:items-start gap-6 flex-col-reverse lg:flex-row">
          <ProductList />
          <ProductForm />
        </div>
      </div>
    </Providers>
  );
}

export default PlaygroundPage;
