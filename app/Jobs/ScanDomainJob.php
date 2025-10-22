<?php

namespace App\Jobs;

use App\Models\Domain;
use App\Services\RecordService;
use DNS\Harvester\RecordList;
use Illuminate\Contracts\Queue\ShouldBeUniqueUntilProcessing;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class ScanDomainJob implements ShouldBeUniqueUntilProcessing, ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public int $domainId) {}

    public function uniqueId()
    {
        return "scan-domain-{$this->domainId}";
    }

    public function handle(): void
    {
        $domain = Domain::find($this->domainId);

        Log::info("got {$domain}");
        // if the domain is deleted
        // TODO: could have a flag for this in the database
        if (! $domain) {
            Log::info("{$domain} doesn't exist anymore");

            return;
        }

        Log::info("starting scanDomain {$domain->name}");
        $this->scanDomain($domain);

        // re-dispatch itself to run again in x amount of time
        ScanDomainJob::dispatch($this->domainId)
            ->delay(now()->addMinutes(1));
    }

    private function scanDomain($domain)
    {
        Log::info("Scanning domain {$domain->name}");
        // get the records to scan
        $records = new RecordList;
        $records->loadDefaults();

        $recordService = new RecordService;
        try {
            $recordService->createRecords($domain->name, $records);
            Log::info("All records complete for {$domain}");
        } catch (ValidationException $e) {
            Log::error('Validation failed:');
            foreach ($e->errors() as $field => $messages) {
                Log::error("  $field: ".implode(', ', $messages));
            }
        }

        $domain->update(['last_scanned' => now()]);
    }
}
