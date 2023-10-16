const Liferay = (window as any).Liferay;

export function fireEvent(name: string, valueJson: string) {
    try {
        Liferay.fire(name, valueJson);
    } catch (error) {
        console.log('FIRE ERROR', name)
    }
}
export const getObjects = (object:any) => {
	return fetch(`http://localhost:8080/o/c/${object}/`, {
		headers: {
			Authorization: 'Basic',
			'Content-Type': 'application/json',
		},
		method: 'GET',
	});
};