const tg =  window.Telegram.WebApp;

export function useTelegram() {

    const onClose = () => {
        tg.close()
    }

    const onTooglButton = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }


    return {
        onClose,
        onTooglButton,
        tg,
        user: tg.initDataUnsafe?.user,
    }
}