<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Record extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'domain_id', 'type', 'hostname', 'ttl', 'ip', 'target',
        'value', 'priority', 'weight', 'port', 'flags', 'tag',
        'primary_ns', 'admin_email', 'serial', 'refresh',
        'retry', 'expire', 'minimum_ttl', 'last_seen',
    ];

    public function domain(): BelongsTo
    {
        return $this->belongsTo(Domain::class);
    }

    public static function rules($type)
    {
        $rules = [
            'type' => 'required|in:A,AAAA,CNAME,MX,TXT,NS,SOA,SRV,CAA',
            'hostname' => 'required|string|max:253',
            'ttl' => 'integer|min:0',
        ];

        switch ($type) {
            case 'A':
                $rules['ip'] = 'required|ip';
                break;
            case 'AAAA':
                $rules['ip'] = 'required|ipv6';
                break;
            case 'CNAME':
            case 'NS':
                $rules['target'] = 'required|string|max:253';
                break;
            case 'MX':
                $rules['target'] = 'required|string|max:253';
                $rules['priority'] = 'required|integer|min:0|max:65535';
                break;
            case 'TXT':
                $rules['value'] = 'required|string';
                break;
            case 'SRV':
                $rules['target'] = 'required|string|max:253';
                $rules['priority'] = 'required|integer|min:0|max:65535';
                $rules['weight'] = 'required|integer|min:0|max:65535';
                $rules['port'] = 'required|integer|min:0|max:65535';
                break;
            case 'CAA':
                $rules['flags'] = 'required|integer|in:0,128';
                $rules['tag'] = 'required|string|in:issue,issuewild,iodef';
                $rules['value'] = 'required|string';
                break;
            case 'SOA':
                $rules['primary_ns'] = 'required|string|max:253';
                $rules['admin_email'] = 'required|string|max:253';
                $rules['serial'] = 'required|integer';
                $rules['refresh'] = 'required|integer';
                $rules['retry'] = 'required|integer';
                $rules['expire'] = 'required|integer';
                $rules['minimum_ttl'] = 'required|integer';
                break;
        }

        return $rules;
    }

    public function findRecord()
    {
        return $this->domains->records()->where('id', '!=', $this->id)->get();
    }
}
