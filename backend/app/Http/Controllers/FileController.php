<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\CsvImport;
use App\Imports\CsvRead;
use App\Exports\CsvExport;
use App\Models\File;
use App\Models\FileGroup;

class FileController extends Controller
{
    public function upload(Request $req) {
        $filename = $req->filename;
        $records = Excel::toArray(new CsvImport, $req->file('file'))[0];
        $total = count($records);
        $wrong_indexes = [];

        for($i = 0; $i < $total; $i++) {
            if($records[$i]["number"] === null) {
                array_push($wrong_indexes, $i);
                continue;
            }            
        }
        for($i = 0; $i < count($wrong_indexes); $i++) {
            unset($records[$wrong_indexes[$i]]);

        }
        
        $number_of_chunks = ceil(count($records) / 100);
        $chunks = [];
        $number_pattern = "/\+[0-9]{1,12}$/";
        
        $file = new File;
        $file->filename = $filename;
        $file->total_uploaded = $total;
        $file->total_processed = $total - count($wrong_indexes);
        $file->user_id = $req->user->id;
        $file->save();

        for($i = 0; $i < $number_of_chunks; $i++) {
            $group_total = ($i != ($number_of_chunks-1) ? 100 : $total%100);
            $time = time();
            array_push($chunks, [
                'id' => $i,
                'group_name' => "{$filename}_{$i}",
                'filename' => time(),
                'total' => $group_total,
                'file_id' => 0
            ]);

            $file_group = new FileGroup;
            $file_group->group_name = "{$filename}_{$i}";
            $file_group->filename = "{$time}_{$i}";
            $file_group->total = $group_total;
            $file_group->file_id = $file->id;
            $file_group->save();

            Excel::store(new CsvExport(array_slice($records, $i*100, $group_total)), "{$file_group->filename}.csv");
        }
        // return response()->json($records, 200);
        return response()->json([
            'total' => count($records), 
            'number_of_chunks' => $number_of_chunks,
            'chunks' => $chunks,
            'total' => $total,
            'wrong_indexes' => $wrong_indexes
        ], 200);
    }
    public function allFiles() {
        return File::all();
    }
    public function allGroupFiles($id) {
        return FileGroup::where('file_id', $id)->get();
    }
    public function allData($group_id) {
        $group = FileGroup::find($group_id);
        $all_data = Excel::toArray(new CsvRead, $group->filename.".csv")[0];
        $final = [];
        for($i = 0; $i < count($all_data); $i++) {
            array_push($final, [
                'id' => $i,
                'number' => $all_data[$i][0],
                'name' => $all_data[$i][1],
                'address' => $all_data[$i][2],
                'email' => $all_data[$i][3],
                'gender' => $all_data[$i][4],
                'status' => $all_data[$i][5],
                'date' => $all_data[$i][6],
            ]);
        }
        return $final;
    }
}
