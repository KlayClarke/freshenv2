fetch("https://thawing-reaches-97496.herokuapp.com/api/salons"  )
  .then((res) => {
    res.json().then((data) => {
      mapboxgl.accessToken = `pk.eyJ1Ijoia2NsYXJlIiwiYSI6ImNsMXNpZWNpbTBiMGkzY3Fja3FteXNtZXUifQ.ooHLmmHP5cmV2MSf2eTheg`;
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-75, 42],
        zoom: 5,
      });
      map.on("load", () => {
        map.addSource("salons", {
          type: "geojson",
          data: data,
          cluster: true,
          clusterMaxZoom: 20,
          clusterRadius: 50,
        });
        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "salons",
          filter: ["has", "point_count"],
          paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
              "step",
              ["get", "point_count"],
              "orange",
              20,
              "green",
              40,
              "red",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              20,
              30,
              40,
              40,
            ],
          },
        });
        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "salons",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
        });
        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "salons",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#11b4da",
            "circle-radius": 10,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });
        // inspect a cluster on click
        map.on("click", "clusters", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = features[0].properties.cluster_id;
          map
            .getSource("salons")
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;
              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });
        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.on("click", "unclustered-point", (e) => {
          console.log(e.features[0]);
          const coordinates = e.features[0].geometry.coordinates.slice();
          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`${e.features[0].properties.mapboxClusterHTML}`)
            .addTo(map);
        });
        map.on("mouseenter", "clusters", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "clusters", () => {
          map.getCanvas().style.cursor = "";
        });
      });
    });
  })
  .catch((err) => console.log(err));
