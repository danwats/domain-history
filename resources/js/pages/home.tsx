import SearchBox from '@/components/SearchBox';
import { HeroHome } from '@/components/HeroHome';

export default function Home() 
{
    return (
        <HeroHome>
            <div className="grid-cols-1">
                <h1 className="text-4xl md:text-6xl font-bold text-white grid-cols-1">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-800 from-sky-400">
                        Domain History
                    </span>
                </h1>
                <SearchBox />
            </div>
        </HeroHome>
    );
}

