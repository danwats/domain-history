import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:13
* @route '/history/domain/{domain}'
*/
export const show = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/history/domain/{domain}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:13
* @route '/history/domain/{domain}'
*/
show.url = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{domain}', parsedArgs.domain.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:13
* @route '/history/domain/{domain}'
*/
show.get = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:13
* @route '/history/domain/{domain}'
*/
show.head = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:13
* @route '/history/domain/{domain}'
*/
const showForm = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:13
* @route '/history/domain/{domain}'
*/
showForm.get = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DomainController::show
* @see app/Http/Controllers/DomainController.php:13
* @route '/history/domain/{domain}'
*/
showForm.head = (args: { domain: string | number } | [domain: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const domain = {
    show: Object.assign(show, show),
}

export default domain