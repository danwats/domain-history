import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DomainController::showDomain
* @see app/Http/Controllers/DomainController.php:16
* @route '/history/domain/{domain}'
*/
export const showDomain = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showDomain.url(args, options),
    method: 'get',
})

showDomain.definition = {
    methods: ["get","head"],
    url: '/history/domain/{domain}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DomainController::showDomain
* @see app/Http/Controllers/DomainController.php:16
* @route '/history/domain/{domain}'
*/
showDomain.url = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { domain: args }
    }

    if (Array.isArray(args)) {
        args = {
            domain: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        domain: args.domain,
    }

    return showDomain.definition.url
            .replace('{domain}', parsedArgs.domain.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DomainController::showDomain
* @see app/Http/Controllers/DomainController.php:16
* @route '/history/domain/{domain}'
*/
showDomain.get = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showDomain.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::showDomain
* @see app/Http/Controllers/DomainController.php:16
* @route '/history/domain/{domain}'
*/
showDomain.head = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showDomain.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DomainController::showDomain
* @see app/Http/Controllers/DomainController.php:16
* @route '/history/domain/{domain}'
*/
const showDomainForm = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showDomain.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::showDomain
* @see app/Http/Controllers/DomainController.php:16
* @route '/history/domain/{domain}'
*/
showDomainForm.get = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showDomain.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::showDomain
* @see app/Http/Controllers/DomainController.php:16
* @route '/history/domain/{domain}'
*/
showDomainForm.head = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showDomain.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showDomain.form = showDomainForm

/**
* @see \App\Http\Controllers\DomainController::showRecordTypes
* @see app/Http/Controllers/DomainController.php:122
* @route '/history/domain/{domain}/record/{record}/types'
*/
export const showRecordTypes = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRecordTypes.url(args, options),
    method: 'get',
})

showRecordTypes.definition = {
    methods: ["get","head"],
    url: '/history/domain/{domain}/record/{record}/types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DomainController::showRecordTypes
* @see app/Http/Controllers/DomainController.php:122
* @route '/history/domain/{domain}/record/{record}/types'
*/
showRecordTypes.url = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions) => {
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

    return showRecordTypes.definition.url
            .replace('{domain}', parsedArgs.domain.toString())
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DomainController::showRecordTypes
* @see app/Http/Controllers/DomainController.php:122
* @route '/history/domain/{domain}/record/{record}/types'
*/
showRecordTypes.get = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRecordTypes.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::showRecordTypes
* @see app/Http/Controllers/DomainController.php:122
* @route '/history/domain/{domain}/record/{record}/types'
*/
showRecordTypes.head = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showRecordTypes.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DomainController::showRecordTypes
* @see app/Http/Controllers/DomainController.php:122
* @route '/history/domain/{domain}/record/{record}/types'
*/
const showRecordTypesForm = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showRecordTypes.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::showRecordTypes
* @see app/Http/Controllers/DomainController.php:122
* @route '/history/domain/{domain}/record/{record}/types'
*/
showRecordTypesForm.get = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showRecordTypes.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::showRecordTypes
* @see app/Http/Controllers/DomainController.php:122
* @route '/history/domain/{domain}/record/{record}/types'
*/
showRecordTypesForm.head = (args: { domain: string | number, record: string | number } | [domain: string | number, record: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showRecordTypes.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showRecordTypes.form = showRecordTypesForm

/**
* @see \App\Http\Controllers\DomainController::showRecords
* @see app/Http/Controllers/DomainController.php:55
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
* @see app/Http/Controllers/DomainController.php:55
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
* @see app/Http/Controllers/DomainController.php:55
* @route '/history/domain/{domain}/record/{record}/types/{recordtype}'
*/
showRecords.get = (args: { domain: string | number, record: string | number, recordtype: string | number } | [domain: string | number, record: string | number, recordtype: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showRecords.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::showRecords
* @see app/Http/Controllers/DomainController.php:55
* @route '/history/domain/{domain}/record/{record}/types/{recordtype}'
*/
showRecords.head = (args: { domain: string | number, record: string | number, recordtype: string | number } | [domain: string | number, record: string | number, recordtype: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showRecords.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DomainController::showRecords
* @see app/Http/Controllers/DomainController.php:55
* @route '/history/domain/{domain}/record/{record}/types/{recordtype}'
*/
const showRecordsForm = (args: { domain: string | number, record: string | number, recordtype: string | number } | [domain: string | number, record: string | number, recordtype: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showRecords.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::showRecords
* @see app/Http/Controllers/DomainController.php:55
* @route '/history/domain/{domain}/record/{record}/types/{recordtype}'
*/
showRecordsForm.get = (args: { domain: string | number, record: string | number, recordtype: string | number } | [domain: string | number, record: string | number, recordtype: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showRecords.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::showRecords
* @see app/Http/Controllers/DomainController.php:55
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

const DomainController = { showDomain, showRecordTypes, showRecords }

export default DomainController