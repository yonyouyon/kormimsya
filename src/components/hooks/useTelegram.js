const tg =  window.Telegram.WebApp;

export function useTelegram() {

    const onClose = () => {
        tg.close()
    }

    const onToogleButton = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }


    return {
        onClose,
        onToogleButton,
        tg,
        user: tg.initDataUnsafe?.user,
    }
}