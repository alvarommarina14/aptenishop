import { GetProductById } from '@/lib/services/products';
import PageTitle from '@/components/admin/PageTitle';
import { Tag } from 'lucide-react';
import UpdateProductForm from '@/components/admin/forms/UpdateProductForm';

type Props = {
    params: Promise<{ productId: string }>;
};

export default async function Product({ params }: Props) {
    const { productId } = await params;
    const product = await GetProductById(parseInt(productId));

    if (!product) {
        return <p>Product not found</p>;
    }

    const titleData = { title: product.name, icon: Tag };

    return (
        <div className="p-4 flex flex-col items-center ">
            <div>
                <PageTitle data={titleData} />
                <UpdateProductForm productData={product} />
            </div>
        </div>
    );
}
