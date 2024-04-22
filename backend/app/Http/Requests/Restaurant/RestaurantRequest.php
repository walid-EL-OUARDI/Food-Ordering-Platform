<?php

namespace App\Http\Requests\Restaurant;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class RestaurantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3|max:255',
            'country' => 'required|string|min:3|max:255',
            'city' => 'required|string|min:3|max:255',
            'delivery_price' => 'required|numeric|min:1',
            'estimated_delivery_time' => 'required|numeric|min:1',
            'cuisines' => 'required|array',
            'cuisines.*' => 'required|string|max:255',
            'image' => 'required|image|max:2048|mimes:jpeg,png,jpg',
            'menus' => 'required|array',
            'menus.*.name' => 'required|string|max:255',
            'menus.*.price' => 'required|numeric',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = response()->json([
            'errors' => $validator->errors(),
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
        throw new ValidationException($validator, $response);
    }
}
