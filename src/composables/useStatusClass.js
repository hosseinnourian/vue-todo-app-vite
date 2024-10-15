export function useStatusClass() {
    const getStatusClass = (status) => {
        const statusClasses = {
            'to-do': 'text-danger',
            'in-progress': 'text-warning',
            'finished': 'text-success',
        };
        return statusClasses[status] || '';
    };

    return {
        getStatusClass,
    };
}