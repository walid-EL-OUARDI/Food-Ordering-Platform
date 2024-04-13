<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\AuthResource;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    /**
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {

            $client = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $client->createToken('user_token')->plainTextToken;

            return response()->json([
                'message' => 'Client register successfully',
                'clientData' => new AuthResource($client),
                'token' => $token,
            ], Response::HTTP_OK);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Database not connected',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $client = User::where('email', $request->email)->first();
            $token = $client->createToken('user_token')->plainTextToken;

            if (!Hash::check($request->password, $client->password)) {
                return response()->json([
                    'message' => 'The password is incorrect',
                ], Response::HTTP_UNAUTHORIZED);
            }

            return response()->json([
                'message' => 'Client login successfully',
                'clientData' => new AuthResource($client),
                'token' => $token,
            ], Response::HTTP_OK);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Database not connected',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'Successfully logged out',
        ], Response::HTTP_OK);
    }
}
