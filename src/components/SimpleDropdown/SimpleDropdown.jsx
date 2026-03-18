import Link from "next/link";

export default function SimpleDropdown({ show, sublinks }) {
  if (!show) return null;

  return (
    <ul className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50">
      {sublinks.map((sublink, index) => (
        <li key={index} className="hover:bg-gray-100">
          <Link
            href={sublink.slug}
            className="block px-4 py-2 text-sm text-gray-700"
          >
            {sublink.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
