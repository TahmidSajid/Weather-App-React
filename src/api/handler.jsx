import toast from "react-hot-toast"

/**
 * Handles a successful API response.
 * Extracts data and shows the success message as a toast.
 *
 * @param {Object} response - The axios response object
 * @param {boolean} showToast - Whether to show a toast (default: true)
 * @returns {any} - The data from the response
 */

export const handleSuccess = (response, showToaster) => {

    const {message, data} = response.data


    if(showToaster && message){
        toast.success(message);
    }

    return data;

}


/**
 * Handles a failed API response.
 * Extracts the error message and shows it as a toast.
 *
 * @param {Object} error - The axios error object
 * @param {boolean} showToast - Whether to show a toast (default: true)
 */
export const handleError = (error, showToast = true) => {
    // Laravel validation errors (422)
    if (error.response?.status === 422) {
        const errors = error.response.data.message;
        errors.forEach((msg) => toast.error(msg));
        return;
    }

    // Other Laravel error messages
    const message =
        error.response?.data?.message || // your custom message field
        error.message ||                 // axios error
        'Something went wrong.';         // fallback

    if (showToast) {
        toast.error(message);
    }
};