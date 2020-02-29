<?php

namespace App\Notifications;

use Illuminate\Support\Facades\Lang;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\URL;

class ResetPassword extends Notification
{
    public $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $prefix = config('frontend.url') . config('frontend.password_reset_url');
        $generatedUrl = url(config('app.url'). '/laravue-test/public' .route('password.reset', ['token' => $this->token, 'email' => $notifiable->getEmailForPasswordReset()], false));
        $url = $prefix . urlencode($generatedUrl);

        return (new MailMessage)
            ->subject(Lang::getFromJson('Запрос сброса пароля'))
            ->line(Lang::getFromJson('Вы получили это письмо, потому что мы получили запрос на сброс пароля Вашего аккаунта'))
            ->action(Lang::getFromJson('Сбросить пароль'), $url)
            ->line(Lang::getFromJson('Ссылка действительна :count минут.', ['count' => config('auth.passwords.'.config('auth.defaults.passwords').'.expire')]))
            ->line(Lang::getFromJson('Если вы не запрашивали сброс пароля, никаких действий не требутеся'));
    }
}