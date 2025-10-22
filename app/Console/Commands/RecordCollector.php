<?php

namespace App\Console\Commands;

use App\Services\RecordService;
use DNS\Harvester\RecordList;
use Illuminate\Console\Command;
use Illuminate\Validation\ValidationException;

class RecordCollector extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:record-collector {domain}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Domain to scan and get DNS records';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $domain = $this->argument('domain');
        $records = new RecordList;
        $records->loadDefaults();

        $recordService = new RecordService;
        try {
            $recordService->createRecords($domain, $records);
            $this->info('All records complete');
        } catch (ValidationException $e) {
            $this->error('Validation failed:');
            foreach ($e->errors() as $field => $messages) {
                $this->error("  $field: ".implode(', ', $messages));
            }
        }
    }
}
