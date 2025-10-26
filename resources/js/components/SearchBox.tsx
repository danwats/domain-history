import { router } from '@inertiajs/react';
import { searchClass,searchButtonClass } from '@/components/HeroHomeVars';

export default function SearchBox() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('query') as string;

        router.get('search', { query }); 
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
