<?php
namespace App\Notifications;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Lang;
use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;

class VerifyEmail extends VerifyEmailBase
{
//    use Queueable;

    protected function verificationUrl($notifiable)
    {
        $prefix = config('frontend.url') . config('frontend.email_verify_url');
        $temporarySignedURL = URL::temporarySignedRoute(
            'verification.verify', Carbon::now()->addMinutes(60), ['id' => $notifiable->getKey()]
        );

        // Отправляем ссылку в виде кверипараметра для фронт роута
        return $prefix . urlencode($temporarySignedURL);
    }

    public function toMail($notifiable)
    {
        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable);
        }
        return (new MailMessage)
            ->subject(Lang::getFromJson('Подтвердите Ваш эмейл'))
            ->line(Lang::getFromJson('Пожалуйста кликните кнопку ниже для подтверждения эмейла'))
            ->action(
                Lang::getFromJson('Подтвердите Ваш эмейл'),
                $this->verificationUrl($notifiable)
            )
            ->line(Lang::getFromJson('Если вы не создавали аккаунт, то не обращайте внимания на это  сообщение'));
    }
}