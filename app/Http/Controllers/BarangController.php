<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Facades\Session;

class BarangController extends Controller
{
    public function index()
    {
        return view('layout.main', [
            'title' => 'Barang',
            'content' => view('barang.index')
        ]);
    }
    
    function unique_code()
    {
        return substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, 16);
    }
    
    public function store(Request $request){
        $response=[];
        $data = [
            'barang_id'     => $request->input('barang_id'),
            'barang_kode'   => $request->input('barang_kode'),
            'barang_nama'   => $request->input('barang_nama'),
            'barang_is_active'   => 1,
        ];
        
        if($request->input('barang_id')){
            $data['barang_updated_at'] = date('Y-m-d H:i:s');
            $operation = DB::table('tb_barang')->where('barang_id', '6367c91bd7faa')->update($data);

            if($operation == 1){
                $response['success'] = true;
                $response['message'] = 'Berhasil Mengubah Data!';
            }else{
                $response['success'] = false;
                $response['message'] = 'Gagal Mengubah Data!';
            }
        }else{
            $data['barang_id'] = uniqid();
            $data['barang_created_at'] = date('Y-m-d H:i:s');
            $operation = DB::table('tb_barang')->insert($data);

            if($operation == 1){
                $response['success'] = true;
                $response['message'] = 'Berhasil Menambahkan Data';
            }else{
                $response['success'] = false;
                $response['message'] = 'Gagal Mengubah Data!';
            }
        }

        return $response;
    }
}
