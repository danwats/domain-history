<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('query');

        if ($query) {
            $results = Domain::where('name', 'LIKE', "%{$query}%")
                ->paginate(10);

            $results = $results->map(function($event) {
                return [
                    'name' => $event->name,
                    'last_updated' => $event->last_scanned,
                ];
            });

            return Inertia::render('search', [
                'query' => $query,
                'results' => $results,
                'routes' => [
                    'domain' => route('domain.show', ['domain' => ':domain']),
                ],
            ]);
        }

        return Inertia::render('search');

    }
}
