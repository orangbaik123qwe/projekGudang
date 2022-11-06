<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function index()
    {
        return view('login.register', [
            'title' => 'Register'
        ]);
    }

    public function store(Request $request)
    {
        function unique_code($limit)
        {
            return substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, $limit);
        }
        // echo unique_code(16);
        $validatedData = $request->validate([
            // 'user_id' => auth()->id(),
            // 'user_id' =>  unique_code(16),
            'user_name' => ['required'],
            'user_email' => ['required','unique:users','email:dns'],
            'user_username' => ['required','unique:users'],
            'user_password' => ['required', 'min:8'],
            // 'user_active' => 1
        ]);

        $validatedData['user_password'] =  Hash::make($validatedData['user_password']);
        $validatedData['user_id'] =  unique_code(16);
        $validatedData['user_active'] =  1;

        User::create($validatedData);
        // $request->session()->flash('success', 'Registration successfully! Please login');
        return redirect('/login')->with('success', 'Registration successfully! Please login');
    }
}
