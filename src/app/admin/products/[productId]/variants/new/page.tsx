import PageTitle from '@/components/admin/PageTitle';
import { Tag } from 'lucide-react';
import CreateVariantForm from '@/components/admin/forms/CreateVariantForm';
import { GetProductById } from '@/lib/services/products';

type PropsType = {
    params: Promise<{ productId: string }>;
};

export default async function ProductVariantNew({ params }: PropsType) {
    const productReference = await params;
    const product = await GetProductById(parseInt(productReference.productId));
    const titleData = { title: 'Add Variant', icon: Tag };

    return (
        <div className="p-4 flex flex-col items-center">
            <div className="min-w-[700px]">
                <PageTitle data={titleData} />
                <CreateVariantForm
                    productReference={parseInt(productReference.productId)}
                    productAttributes={product?.productAttributes}
                />
            </div>
        </div>
    );
}
