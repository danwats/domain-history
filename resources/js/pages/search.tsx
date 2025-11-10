import { router } from '@inertiajs/react';
import { HeroSearch } from '@/components/HeroHome';
import { searchClass,searchButtonClass } from '@/components/HeroHomeVars';
import { index } from '@/actions/App/Http/Controllers/SearchController';
import { showDomain } from '@/actions/App/Http/Controllers/DomainController'

interface ResultItem {
    name: string;
    last_updated: string;
}

export default function Search({
    query,
    results,
}: {
        query: string,
        results: ResultItem[],
    }) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.get(
            index({
                query: {
                    query: formData.get('query') as string
                }
            }).url);
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
                                        <a href={showDomain([item.name]).url}>
                                            {item.name}</a>
                                    </div>
                                ))}
                            </div>
                        )}
                </div>

            </div>
        </HeroSearch>
    );
}
