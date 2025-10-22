<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('domain_id');
            // all hosts
            $table->enum('type', [
                'A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA',
                'PTR', 'SRV', 'CAA', 'DNSKEY', 'DS', 'TLSA', 'SSHFP',
            ]);
            $table->string('hostname', 253);
            $table->integer('ttl')->isNotEmpty();

            // unique fields - a, aaaa, cname etc...
            $table->ipAddress('ip')->nullable();
            $table->string('target', 253)->nullable();
            $table->text('value')->nullable();
            $table->integer('priority')->nullable();
            $table->integer('weight')->nullable();
            $table->integer('port')->nullable();
            $table->integer('flags')->nullable();
            $table->string('tag', 50)->nullable();

            // SOA specific records
            $table->string('primary_ns', 253)->nullable();
            $table->string('admin_email', 253)->nullable();
            $table->bigInteger('serial')->nullable();
            $table->integer('refresh')->nullable();
            $table->integer('retry')->nullable();
            $table->integer('expire')->nullable();
            $table->integer('minimum_ttl')->nullable();
            $table->timestamp('last_seen')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('domain_id')->references('id')->on('domains');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('record');
    }
};
