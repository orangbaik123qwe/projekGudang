<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    public function index()
    {
        return view('login.view_login', [
            'title' => 'Login'
        ]);
    }
   
    public function authentication(Request $request)
    {
        $credentials = $request->validate([
            // 'user_username' => 'required',
            'user_email' => ['required','email:dns'],
            'user_password' => 'required'
        ]);
        $data = [
            'user_email' => $request->input('user_email'),
            'password' => $request->input('user_password'),
        ];

        // if(Auth::attempt(['user_email' => $request->user_email, 'password' => $request->user_password], false)){
        if(Auth::attempt($data)){
            $user = Auth::user();
            $users = User::select()->where('user_email', $request->user_email)->first();
            // Session::put('userdata', $users);
            session(['userdata' => $users]);
            // dd($users->user_id);
            $request->session()->regenerate();
            // dd($request->session());
            return redirect()->intended('/');
        }
        return back()->with('loginError','Login failed!');
    }

    public function logout()
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect('/');
    }
}
