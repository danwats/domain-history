import { HeroRecords} from '@/components/HeroHome';
import  GetBreadcrumbs, { Breadcrumbs } from '@/components/Breadcrumbs';
import { showRecordTypes } from '@/actions/App/Http/Controllers/DomainController';

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

type RecordItem = {
  name: string;
  count: number;
};

interface WeeklyData {
    date: string;
    created: number;
    updated: number;
    last_seen: number;
    total: number;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Weekly {
    weeklyData: WeeklyData[];
}

export default function DomainShow({
    domain,
    records,
    breadcrumbs,
    weekly_data,
}: {
        domain: string;
        records: RecordItem[];
        routes: {
            recordShow: string;
        }
        breadcrumbs: Breadcrumbs[]
        weekly_data: Weekly
    }) {

    // set up the chart
    const labels = weekly_data.map((d: WeeklyData) => d.date);
    const soa = weekly_data.map((d: WeeklyData) => d.created_soa);
    const createdData = weekly_data.map((d: WeeklyData) => d.created);
    const updatedData = weekly_data.map((d:WeeklyData) => d.updated);
    const lastSeenData = weekly_data.map((d:WeeklyData) => d.last_seen);
    const totalData = weekly_data.map((d: WeeklyData) => d.total);

    const data = {
        labels,
        datasets: [
            {
                label: "Created SOA",
                data: soa,
                backgroundColor: "rgba(54,162,100,0.6)"
            },
            {
                label: "Created",
                data: createdData,
                backgroundColor: "rgba(54,162,235,0.6)"
            },
            {
                label: "Updated",
                data: updatedData,
                backgroundColor: "rgba(255,206,86,0.6)"
            },
            {
                label: "Last Seen",
                data: lastSeenData,
                backgroundColor: "rgba(75,192,192,0.6)"
            },
            {
                label: "Total",
                data: totalData,
                backgroundColor: "rgba(255,120,100,0.6)"
            }
        ]
    };

    const options = {
        interaction: {
            intersect: false,
            mode: 'index',
        },
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Records Over the Week' },
        },
    };

    return (
        <HeroRecords>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <GetBreadcrumbs breadcrumbs={breadcrumbs}/>

            <h1 className="text-center text-4xl md:text-6xl font-bold text-white grid-cols-1"><span className="custom-colour">Domain: {domain}</span></h1>
            <div className="relative flex flex-col w-full max-w-150 text-gray-700 bg-blue-500/20 shadow-md mx-auto rounded-xl bg-clip-border">
                <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base text-white font-normal text-blue-gray-700">
                    <Bar data={data} options={options} />
                    {records.map(({name, count}) => (
                        <a key={name} href={showRecordTypes([domain, name]).url}>
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
