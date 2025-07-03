import { UseFormSetValue, UseFormGetValues } from 'react-hook-form';

import { ProductAttribute } from '@/types';

type PropsType = {
    setValue: UseFormSetValue<any>;
    getValues: UseFormGetValues<any>;
    productAttributes: ProductAttribute[];
};

export default function ChooseOptions({
    productAttributes,
    setValue,
    getValues,
}: PropsType) {
    const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const variantValuesArray = getValues('variantValues') || [];
        const selectedAttrId = Number(e.target.id.split('_')[1]);
        const selectedValueId = Number(e.target.value);

        const updatedVariantValues = variantValuesArray.map(
            (item: { attributeId: number; attributeValueId: number }) => {
                if (item.attributeId === selectedAttrId) {
                    return {
                        ...item,
                        attributeValueId: selectedValueId,
                    };
                }
                return item;
            }
        );

        setValue('variantValues', updatedVariantValues, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-2">Options</h2>
            <div className="flex flex-col gap-4">
                {productAttributes?.length > 0 &&
                    productAttributes?.map((attr: ProductAttribute) => {
                        return (
                            <div key={attr.id} className="flex flex-col">
                                <label className="text-sm text-neutral-700 required-label">
                                    {attr.name}
                                </label>
                                <select
                                    onChange={handleSelectOption}
                                    id={`attribute_${attr.id}`}
                                    name={`attribute_${attr.id}`}
                                    className="border rounded-md border-neutral-500 text-sm p-2 text-neutral-700 w-full"
                                >
                                    <option disabled value={''}>
                                        Select one option value
                                    </option>
                                    {attr.attributeValues.map((av) => {
                                        return (
                                            <option value={av.id} key={av.id}>
                                                {av.value}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
