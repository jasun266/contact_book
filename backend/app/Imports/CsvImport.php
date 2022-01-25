<?php

namespace App\Imports;

use App\Models\File;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CsvImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new File([
            'Number' => $row['Number'],
            'Name' => $row['Name'],
            'Address' => $row['Address'],
            'Email'=> $row['Email'],
            'Gender' => $row['Gender'],
            'Status' => $row['Status'],
            'Date'=> $row['Date']
        ]);
    }
}
