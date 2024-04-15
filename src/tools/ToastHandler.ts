import { toast } from "react-toastify";


class ToastHandler {
    static toast(value: string | Array<String>, type: "success" | "error" | "info" | "warning") {
        switch (type) {
            case "success":
                if (typeof value === "string") {
                    toast.success(value);
                }
                else {
                    for (const message of value) {
                        toast.success(message);
                    }
                }
                break;
            case "error":
                if (typeof value === "string") {
                    toast.error(value);
                } else {
                    for (const message of value) {
                        toast.error(message);
                    }
                }
                break;
            case "info":
                if (typeof value === "string") {
                    toast.info(value);
                }
                else {
                    for (const message of value) {
                        toast.info(message);
                    }
                }
                break;
            case "warning":
                if (typeof value === "string") {
                    toast.warning(value);
                }
                else {
                    for (const message of value) {
                        toast.warning(message);
                    }
                }
                break;
        }
    }
}

export default ToastHandler;