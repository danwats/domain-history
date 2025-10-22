<?php

namespace App\Console\Commands;

use App\Jobs\ScanDomainJob;
use App\Models\Domain;
use Illuminate\Console\Command;

class StartDomainScan extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:start-domain-scan';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Domain::each(function ($domain) {
            ScanDomainJob::dispatch($domain->id);
            $this->info("Starting scan for {$domain->id}");
        });
    }
}
