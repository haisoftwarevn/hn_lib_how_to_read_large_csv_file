import fs from "fs";
import { parse } from "csv-parse";

const planets = [];

const isHabitablePlanet = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

fs.createReadStream("kepler-data.csv")
  .pipe(
    parse({
      comment: "#", // loại bỏ các ký tự bắt đầu bằng #
      columns: true, // biến các dòng thành các javascript objects
    })
  )
  .on("data", (data) => {
    //todo: data này ở dạng dòng
    if (isHabitablePlanet(data)) {
      planets.push(data);
      //// arary trong này phải dùng push
    }
  })
  .on("error", (error) => {
    //todo: nếu gặp lỗi
    console.log("Error:: ", error);
  })
  .on("end", () => {
    //todo: khi quá trình read stream kết thúc
    console.log(
      planets.map((planet) => {
        return planet["kepler_name"];
      })
    );
    console.log(`${planets.length} planets found `);
    console.log("Done");
  });
