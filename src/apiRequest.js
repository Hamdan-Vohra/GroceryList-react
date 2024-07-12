const apiRequest = async (url = '', reqOptions = '', errMsg = null) => {
    try {
        const response = await fetch(url, reqOptions)
        if (!response.ok) throw Error('Please Reload The Application')
    } catch (error) {
        errMsg = error.message;
    } finally {
        return errMsg
    }
}

export default apiRequest;