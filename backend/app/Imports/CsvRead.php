<?php

namespace App\Imports;

use App\Models\File;
use Maatwebsite\Excel\Concerns\ToModel;

class CsvRead implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new File([
            'Number' => $row[0],
            'Name' => $row[1],
            'Address' => $row[2],
            'Email'=> $row[3],
            'Gender' => $row[4],
            'Status' => $row[5],
            'Date'=> $row[6]
        ]);
    }
}
