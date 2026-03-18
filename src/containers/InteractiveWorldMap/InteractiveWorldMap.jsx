"use client";
import images from "@/assets";
import Image from "next/image";
// import React, { useLayoutEffect } from "react";
// import * as am5 from "@amcharts/amcharts5";
// import * as am5map from "@amcharts/amcharts5/map";
// import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// const countriesWithPresence = [
//   "US",
//   "IN",
//   "CN",
//   "GB",
//   "DE",
//   "FR",
//   "BR",
//   "JP",
//   "RU",
//   "ZA",
//   "AU",
// ];

// export default function InteractiveWorldMap() {
//   useLayoutEffect(() => {
//     const root = am5.Root.new("chartdiv");

//     root.setThemes([am5themes_Animated.new(root)]);

//     const chart = root.container.children.push(
//       am5map.MapChart.new(root, {
//         panX: "none",
//         panY: "none",
//         wheelX: "none",
//         wheelY: "none",
//         projection: am5map.geoMercator(),
//       })
//     );

//     const polygonSeries = chart.series.push(
//       am5map.MapPolygonSeries.new(root, {
//         geoJSON: am5geodata_worldLow,
//         valueField: "value",
//       })
//     );

//     polygonSeries.mapPolygons.template.setAll({
//       tooltipText: "{name}",
//       interactive: true,
//       fill: am5.color(0xd3d3d3),
//       stroke: am5.color(0xffffff),
//     });

//     polygonSeries.mapPolygons.template.states.create("hover", {
//       fill: am5.color(0x10797c),
//     });

//     polygonSeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
//       const id = target.dataItem?.dataContext?.id;
//       if (countriesWithPresence.includes(id)) {
//         return am5.color(0x10797c);
//       }
//       return fill;
//     });

//     return () => {
//       root.dispose();
//     };
//   }, []);

import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const countriesWithPresence = [
  "US",
  "IN",
  "CN",
  "GB",
  "DE",
  "FR",
  "BR",
  "JP",
  "RU",
  "ZA",
  "AU",
];

export default function InteractiveWorldMap() {
  useLayoutEffect(() => {
    const root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        wheelX: "none",
        wheelY: "none",
        projection: am5map.geoMercator(),
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        valueField: "value",
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      interactive: true,
      fill: am5.color(0xd3d3d3),
      stroke: am5.color(0xffffff),
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x10797c),
    });

    polygonSeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
      const id = target.dataItem?.dataContext?.id;
      if (countriesWithPresence.includes(id)) {
        return am5.color(0x10797c);
      }
      return fill;
    });

    polygonSeries.mapPolygons.template.adapters.add(
      "tooltipText",
      (text, target) => {
        const id = target.dataItem?.dataContext?.id;
        const name = target.dataItem?.dataContext?.name;
        if (!countriesWithPresence.includes(id)) {
          return `Service not available at ${name}`;
        }
        return name;
      }
    );

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <>
      <h2 className="text-5xl max-md:text-4xl font-medium text-center accent-sec">
        Where we are
      </h2>

      <div className="app__container flex justify-center mt-16">
        <div id="chartdiv" className="w-screen h-screen max-md:h-[400px]"></div>
        ;
      </div>
    </>
  );
}
