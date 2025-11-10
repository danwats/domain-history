import { HeroRecords} from '@/components/HeroHome';
import  GetBreadcrumbs, { Breadcrumbs } from '@/components/Breadcrumbs';
import { showRecords } from '@/actions/App/Http/Controllers/DomainController';

type recordItem = {
    name: string;
    count: number;
}

export default function RecordTypes({
    name,
    domain,
    recordTypes,
    breadcrumbs,
}: {
        name: string
        domain: string
        breadcrumbs: Breadcrumbs[]
        recordTypes: recordItem[]
    }) {

    return (
        <HeroRecords>
            <GetBreadcrumbs breadcrumbs={breadcrumbs}/>
            <h1 className="text-center text-4xl md:text-6xl font-bold text-white grid-cols-1"><span className="custom-colour">Domain: {domain}</span></h1>
            <h2 className="text-center text-2xl md:text-6xl font-bold text-white grid-cols-1"><span className="custom-colour">Hostname: {name}</span></h2>
            <div className="relative flex flex-col w-full max-w-100 text-gray-700 bg-blue-500/20 shadow-md mx-auto rounded-xl bg-clip-border">
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base text-white font-normal text-blue-gray-700">
                    {recordTypes.map(({hostname, type, count}) => (
                        <a key={type} href={showRecords([domain, name, type]).url}>
                            <div
                                role="button"
                                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start 
                                hover:bg-blue-200 hover:text-blue-900 
                                focus:bg-blue-200 focus:text-blue-900 
                                active:bg-blue-200 active:text-blue-900"
                            >
                                {type}
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
