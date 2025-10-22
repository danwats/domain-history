<?php

namespace App\Services;

use App\Models\Domain;
use App\Models\Record as RecordModel;
use DNS\Harvester\DNS;
use DNS\Harvester\RecordList;
use DNS\Harvester\RecordType;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class RecordService
{
    public function createRecords(string $domain, RecordList $records): bool
    {
        // scan domain
        $recordList = new DNS($domain, $records, true);
        $recordList->harvest();

        $domainRecord = Domain::firstOrCreate([
            'name' => $domain,
        ]);

        // might be more useful having all the same time and
        // date for all new/existing records
        $lastSeen = now();

        foreach ($recordList->results as $type) {
            foreach ($type as $record) {
                // add hostname
                if ($record['host'] === $domain) {
                    $record['hostname'] = '@';
                } else {
                    $record['hostname'] = str_replace('.'.$domain, '', $record['host']);
                }

                $lu = $domainRecord->records()->where('type', $record['type'])
                    ->where('hostname', $record['hostname']);
                // TODO: could put this into a model?
                switch (RecordType::fromString($record['type'])) {
                    case RecordType::A:
                        $lu->where('ip', $record['ip']);
                        $returnedRecord = $lu->first();
                        if ($returnedRecord) {
                            $returnedRecord->update(['last_seen' => $lastSeen]);
                        } else {
                            $validator = Validator::make($record, RecordModel::rules($record['type']));
                            if ($validator->fails()) {
                                throw new ValidationException($validator);
                            }
                            // save the record
                            $validatedData = $validator->validated();
                            $validatedData['last_seen'] = $lastSeen;
                            $domainRecord->records()->create($validatedData);
                        }
                        break;
                    case RecordType::AAAA:
                        $record['ip'] = $record['ipv6'];
                        $lu->where('ip', $record['ip']);
                        $returnedRecord = $lu->first();
                        if ($returnedRecord) {
                            $returnedRecord->update(['last_seen' => $lastSeen]);
                        } else {
                            $validator = Validator::make($record, RecordModel::rules($record['type']));
                            if ($validator->fails()) {
                                throw new ValidationException($validator);
                            }
                            // save the record
                            $validatedData = $validator->validated();
                            $validatedData['last_seen'] = $lastSeen;
                            $domainRecord->records()->create($validatedData);
                        }
                        break;

                    case RecordType::CNAME:
                    case RecordType::NS:
                        $lu->where('target', $record['target']);
                        $returnedRecord = $lu->first();
                        if ($returnedRecord) {
                            $returnedRecord->update(['last_seen' => $lastSeen]);
                        } else {
                            $validator = Validator::make($record, RecordModel::rules($record['type']));
                            if ($validator->fails()) {
                                throw new ValidationException($validator);
                            }
                            // save the record
                            $validatedData = $validator->validated();
                            $validatedData['last_seen'] = $lastSeen;
                            $domainRecord->records()->create($validatedData);
                        }
                        break;
                    case RecordType::MX:
                        $record['priority'] = $record['pri'];
                        $lu->where('target', $record['target']);
                        $lu->where('priority', $record['pri']);
                        $returnedRecord = $lu->first();
                        if ($returnedRecord) {
                            $returnedRecord->update(['last_seen' => $lastSeen]);
                        } else {
                            $validator = Validator::make($record, RecordModel::rules($record['type']));
                            if ($validator->fails()) {
                                throw new ValidationException($validator);
                            }
                            // save the record
                            $validatedData = $validator->validated();
                            $validatedData['last_seen'] = $lastSeen;
                            $domainRecord->records()->create($validatedData);
                        }
                        break;
                    case RecordType::SOA:
                        $mapped = [
                            'hostname' => $record['hostname'],
                            'ttl' => $record['ttl'],
                            'type' => $record['type'],
                            'primary_ns' => $record['mname'],
                            'admin_email' => $record['rname'],
                            'serial' => $record['serial'],
                            'refresh' => $record['refresh'],
                            'retry' => $record['retry'],
                            'expire' => $record['expire'],
                            'minimum_ttl' => $record['minimum-ttl'],
                        ];
                        // find the record
                        $returnedRecord = $lu->where('primary_ns', $mapped['primary_ns'])
                            ->where('admin_email', $mapped['admin_email'])
                            ->where('serial', $mapped['serial'])
                            ->where('refresh', $mapped['refresh'])
                            ->where('expire', $mapped['expire'])
                            ->where('retry', $mapped['retry'])
                            ->where('minimum_ttl', $mapped['minimum_ttl'])
                            ->first();

                        if ($returnedRecord) {
                            $returnedRecord->update(['last_seen' => $lastSeen]);
                        } else {
                            $validator = Validator::make($mapped, RecordModel::rules($mapped['type']));
                            if ($validator->fails()) {
                                throw new ValidationException($validator);
                            }
                            $validatedData = $validator->validated();
                            $validatedData['last_seen'] = $lastSeen;
                            $domainRecord->records()->create($validatedData);
                        }
                        break;
                    case RecordType::TXT:
                        $record['value'] = $record['txt'];
                        $lu->where('value', $record['value']);
                        $returnedRecord = $lu->first();
                        if ($returnedRecord) {
                            $returnedRecord->update(['last_seen' => $lastSeen]);
                        } else {
                            $validator = Validator::make($record, RecordModel::rules($record['type']));
                            if ($validator->fails()) {
                                throw new ValidationException($validator);
                            }
                            // save the record
                            $validatedData = $validator->validated();
                            $validatedData['last_seen'] = $lastSeen;
                            $domainRecord->records()->create($validatedData);
                        }
                        break;
                    case RecordType::TXT:
                        $record['value'] = $record['txt'];
                        $lu->where('value', $record['value']);
                        $returnedRecord = $lu->first();
                        if ($returnedRecord) {
                            $returnedRecord->update(['last_seen' => $lastSeen]);
                        } else {
                            $validator = Validator::make($record, RecordModel::rules($record['type']));
                            if ($validator->fails()) {
                                throw new ValidationException($validator);
                            }
                            // save the record
                            $validatedData = $validator->validated();
                            $validatedData['last_seen'] = $lastSeen;
                            $domainRecord->records()->create($validatedData);
                        }
                        break;
                    case RecordType::SRV:
                        $record['priority'] = $record['pri'];
                        $lu->where('priority', $record['priority'])
                            ->where('weight', $record['weight'])
                            ->where('port', $record['port'])
                            ->where('target', $record['target']);

                        $returnedRecord = $lu->first();
                        if ($returnedRecord) {
                            $returnedRecord->update(['last_seen' => $lastSeen]);
                        } else {
                            $validator = Validator::make($record, RecordModel::rules($record['type']));
                            if ($validator->fails()) {
                                throw new ValidationException($validator);
                            }
                            // save the record
                            $validatedData = $validator->validated();
                            $validatedData['last_seen'] = $lastSeen;
                            $domainRecord->records()->create($validatedData);
                        }
                        break;
                }
            }
        }

        return true;
    }
}
