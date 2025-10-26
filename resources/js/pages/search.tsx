import { router } from '@inertiajs/react';
import { HeroSearch } from '@/components/HeroHome';
import { searchClass,searchButtonClass } from '@/components/HeroHomeVars';

interface ResultItem {
  name: string;
  last_updated: string;
}

export default function Search({
    query,
    results,
    routes,
}: {
        query: string,
        results: ResultItem[],
        routes: Record<string, string>,
    }) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.get('/search', {
            query: formData.get('query') as string
        });
    };

    const buildUrl = (domain: string) => {
        return routes.domain
            .replace(':domain', domain)
    };

    if (!results) {
        return (
            <HeroSearch>
                <div id="search">
                    <form onSubmit={handleSubmit}>
                        <input 
                        className={searchClass}
                            type="text" 
                            name="query" 
                            defaultValue={query}
                            placeholder="Search..."
                        />
                        <button className={searchButtonClass} type="submit" >
                            Search
                        </button>

                    </form>
                </div>
            </HeroSearch>
        );
    }

    return (
        <HeroSearch>
            <div id="search">
                <form onSubmit={handleSubmit}>
                    <input 
                        className={searchClass}
                        type="text" 
                        name="query" 
                        defaultValue={query}
                        placeholder="Search..."
                    />
                        <button className={searchButtonClass} type="submit" >
                        Search
                    </button>

                </form>
                <div className="flex text-white text-left">
                    {results.length === 0 ? (
                        <p className="text-xl pt-10"> no results </p>
                    ) : (
                        <div>
                        <p className="text-xl pt-10"> Results: </p>
                            {results?.map((item, index) => (
                                <div key={index}>
                                <a href={buildUrl(item.name)}>{item.name}</a>
                                </div>
                            ))}
                        </div>
                        )}
                </div>

            </div>
        </HeroSearch>
    );
}
