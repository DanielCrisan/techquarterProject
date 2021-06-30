import GeoPoint from 'geopoint';
import bodybuilder from 'bodybuilder';

export class FactoryRequestResidence {
  static searchByAddressBody(address: string, state: string, zip: number) {
    return bodybuilder()
      .query('match_phrase', 'StandardizedAddress', address)
      .query('match_phrase', 'State', state)
      .query('match_phrase', 'ZipCode', zip)
      .build();
  }

  static searchByRadiusBody(center: GeoPoint, radiusInKm: number) {
    return bodybuilder()
      .size(50)
      .query('match_all')
      .filter('geo_distance', {
        distance: radiusInKm + 'km',
        Location: {
          lat: center.latitude(),
          lon: center.longitude()
        }
      })
      .build();
  }

  static searchByPolygonBody(pointsOfPolygon: GeoPoint[]) {
    const queryPoints = pointsOfPolygon.map(point => {
      return {
        lat: point.latitude(),
        lon: point.longitude()
      };
    });

    return bodybuilder()
      .size(50)
      .query('match_all')
      .filter('geo_polygon', {
        Location: {
          points: queryPoints
        }
      })
      .build();
  }

  static searchByKNNbody(pointToSearchFrom: GeoPoint, nrOfNeighbours: number) {
    return bodybuilder()
      .size(nrOfNeighbours + 1)
      .sort([
        {
          _geo_distance: {
            Location: {
              lat: pointToSearchFrom.latitude(),
              lon: pointToSearchFrom.longitude()
            },
            order: 'asc',
            unit: 'km',
            mode: 'min',
            distance_type: 'arc',
            ignore_unmapped: true
          }
        }
      ])
      .build();
  }
}
