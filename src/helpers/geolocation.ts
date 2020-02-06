
export function getGeolocation():Promise<{coords:{latitude:number, longitude:number}}>{
    return new Promise((resolve, reject) => {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( pos => resolve(pos));
        } else {
            alert("Geolocation is not supported by this browser.");
            reject(false);
        }
    })
}