import GetBreadcrumbs, { Breadcrumbs } from '@/components/Breadcrumbs';
import { HeroRecords} from '@/components/HeroHome';
import { ShowRecordType } from '@/components/RecordTypes';
import { router } from '@inertiajs/react';
import { showRecords } from '@/actions/App/Http/Controllers/DomainController';

export default function RecordTypes({
    domain,
    paginate,
    recordName,
    recordTypeName,
    data,
    breadcrumbs,
    routes,
}: {
        domain: string
        recordName: string
        recordTypeName: string
        recordTypes: Record<string, number>
        data: Record<string, any>[]
        paginate: Record<string, number> 
        breadcrumbs: Breadcrumbs[]
        routes: Record<string, string>
    }) {

    const handlePageChange = (domain: string, recordName: string, recordType: string, page: number) => {
        router.get(
            showRecords([domain, recordName, recordType], {
                query: { page },
            }).url
        );
    };

    return (
        <HeroRecords>

            <GetBreadcrumbs breadcrumbs={breadcrumbs}/>

            <h1 className="text-center text-4xl md:text-6xl font-bold text-white grid-cols-1"><span className="custom-colour">Domain: {domain}</span></h1>
            <h2 className="text-center text-2xl md:text-6xl font-bold text-white grid-cols-1"><span className="custom-colour">Hostname: {recordName}</span></h2>
            <h3 className="text-center text-2xl md:text-6xl font-bold text-white grid-cols-1"><span className="custom-colour">Type: {recordTypeName}</span></h3>
            <div className="relative flex flex-col text-gray-700 bg-blue-500/20 shadow-md max-w-3xl mx-auto rounded-xl bg-clip-border">
                <nav className="flex flex-col max-w-500 gap-1 p-2 font-sans text-base text-white font-normal text-blue-gray-700">
                    <ShowRecordType record={data} type={recordTypeName} />
                </nav>
            </div>

            {paginate.lastPage > 1 &&
            <div>
                <div className="pagination text-white text-center">
                    <div className="pagination-info">
                        Showing {paginate.from} to {paginate.to} of {paginate.total} results
                    </div>

                    <div className="pagination-buttons">
                        <button 
                            onClick={() => handlePageChange(domain, recordName, recordTypeName, paginate.currentPage - 1)}
                            disabled={paginate.currentPage === 1}
                            className={paginate.currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer underline"}
                        >
                            Previous
                        </button>

                        <span> Page {paginate.currentPage} of {paginate.lastPage} </span>

                        <button 
                            onClick={() => handlePageChange(domain, recordName, recordTypeName, paginate.currentPage + 1)}
                            disabled={paginate.currentPage === paginate.lastPage}
                            className={paginate.currentPage === paginate.lastPage ? "cursor-not-allowed" : "cursor-pointer underline"}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            }

        </HeroRecords>
    );

}
