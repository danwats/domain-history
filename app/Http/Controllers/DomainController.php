<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\RecordCount;
use App\Models\Domain;
use App\Validators\DnsValidator;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class DomainController extends Controller
{
    use RecordCount;

    public function showDomain(string $domain)
    {
        $rules = array_merge(
            DnsValidator::domainRules(),
        );
        try {
            DnsValidator::validate(['domain' => $domain], $rules);
        } catch (ValidationException $e) {
            // TODO: log errors?
            abort(422, 'Invalid domain format.');
        }

        $domain = Domain::where('name', $domain)->firstOrFail();
        $summary = $domain->records
            ->groupBy('hostname')
            ->map(function ($records, $hostname) {
                return [
                    'name' => $hostname,
                    'count' => $records->count(),
                ];
            })->values();

        $weeklyData = $this->GetWeekRecord($domain);

        return Inertia::render('domain.show', [
            'domain' => $domain->name,
            'records' => $summary,
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => route('home')],
                ['label' => 'Domain', 'url' => null],
                ['label' => $domain->name, 'url' => null],
            ],
            'routes' => [
                'recordShow' => route('recordtype.show', ['domain' => ':domain', 'record' => ':record']),
            ],
            'weekly_data' => $weeklyData,
        ]);
    }

    public function showRecords(string $domain, string $record, string $recordType)
    {
        $rules = array_merge(
            DnsValidator::domainRules(),
        );
        try {
            DnsValidator::validate([
                'domain' => $domain,
                'record' => $record,
                'recordType' => $recordType,
            ], $rules);
        } catch (ValidationException $e) {
            abort(422, 'Invalid format.');
        }

        $domain = Domain::where('name', '=', $domain)->firstOrFail();
        $records = $domain->records()
            ->where('hostname', $record)
            ->where('type', $recordType)
            ->orderBy('last_seen', 'DESC')
            ->paginate(15);

        if ($records->isEmpty()) {
            abort(404, 'No records found');
        }

        $recordTypeName = $recordType;

        $items = $records->map(function ($event, $index) use ($recordType) {
            $record = $event->getRecords($recordType);
            $record['last_seen'] = $event->last_seen ? Carbon::parse($event->last_seen)->format('M d Y H:i:s') : null;
            $record['first_seen'] = $event->created_at ? Carbon::parse($event->created_at)->format('M d Y H:i:s') : null;

            return [
                'id' => $index + 1,
                ...$record,
            ];
        })->values();

        return Inertia::render('records', [
            'data' => $items,
            'paginate' => [
                'currentPage' => $records->currentPage(),
                'lastPage' => $records->lastPage(),
                'perPage' => $records->perPage(),
                'total' => $records->total(),
                'from' => $records->firstItem(),
                'to' => $records->lastItem(),
            ],
            'domain' => $domain->name,
            'records' => $records,
            'recordName' => $record,
            'recordTypeName' => $recordTypeName,
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => route('home')],
                ['label' => 'Domain', 'url' => null],
                ['label' => $domain->name, 'url' => route('domain.show', $domain->name)],
                ['label' => $record, 'url' => null],
                ['label' => 'Record Types', 'url' => route('recordtype.show', [$domain->name, $record])],
                ['label' => $recordTypeName, 'url' => null],
            ],
            'routes' => [
                'paginate' => route('recordtype.showRecords', ['domain' => $domain->name, 'record' => $record, 'recordtype' => $recordTypeName]),
            ],
        ]);
    }

    public function showRecordTypes(string $domain, string $record)
    {
        $rules = array_merge(
            DnsValidator::domainRules(),
        );
        try {
            DnsValidator::validate([
                'domain' => $domain,
                'record' => $record,
            ], $rules);
        } catch (ValidationException) {
            abort(422, 'Invalid format.');
        }

        $domain = Domain::where('name', $domain)->firstOrFail();

        $summary = $domain->records
            ->where('hostname', $record)
            ->groupBy('type')
            ->map(function ($records, $type) use ($record) {
                return [
                    'hostname' => $record,
                    'type' => $type,
                    'count' => $records->count(),
                ];
            })
            ->values();

        if ($summary->isEmpty()) {
            abort(404, 'No records found');
        }

        $name = $record;

        return Inertia::render('recordtypes',
            [
                'name' => $name,
                'domain' => $domain->name,
                'recordTypes' => $summary,
                'breadcrumbs' => [
                    ['label' => 'Home', 'url' => route('home')],
                    ['label' => 'Domain', 'url' => null],
                    ['label' => $domain->name, 'url' => route('domain.show', $domain->name)],
                    ['label' => $name, 'url' => null],
                    ['label' => 'Record Types', 'url' => null],
                ],
                'routes' => [
                    'records' => route('recordtype.showRecords', ['domain' => $domain->name, 'record' => $name, 'recordtype' => ':recordtype']),
                ],
            ]
        );
    }
}
