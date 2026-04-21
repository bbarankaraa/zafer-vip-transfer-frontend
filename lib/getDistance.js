export function getDistanceBetweenPlaces(originPlaceId, destinationPlaceId) {
  return new Promise((resolve, reject) => {

    const div = document.createElement("div");
    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [{ placeId: originPlaceId }],
        destinations: [{ placeId: destinationPlaceId }],
        travelMode: window.google.maps.TravelMode.DRIVING,
        language: "tr",
      },
      (response, status) => {
        if (status !== "OK") {
          
          reject(new Error("Mesafe hesaplanamadı"));
          return;
        }

        const element = response.rows[0]?.elements[0];

        if (element?.status !== "OK") {
          reject(new Error("Rota bulunamadı"));
          return;
        }

        resolve({
          distanceInMeters: element.distance.value,
          distanceText: element.distance.text,
          durationText: element.duration.text,
        });
      }
    );
  });
}