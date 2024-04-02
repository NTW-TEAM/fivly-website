import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

class AlertHandler {

    /**
     * Show error alert
     * @param {string} message
     * @param {string} title
     * @return {void}
     */
    static showError(message: string, title: string = 'Erreur'): void {
        const swalClass = withReactContent(Swal);
        swalClass.fire({
            icon: 'error',
            title: title,
            text: message,
            position: 'top-end',
        });
    }

    /**
     * Show success alert
     * @param {string} message
     * @param {string} title
     * @return {void}
     */
    static showSuccess(message: string, title: string = 'Ok'): void {
        const swalClass = withReactContent(Swal);
        swalClass.fire({
            icon: 'success',
            title: title,
            text: message,
            position: 'top-end',
        });
    }

    /**
     * Show warning alert
     * @param {string} message
     * @param {string} title
     * @return {void}
     */
    static showWarning(message: string, title: string = 'Attention'): void {
        const swalClass = withReactContent(Swal);

        swalClass.fire({
            icon: 'warning',
            title: title,
            text: message,
            position: 'top-end',
        });
    }

    /**
     * Show info alert
     * @param {string} message
     * @param {string} title
     * @return {void}
     */
    static showInfo(message: string, title: string = 'Information'): void {
        const swalClass = withReactContent(Swal);

        swalClass.fire({
            icon: 'info',
            title: title,
            text: message,
            position: 'top-end',
        });
    }

    
}

export default AlertHandler;