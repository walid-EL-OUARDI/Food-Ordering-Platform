<?php

namespace App\Http\Controllers\YouCanPay;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\Translation\Exception\NotFoundResourceException;
use YouCan\Pay\YouCanPay;

class YouCanPayController extends Controller
{
    public function createToken(Request $request, $orderId)
    {
        try {
            $IsSandboxMode = config("youcanpay.sandboxmode");
            $privateKey = config("youcanpay.private_key");
            $publicKey = config("youcanpay.public_key");
            $currency = config('youcanpay.currency');
            $language = config('app.locale');
            $success_redirect_url = config('youcanpay.success_redirect_url');
            $fail_redirect_url = config('youcanpay.fail_redirect_url');

            $user = $request->user();
            $order = Order::find($orderId);
            if (!$order) {
                throw new NotFoundResourceException('Order not found');
            }
            // Enable sandbox mode, otherwise delete this line.
            YouCanPay::setIsSandboxMode($IsSandboxMode);

            // Create a YouCan Pay instance, to retrieve your private and public keys login to your YouCan Pay account
            // and go to Settings and open API Keys.
            $youCanPay = YouCanPay::instance()->useKeys($privateKey, $publicKey);

            // Create the order you want to be paid
            $token = $youCanPay->token->create(
                // String orderId (required): Identifier of the order you want to be paid.
                $order->id,
                // Integer amount (required): The amount, Example: 25 USD is 2500.
                $order->total_price * 100,
                // String currency (required): Uppercase currency.
                $currency,
                // String customerIP (required): Customer Address IP.
                $request->ip(),
                // String successUrl (required): This URL is returned when the payment is successfully processed.
                $success_redirect_url,
                // String errorUrl (required): This URL is returned when payment is invalid.
                $fail_redirect_url,
                $user->getUserInfo(),
            )->getId();

            return response()->json([
                'token' => $token,
            ], Response::HTTP_OK);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create payment token',
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
