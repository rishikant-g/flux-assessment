<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                'min:8', // Minimum length of password
                'max:20', // Maximum length of password
                'regex:/[a-z]/', // At least one lowercase letter
                'regex:/[A-Z]/', // At least one uppercase letter
                // 'regex:/[0-9]/', // At least one number
                'regex:/[@$!%*?&]/', // At least one special character
            ],
        ]);

        // If validation fails, return errors
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); // 422 Unprocessable Entity
        }

        $userValidated = $validator->validate();

        // Create the new user
        $user = User::create([
            'name' => $userValidated['name'],
            'email' => $userValidated['email'],
            'password' => Hash::make($userValidated['password']), // Hash the password
        ]);

        $token = $user->createToken('FLUX')->plainTextToken;

        // Return a successful response with the token
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
        ], 201);
    }
}
