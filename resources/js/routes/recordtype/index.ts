import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:118
* @route '/history/domain/{domain}/record/{record}/types'
*/
export const show = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/history/domain/{domain}/record/{record}/types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:118
* @route '/history/domain/{domain}/record/{record}/types'
*/
show.url = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            domain: args[0],
            record: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        domain: args.domain,
        record: args.record,
    }

    return show.definition.url
            .replace('{domain}', parsedArgs.domain.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:118
* @route '/history/domain/{domain}/record/{record}/types'
*/
show.get = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:118
* @route '/history/domain/{domain}/record/{record}/types'
*/
show.head = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:118
* @route '/history/domain/{domain}/record/{record}/types'
*/
const showForm = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:118
* @route '/history/domain/{domain}/record/{record}/types'
*/
showForm.get = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:118
* @route '/history/domain/{domain}/record/{record}/types'
*/
showForm.head = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\DomainController::showRecords
* @see app/Http/Controllers/DomainController.php:50
* @route '/history/domain/{domain}/record/{record}/types/{recordtype}'
*/
export const showRecords = (args: { domain: string | number, record: string | number, recordtype: string | number } | [domain: string | number, record: string | number, recordtype: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRecords.url(args, options),
    method: 'get',
})

showRecords.definition = {
    methods: ["get","head"],
    url: '/history/domain/{domain}/record/{record}/types/{recordtype}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DomainController::showRecords
* @see app/Http/Controllers/DomainController.php:50
* @route '/history/domain/{domain}/record/{record}/types/{recordtype}'
*/
showRecords.url = (args: { domain: string | number, record: string | number, recordtype: string | number } | [domain: string | number, record: string | number, recordtype: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            domain: args[0],
            record: args[1],
            recordtype: args[2],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        domain: args.domain,
        record: args.record,
        recordtype: args.recordtype,
    }

    return showRecords.definition.url
            .replace('{domain}', parsedArgs.domain.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace('{recordtype}', parsedArgs.recordtype.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DomainController::showRecords
* @see app/Http/Controllers/DomainController.php:50
* @route '/history/domain/{domain}/record/{record}/types/{recordtype}'
*/
showRecords.get = (args: { domain: string | number, record: string | number, recordtype: string | number } | [domain: string | number, record: string | number, recordtype: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRecords.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::showRecords
* @see app/Http/Controllers/DomainController.php:50
* @route '/history/domain/{domain}/record/{record}/types/{recordtype}'
*/
showRecords.head = (args: { domain: string | number, record: string | number, recordtype: string | number } | [domain: string | number, record: string | number, recordtype: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showRecords.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DomainController::showRecords
* @see app/Http/Controllers/DomainController.php:50
* @route '/history/domain/{domain}/record/{record}/types/{recordtype}'
*/
const showRecordsForm = (args: { domain: string | number, record: string | number, recordtype: string | number } | [domain: string | number, record: string | number, recordtype: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showRecords.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::showRecords
* @see app/Http/Controllers/DomainController.php:50
* @route '/history/domain/{domain}/record/{record}/types/{recordtype}'
*/
showRecordsForm.get = (args: { domain: string | number, record: string | number, recordtype: string | number } | [domain: string | number, record: string | number, recordtype: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showRecords.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::showRecords
* @see app/Http/Controllers/DomainController.php:50
* @route '/history/domain/{domain}/record/{record}/types/{recordtype}'
*/
showRecordsForm.head = (args: { domain: string | number, record: string | number, recordtype: string | number } | [domain: string | number, record: string | number, recordtype: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showRecords.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showRecords.form = showRecordsForm

const recordtype = {
    show: Object.assign(show, show),
    showRecords: Object.assign(showRecords, showRecords),
}

export default recordtype