<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CacheClear extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:cache-clear';

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
        $this->call('config:clear');
        $this->call('php artisan cache:clear');
        $this->call('php artisan view:clear');
        $this->call('php artisan route:clear');

        return Command::SUCCESS;
    }
}
