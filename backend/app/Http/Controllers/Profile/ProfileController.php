<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\ProfileRequest;
use App\Http\Resources\AuthResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProfileController extends Controller
{
    public function updateUserInfo(ProfileRequest $request): JsonResponse
    {
        $user = $request->user();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->country = $request->country;
        $user->city = $request->city;
        $user->save();
        return response()->json([
            'message' => 'Client info updated successfully',
            'clientData' => new AuthResource($user),
        ], Response::HTTP_OK);
    }
}
