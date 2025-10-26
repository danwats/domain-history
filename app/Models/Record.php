<?php

namespace App\Models;

use DNS\Harvester\RecordType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use TypeError;

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

    public static function rules($type): array
    {
        $rules = [
            'type' => 'required|in:A,AAAA,CNAME,MX,TXT,NS,SOA,SRV,CAA',
            'hostname' => 'required|string|max:253',
            'ttl' => 'integer|min:0',
        ];

        switch (RecordType::fromString($type)) {
            case RecordType::A:
                $rules['ip'] = 'required|ip';
                break;
            case RecordType::AAAA:
                $rules['ip'] = 'required|ipv6';
                break;
            case RecordType::CNAME:
            case RecordType::NS:
                $rules['target'] = 'required|string|max:253';
                break;
            case RecordType::MX:
                $rules['target'] = 'required|string|max:253';
                $rules['priority'] = 'required|integer|min:0|max:65535';
                break;
            case RecordType::TXT:
                $rules['value'] = 'required|string';
                break;
            case RecordType::SRV:
                $rules['target'] = 'required|string|max:253';
                $rules['priority'] = 'required|integer|min:0|max:65535';
                $rules['weight'] = 'required|integer|min:0|max:65535';
                $rules['port'] = 'required|integer|min:0|max:65535';
                break;
            case RecordType::CAA:
                $rules['flags'] = 'required|integer|in:0,128';
                $rules['tag'] = 'required|string|in:issue,issuewild,iodef';
                $rules['value'] = 'required|string';
                break;
            case RecordType::SOA:
                $rules['primary_ns'] = 'required|string|max:253';
                $rules['admin_email'] = 'required|string|max:253';
                $rules['serial'] = 'required|integer';
                $rules['refresh'] = 'required|integer';
                $rules['retry'] = 'required|integer';
                $rules['expire'] = 'required|integer';
                $rules['minimum_ttl'] = 'required|integer';
                break;
            default:
                throw new TypeError("type $type does not exist");
        }

        return $rules;
    }

    public function getRecords($type): array {
        $result = [];
        $result['type'] = $this->type;
        $result['hostname'] = $this->hostname;
        $result['ttl'] = $this->ttl;
        switch (RecordType::fromString($type)) {
            case RecordType::CAA:
                $result['flags'] = $this->flags;
                $result['tag'] = $this->tag;
                $result['value'] = $this->value;
                break;
            case RecordType::A:
            case RecordType::AAAA:
                $result['ip'] = $this->ip;
                break;
            case RecordType::TXT:
                $result['value'] = $this->value;
                break;
            case RecordType::NS:
            case RecordType::CNAME:
                $result['target'] = $this->target;
                break;
            case RecordType::MX:
                $result['priority'] = $this->priority;
                $result['target'] = $this->target;
                break;
            case RecordType::SRV:
                $result['target'] = $this->target;
                $result['priority'] = $this->priority;
                $result['weight'] = $this->weight;
                $result['port'] = $this->port;
                break;
            case RecordType::SOA:
                $result['primary_ns'] = $this->primary_ns;
                $result['admin_email'] = $this->admin_email;
                $result['serial'] = $this->serial;
                $result['refresh'] = $this->refresh;
                $result['retry'] = $this->retry;
                $result['expire'] = $this->expire;
                $result['minimum_ttl'] = $this->minimum_ttl;
                break;
            default:
                throw new TypeError("type '$type' does not exist");
                break;
        }
        return $result;
    }
}
