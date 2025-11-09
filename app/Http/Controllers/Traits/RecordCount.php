<?php

namespace App\Http\Controllers\Traits;

use App\Models\Domain;
use Carbon\Carbon;
use Illuminate\Support\Collection;

trait RecordCount
{
    public function GetWeekRecord(Domain $domain): Collection
    {
        $sevenDaysAgo = Carbon::now()->subDays(7)->startOfDay();
        $today = Carbon::now();

        $records = $domain->records()
            ->where(function ($query) use ($sevenDaysAgo, $today) {
                $query->whereBetween('created_at', [$sevenDaysAgo, $today])
                    ->orWhereBetween('updated_at', [$sevenDaysAgo, $today])
                    ->orWhereBetween('last_seen', [$sevenDaysAgo, $today]);
            })
            ->get();

        $mapped = $records->map(function ($r) {
            return [
                'created' => $r->created_at ? Carbon::parse($r->created_at)->dayOfWeek : null,
                'updated' => $r->updated_at ? Carbon::parse($r->updated_at)->dayOfWeek : null,
                'last_seen' => $r->last_seen ? Carbon::parse($r->last_seen)->dayOfWeek : null,
            ];
        });

        $soaRecords = $records->filter(fn ($r) => $r->type === 'SOA' && $r->hostname === '@');
        $mappedSoa = $soaRecords->map(fn ($r) => Carbon::parse($r->created_at)->dayOfWeek);

        $weekDays = collect([
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
        ]);

        $weeklyData = $weekDays->map(function ($label) use ($mapped, $mappedSoa) {
            $dayNum = Carbon::createFromFormat('D', $label)->dayOfWeek;

            return [
                'date' => $label,
                'created' => $mapped->filter(fn ($r) => $r['created'] === $dayNum)->count(),
                'updated' => $mapped->filter(fn ($r) => $r['updated'] === $dayNum)->count(),
                'last_seen' => $mapped->filter(fn ($r) => $r['last_seen'] === $dayNum)->count(),
                'created_soa' => $mappedSoa->filter(fn ($d) => $d === $dayNum)->count(),
            ];
        });

        $weeklyData = $weeklyData->map(function ($d) {
            $d['total'] = $d['created'] + $d['updated'] + $d['last_seen'];

            return $d;
        });

        // put the days in order
        // 0123456, if we are day 4 then
        // 5601234
        $dayMove = Carbon::now()->dayOfWeek;
        $positions = $dayMove + 1;
        $items = $weeklyData->splice(0, $positions);
        $weeklyData = $weeklyData->concat($items);

        return $weeklyData;
    }
}
