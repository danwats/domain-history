<?php

namespace App\Validators;

use DNS\Harvester\RecordType;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\ValidationException;

class DnsValidator
{
    public static function domainRules(): array
    {
        return [
            'domain' => 'required|string|max:255|regex:/^[a-z0-9\-\.]+$/i',
        ];
    }

    public static function recordRules(): array
    {
        return [
            'record' => 'required|string|max:255|regex:/^[a-z0-9\-\.\*\_\@]+$/i',
        ];
    }

    public static function recordTypeRules(): array
    {
        return [
            'recordType' => ['required', new Enum(RecordType::class)],
        ];
    }

    public static function validate(array $data, array $rules): array
    {
        $validator = Validator::make($data, $rules);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
