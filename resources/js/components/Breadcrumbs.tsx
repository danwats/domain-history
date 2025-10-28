export interface Breadcrumbs {
    label: string
    url?: string | null
}

interface BreadcrumbsProps {
    breadcrumbs: Breadcrumbs[];
}

const GetBreadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
    return (
        <nav aria-label="Breadcrumb" className="text-sm min-width: 375px w-full mx-auto p-4 text-gray-600 mb-4">
            <ol className="flex flex-wrap space-x-4">
                {breadcrumbs.map((crumb, i) => (
                    <li key={i} className="flex items-center">
                        {crumb.url ? (
                            <a href={crumb.url} className="text-blue-600 hover:underline">
                                {crumb.label}
                            </a>
                        ) : (
                                <span className="text-gray-500">{crumb.label}</span>
                            )}
                        {i < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
                    </li>
                ))}
            </ol>
        </nav>
    )
};

export default GetBreadcrumbs;
