<?php

namespace App\Exports;

use App\Models\File;
use Maatwebsite\Excel\Concerns\FromCollection;

class CsvExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $arr;
    public function __construct($arr) {
        $this->arr = $arr;
    }
    public function collection()
    {
        return collect($this->arr);
    }
}
