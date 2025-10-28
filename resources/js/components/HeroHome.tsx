import { ReactNode } from "react";

const HeroHome = ({ children }: {children:  ReactNode}) => {
    return (
        <div className="relative h-screen bg-gray-900 overflow-hidden">
            <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
                { children }
            </div>
        </div>
    );
};

const HeroSearch = ({ children }: {children:  ReactNode}) => {
    return (
        <div className="relative h-screen bg-gray-900 overflow-hidden">
            <div className="relative z-10 flex items-center justify-center text-center px-4 pt-10">
                { children }
            </div>
        </div>
    )
};

const HeroRecords = ({ children }: {children:  ReactNode}) => {
    return (
        <div className="relative bg-gray-900 min-h-screen p-10">
            <div className="relative z-10 items-center justify-center h-full text-left px-4">
                { children }
            </div>
        </div>
    );
};


export { HeroHome, HeroSearch, HeroRecords};
