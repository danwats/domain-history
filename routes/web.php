<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\DomainController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/search', [SearchController::class, 'index'])->name('search');

Route::prefix('history/domain/')->group(function () {
    Route::get('{domain}', [DomainController::class, 'showDomain'])->name('domain.show');
    Route::get('{domain}/record/{record}/types', [DomainController::class, 'showRecordTypes'])->name('recordtype.show');
    Route::get('{domain}/record/{record}/types/{recordtype}', [DomainController::class, 'showRecords'])->name('recordtype.showRecords');
});
