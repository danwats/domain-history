export function ShowRecordType({
    record,
    type
}: {
        record: Record<string, any>[]
        type: string
    }) {
    switch (type) {
        case 'A':
        case 'AAAA':
            return (
                <div>
                    <div className="p-4 max-w-4xl border rounded-xs shadow bg-gray-900 text-white">
                        <div className="overflow-x-auto">
                            <div className="min-w-[500px]">
                                <div className="p-3 rounded-xs  shadow">
                                    <div className="flex font-semibold border-b pb-2 mb-2">
                                        <div className="w-1/3">IP</div>
                                        <div className="w-1/3">First Seen</div>
                                        <div className="w-1/3">Last Seen</div>
                                    </div>
                                    {record.map(({ id, ip, first_seen, last_seen }) => (
                                        <div key={id} className="flex text-sm
                                            hover:bg-blue-200 hover:text-blue-900 
                                            focus:bg-blue-200 focus:text-blue-900 
                                            active:bg-blue-200 active:text-blue-900
                                            ">
                                            <div className="w-1/3 break-all font-mono pb-5">{ip}</div>
                                            <div className="w-1/3 whitespace-nowrap">{first_seen}</div>
                                            <div className="w-1/3 whitespace-nowrap">{last_seen}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 'TXT':
            return (
                <div>
                    <div className="p-4 max-w-4xl border rounded-xs shadow bg-gray-900 text-white">
                        <div className="overflow-x-auto">
                            <div className="min-w-[500px]">
                                <div className="flex font-semibold border-b pb-2 mb-2">
                                    <div className="w-1/3">Value</div>
                                    <div className="w-1/3">First Seen</div>
                                    <div className="w-1/3">Last Seen</div>
                                </div>
                                {record.map(({ id, value, first_seen, last_seen }) => (
                                    <div key={id} className="flex flex-wrap text-sm
                                        w-full pt-4 pb-4 leading-tight transition-all rounded-lg outline-none text-start 
                                        hover:bg-blue-200 hover:text-blue-900 
                                        focus:bg-blue-200 focus:text-blue-900 
                                        active:bg-blue-200 active:text-blue-900
                                        ">
                                        <div className="w-1/3 break-all font-mono pb-5 pr-4">{value}</div>
                                        <div className="w-1/3 whitespace-nowrap">{first_seen}</div>
                                        <div className="w-1/3 whitespace-nowrap">{last_seen}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 'NS':
        case 'CNAME':
            return (
                <div>
                    <div className="p-4 max-w-4xl border rounded-xs shadow bg-gray-900 text-white">
                        <div className="overflow-x-auto">
                            <div className="flex font-semibold border-b pb-2 mb-2">
                                <div className="w-1/3">Target</div>
                                <div className="w-1/3">First Seen</div>
                                <div className="w-1/3">Last Seen</div>
                            </div>
                            {record.map(({ id, target, first_seen, last_seen }) => (
                                <div key={id} className="flex flex-wrap text-sm
                                    w-full pt-4 pb-4 leading-tight transition-all rounded-lg outline-none text-start 
                                    hover:bg-blue-200 hover:text-blue-900 
                                    focus:bg-blue-200 focus:text-blue-900 
                                    active:bg-blue-200 active:text-blue-900
                                    ">
                                    <div className="w-1/3 break-all font-mono pb-5 pr-1">{target}</div>
                                    <div className="w-1/3 whitespace-nowrap">{first_seen}</div>
                                    <div className="w-1/3 whitespace-nowrap">{last_seen}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        case 'MX':
            return (
                <div className="p-4 max-w-4xl border rounded shadow bg-gray-900 text-white">
                    <div className="overflow-x-auto">
                        <div className="min-w-[500px]">
                            <div className="flex font-semibold border-b border-gray-700 pb-2 mb-2">
                                <div className="w-1/4">Target</div>
                                <div className="w-1/4">Priority</div>
                                <div className="w-1/4">First Seen</div>
                                <div className="w-1/4">Last Seen</div>
                            </div>

                            {record.map(({ id, target, priority, first_seen, last_seen }) => (
                                <div
                                    key={id}
                                    className="flex text-sm w-full py-4 leading-tight rounded-lg outline-none text-start 
                                    transition-all border-b border-gray-800
                                    hover:bg-blue-200 hover:text-blue-900 
                                    focus:bg-blue-200 focus:text-blue-900 
                                    active:bg-blue-200 active:text-blue-900"
                                >
                                    <div className="w-1/4 break-all font-mono pr-2">{target}</div>
                                    <div className="w-1/4 break-all font-mono pr-2">{priority}</div>
                                    <div className="w-1/4 whitespace-nowrap">{first_seen}</div>
                                    <div className="w-1/4 whitespace-nowrap">{last_seen}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )

        case 'SRV':
            return (
                <div>
                    <div className="p-4 max-w-4xl border rounded-xs shadow bg-gray-900 text-white">
                        <div className="overflow-x-auto">
                            <div className="min-w-[900px]">
                                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_2fr] font-semibold border-b border-gray-700 pb-2">
                                    <div>Target</div>
                                    <div>Priority</div>
                                    <div>Weight</div>
                                    <div>Port</div>
                                    <div>First Seen</div>
                                    <div>Last Seen</div>
                                </div>

                                {record.map(({ id, target, priority, weight, port, first_seen, last_seen }) => (
                                    <div
                                        key={id}
                                        className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_2fr] border-b border-gray-800 py-2 text-sm
                                        w-full leading-tight rounded-lg outline-none text-start transition-all
                                        hover:bg-blue-200 hover:text-blue-900 
                                        focus:bg-blue-200 focus:text-blue-900 
                                        active:bg-blue-200 active:text-blue-900"
                                    >
                                        <div className="break-all font-mono pr-1">{target}</div>
                                        <div className="break-all font-mono pr-1">{priority}</div>
                                        <div className="break-all font-mono pr-1">{weight}</div>
                                        <div className="break-all font-mono pr-1">{port}</div>
                                        <div className="whitespace-nowrap">{first_seen}</div>
                                        <div className="whitespace-nowrap">{last_seen}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 'CAA':
            return (
                <div>
                    <div className="p-4 max-w-4xl border rounded-xs shadow bg-gray-900 text-white">
                        <div className="overflow-x-auto">
                            <div className="min-w-[900px]">
                                <div className="grid grid-cols-[1fr_1fr_1fr_1fr_2fr] font-semibold border-b border-gray-700 pb-2">
                                    <div>Flags</div>
                                    <div>Tag</div>
                                    <div>Value</div>
                                    <div>First Seen</div>
                                    <div>Last Seen</div>
                                </div>

                                {record.map(({ id, flags, tag, value, first_seen, last_seen }) => (
                                    <div
                                        key={id}
                                        className="grid grid-cols-[1fr_1fr_1fr_1fr_2fr] border-b border-gray-800 py-2 text-sm
                                        w-full leading-tight rounded-lg outline-none text-start transition-all
                                        hover:bg-blue-200 hover:text-blue-900 
                                        focus:bg-blue-200 focus:text-blue-900 
                                        active:bg-blue-200 active:text-blue-900"
                                    >
                                        <div className="break-all font-mono pr-1">{flags}</div>
                                        <div className="break-all font-mono pr-1">{tag}</div>
                                        <div className="break-all font-mono pr-1">{value}</div>
                                        <div className="whitespace-nowrap">{first_seen}</div>
                                        <div className="whitespace-nowrap">{last_seen}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 'SOA':
            return (
                <div>
                    <div className="p-4 max-w-4xl border rounded-xs shadow bg-gray-900 text-white">
                        <div className="overflow-x-auto">
                            <div className="min-w-[900px]">
                                <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_1fr_2fr_2fr] font-semibold border-b border-gray-700 pb-2">
                                    <div>Primary NS</div>
                                    <div>Admin Email</div>
                                    <div>Serial</div>
                                    <div>Refresh</div>
                                    <div>Retry</div>
                                    <div>Expire</div>
                                    <div>Minimum TTL</div>
                                    <div>First Seen</div>
                                    <div>Last Seen</div>
                                </div>

                                {record.map(({ id, primary_ns, admin_email, serial, refresh, retry, expire, minimum_ttl, first_seen, last_seen }) => (
                                    <div
                                        key={id}
                                        className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_1fr_2fr_2fr] border-b border-gray-800 py-2 text-sm
                                        w-full leading-tight rounded-lg outline-none text-start transition-all
                                        hover:bg-blue-200 hover:text-blue-900 
                                        focus:bg-blue-200 focus:text-blue-900 
                                        active:bg-blue-200 active:text-blue-900"
                                    >
                                        <div className="break-all font-mono pr-1">{primary_ns}</div>
                                        <div className="break-all font-mono pr-1">{admin_email}</div>
                                        <div className="break-all font-mono pr-1">{serial}</div>
                                        <div className="break-all font-mono pr-1">{refresh}</div>
                                        <div className="break-all font-mono pr-1">{retry}</div>
                                        <div className="break-all font-mono pr-1">{expire}</div>
                                        <div className="break-all font-mono pr-1">{minimum_ttl}</div>
                                        <div className="whitespace-nowrap">{first_seen}</div>
                                        <div className="whitespace-nowrap">{last_seen}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )

    }
}
