import { HeroRecords} from '@/components/HeroHome';
import  GetBreadcrumbs, { Breadcrumbs } from '@/components/Breadcrumbs';

type RecordItem = {
  name: string;
  count: number;
};

export default function DomainShow({
    domain,
    records,
    routes,
    breadcrumbs,
}: {
        domain: string;
        records: RecordItem[];
        routes: {
            recordShow: string;
        }
        breadcrumbs: Breadcrumbs[]
    }) {

    const buildUrl = (domainName: string, recordName: string) => {
        return routes.recordShow
            .replace(':domain', domainName)
            .replace(':record', recordName);
    };

    return (
        <HeroRecords>
            <GetBreadcrumbs breadcrumbs={breadcrumbs}/>

            <h1 className="text-center text-4xl md:text-6xl font-bold text-white grid-cols-1"><span className="custom-colour">Domain: {domain}</span></h1>
            <div className="relative flex flex-col w-full max-w-100 text-gray-700 bg-blue-500/20 shadow-md mx-auto rounded-xl bg-clip-border">
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base text-white font-normal text-blue-gray-700">

                    {records.map(({name, count}) => (
                        <a key={name} href={buildUrl(domain, name)}>
                            <div
                                role="button"
                                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start 
                                hover:bg-blue-200 hover:text-blue-900 
                                focus:bg-blue-200 focus:text-blue-900 
                                active:bg-blue-200 active:text-blue-900"
                            >
                                {name}
                                <div className="grid ml-auto place-items-center justify-self-end">
                                    <div
                                        className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-gray-900 uppercase rounded-full select-none whitespace-nowrap bg-gray-900/10 text-white"
                                    >
                                        <span>{count}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </nav>
            </div>
        </HeroRecords>
    );
}
