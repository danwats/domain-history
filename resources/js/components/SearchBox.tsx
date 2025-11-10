import { router } from '@inertiajs/react';
import { searchClass,searchButtonClass } from '@/components/HeroHomeVars';
import { index } from '@/actions/App/Http/Controllers/SearchController';

export default function SearchBox() {
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

    return (
        <form onSubmit={handleSubmit}>
            <input
                className={searchClass}
                type="text"
                name="query"
                placeholder="Search..."
            />
            <button className={searchButtonClass} type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
                Search
            </button>
        </form>
    );
}
