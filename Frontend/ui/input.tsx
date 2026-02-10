export const Input = ({
  value,
  onChange,
  type,
  label,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  type: React.HTMLInputTypeAttribute;
  id: string;
  label?: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      ) : null}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
      />
    </div>
  );
};
