'use client';

import { UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { ProductAttribute } from '@/types';

type PropsType = {
    setValue: UseFormSetValue<any>;
    getValues: UseFormGetValues<any>;
    productAttributes: ProductAttribute[];
};

type variantValueType = {
    attributeId: number;
    attributeValueId: number;
};

export default function ChooseOptions({
    productAttributes,
    setValue,
    getValues,
}: PropsType) {
    const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const attrId = Number(e.target.id.split('_')[1]);
        const valueId = Number(e.target.value);

        const updated = (getValues('variantValues') || []).map(
            (v: variantValueType) =>
                v.attributeId === attrId
                    ? { ...v, attributeValueId: valueId }
                    : v
        );

        setValue('variantValues', updated, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const variantValues: variantValueType[] = getValues('variantValues') || [];

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-2">Options</h2>
            <div className="flex flex-col gap-4">
                {productAttributes.map((attr) => {
                    const selectedValue =
                        variantValues.find((v) => v.attributeId === attr.id)
                            ?.attributeValueId ?? '';

                    return (
                        <div key={attr.id} className="flex flex-col">
                            <label className="text-sm text-neutral-700 required-label">
                                {attr.name}
                            </label>
                            <select
                                id={`attribute_${attr.id}`}
                                name={`attribute_${attr.id}`}
                                className="border rounded-md border-neutral-500 text-sm p-2 text-neutral-700 w-full"
                                onChange={handleSelectOption}
                                value={selectedValue}
                            >
                                <option disabled value="">
                                    Select one option value
                                </option>
                                {attr.attributeValues.map((av) => (
                                    <option key={av.id} value={av.id}>
                                        {av.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
