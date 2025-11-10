<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Cache extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'cache:setup';

    /**
     *  The console command description.
     */
    protected $description = 'Prepare all caches';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->call('config:cache');
        $this->call('event:cache');
        $this->call('route:cache');
        $this->call('view:cache');

        return Command::SUCCESS;
    }
}
