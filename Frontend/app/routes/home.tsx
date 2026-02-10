import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Strona główna" },
    { name: "description", content: "Witaj — przejdź do listy eventów." },
  ];
}

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
          Witaj
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Przejdź do listy eventów, aby zobaczyć nadchodzące wydarzenia.
        </p>
        <div className="mt-10">
          <Link
            to="/events"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 text-base font-medium hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors shadow-sm"
          >
            Zobacz zdarzenia
          </Link>
        </div>
      </div>
    </div>
  );
}
