type PropData = {
  data: {
    title: string;
    icon?: React.ElementType | null;
  };
};

export default function PageTitle({ data }: PropData) {
  const Icon = data.icon;

  return (
    <h1 className="flex items-center gap-2 mb-4 font-semibold text-neutral-800">
      {Icon && <Icon className="w-5 h-5" />}
      <span className="text-xl">{data.title}</span>
    </h1>
  );
}
