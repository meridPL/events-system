export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      <table className="w-full table-fixed text-left text-sm">{children}</table>
    </div>
  );
};

export const TableHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <thead>
      <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        {children}
      </tr>
    </thead>
  );
};

export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  );
};

export const TableRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      {children}
    </tr>
  );
};

export const TableCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{children}</td>
  );
};

export const TableHeaderCell = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
      {children}
    </th>
  );
};
